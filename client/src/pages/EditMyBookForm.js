import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ErrorAlert from "../components/ErrorAlert";

function EditForm(props) {
  const [success, setSuccess] = useState(false);
  const [currentShelf, setCurrentShelf] = useState(props.shelf)
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    rating: props.rating,
    review: props.review,
    like: props.like,
    dateStarted: props.date_started ? props.date_started : new Date(),
    dateEnded: props.date_ended,
    shelf: props.shelf,
    pagesRead: props.pages_read
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "pagesRead") {
        setFormValues({
        ...formValues,
        pagesRead: parseInt(value)
        });
    } else {
        setFormValues({
        ...formValues,
        [name]: type === "checkbox" ? checked : value
        });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let response = await fetch("/api/my_book/" + props.id, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: props.title,
          rating: formValues.rating,
          review: formValues.review,
          like: formValues.like,
          pages_read: formValues.pagesRead,
          date_ended: formValues.dateEnded,
          date_started: formValues.dateStarted,
          type: currentShelf
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

  if (success) {
    navigate('/mybooks', { state: currentShelf });
    return null;
  }

  return (
    <div className="col-md-8 col-lg-7 mx-auto">
        {error && <ErrorAlert details={"Failed to save the content"} />}
        <h4>Add Book to Read Shelf</h4>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>
                Shelf:
                <select value={formValues.shelf} onChange={(e) => setCurrentShelf(e.target.value)}>
                    <option value="Want to Read">Want to Read</option>
                    <option value="Currently Reading">Currently Reading</option>
                    <option value="Read">Read</option>
                </select>
            </label>
            {(currentShelf==="Read") && (<>
                <label>
                    Rating:
                    <input type="number" name="rating" min="1" max="5" value={formValues.rating} onChange={handleChange} />
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
            </>)}
            {(currentShelf==="Currently Reading") && (<>
                <label>
                    Pages Read:
                    <input type="number" name="pagesRead" min="1" max="400" value={formValues.pagesRead}onChange={handleChange} />
                </label>
                <label>
                    Date Started:
                    <input type="date" name="dateStarted" value={formValues.dateStarted} onChange={handleChange} />
                </label>
            </>)}
            <button className="btn btn-primary" type="submit">Submit</button>
          </div>
        </form>
    </div>
    )
}

function EditMyBookForm({ bookProps, shelf }) {
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

  return (
    <div className="col-10 col-md-8 col-lg-7">
        <div>
            {user && <EditForm {...bookProps} user={user} shelf={shelf} />}
        </div>
    </div>
  );
}

export default EditMyBookForm;
