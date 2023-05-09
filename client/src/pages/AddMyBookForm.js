import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import ErrorAlert from "../components/ErrorAlert";

function ReadForm(props) {
  const [success, setSuccess] = useState(false);
  const [formValues, setFormValues] = useState({
    rating: 0,
    review: "",
    like: false,
    dateStarted: new Date().toISOString().slice(0, 10),
    dateEnded: new Date().toISOString().slice(0, 10)
  });
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let response = await fetch("/api/my_book", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: props.title,
          rating: formValues.rating,
          review: formValues.review,
          like: formValues.like,
          pagesRead: props.pages,
          date_ended: formValues.dateEnded,
          date_started: formValues.dateStarted,
          UserId: props.user.id,
          type: "Read"
        }),
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Server error while creating a new micro post", error);
      setError(true);
    }
  };

  if (success) return <Navigate to="/mybooks" />;

  return (
    <div className="col-md-8 col-lg-7 mx-auto">
        {error && <ErrorAlert details={"Failed to save the content"} />}
        <h4>Add Book to Read Shelf</h4>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>
              Rating:
              <input type="number" name="rating" min="1" max="5" onChange={handleChange} />
            </label>
            <label>
              Review:
              <input type="text" name="review" value={formValues.review} onChange={handleChange} />
            </label>
            <label>
              Like:
              <input type="checkbox" name="like" checked={formValues.like} onChange={handleChange} />
            </label>
            <label>
              Date Started:
              <input type="date" name="dateStarted" value={formValues.dateStarted} onChange={handleChange} />
            </label>
            <label>
              Date Ended:
              <input type="date" name="dateEnded" value={formValues.dateEnded} onChange={handleChange} />
            </label>
            <button className="btn btn-primary" type="submit">Submit</button>
          </div>
        </form>
    </div>
    )
}

function ToReadForm(props) {

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const submitForm = async () => {
      try {
        let response = await fetch("/api/my_book", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: props.title,
            UserId: props.user.id,
            type: "Want to Read"
          }),
        });

        if (response.ok) {
          setSuccess(true);
        } else {
          setError(true);
        }
      } catch (error) {
        console.error("Server error while creating a new micro post", error);
        setError(true);
      }
    };

    submitForm();
  }, [props.title, props.user.id]);

  if (success) return <Navigate to="/mybooks" />;

  return (error && <ErrorAlert details={"Failed to save the content"} />);

}

function CurrentlyReadingForm(props) {

  const [success, setSuccess] = useState(false);
  const [formValues, setFormValues] = useState({
    dateStarted: new Date().toISOString().slice(0, 10),
    pagesRead: 0
  });
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let response = await fetch("/api/my_book", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: props.title,
          pages_read: formValues.pagesRead,
          date_started: formValues.dateStarted,
          UserId: props.user.id,
          type: "Currently Reading"
        }),
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Server error while creating a new micro post", error);
      setError(true);
    }
  };

  if (success) return <Navigate to="/mybooks" />;

  return (
    <div className="col-md-8 col-lg-7 mx-auto">
        {error && <ErrorAlert details={"Failed to save the content"} />}
        <h4>Add Book to Read Shelf</h4>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>
              Date Started:
              <input type="date" name="dateStarted" value={formValues.dateStarted} onChange={handleChange} />
            </label>
            <label>
              Pages Read:
              <input type="number" name="pagesRead" onChange={handleChange} />
            </label>
            <button className="btn btn-primary" type="submit">Submit</button>
          </div>
        </form>
    </div>
    )

}

function AddMyBookForm({ bookProps, shelf }) {
  const [user, setUser] = useState();
  const location = useLocation();
  shelf = location.state.shelf;
  bookProps = location.state.bookProps;
  console.log(bookProps)

  // fetch user
  useEffect(() => {
    async function getUser() {
      try {
        const userResponse = await fetch("/api/auth/login");
        const userData = await userResponse.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    }
    getUser();
  }, []);

  let selectedComponent;
  switch(shelf) {
    case 'Read':
      selectedComponent = user && <ReadForm {...bookProps} user={user} />;
      break;
    case 'Want to Read':
      selectedComponent = user && <ToReadForm {...bookProps} user={user} />;
      break;
    case 'Currently Reading':
      selectedComponent = user &&<CurrentlyReadingForm {...bookProps} user={user} />;
      break;
    default:
      break;
  }

  return (
    <div className="col-10 col-md-8 col-lg-7">
        <div>
            {selectedComponent}
        </div>
    </div>
  );
}

export default AddMyBookForm;
