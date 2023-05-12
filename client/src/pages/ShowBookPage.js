import React, { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";
import { useParams, useNavigate } from "react-router-dom";
import CardTemplate from "../components/CardTemplate";
import ShelfFormCard from "../components/ShelfFormCard";
import UserSearchBar from "../components/UserSearchBar";

function ShowBookPage() {
  const [showShelfForm, setShowShelfForm] = useState(false);
  const [showFriendForm, setShowFriendForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editShelf, setEditShelf] = useState("");
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  let params = useParams();

  // Adding a book to bookshelf
  function handleAddToShelf() {
    if (showEditForm) setShowEditForm(false);
    else setShowShelfForm(true);
  }

  function handleShelfFormSubmit(selectedOption) {
    navigate('/my_book/new', { state: { bookProps: post, shelf: selectedOption } });
  }

  function handleEditSubmit() {
    navigate('/mybooks/', {state: editShelf});
  }

  // Sending a recommendation to a friend
  function handleRecommend() {
    setShowFriendForm(true);
  }

  useEffect(() => {

    // fetch user
    async function getUser() {
      try {
        const userResponse = await fetch("/api/auth/login");
        const userData = await userResponse.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching all user data", error);
      }
    }
    
    getUser();
  }, []);
  
  // Getting book data
  useEffect(() => {

    // get book data
    async function getData() {
      setLoading(true);
      try {
        console.log("getting book")
        let response = await fetch("/api/books/" + params.id);
        let postData = await response.json();
        // console.log("getting", postData)
        setPost(postData);
        // console.log("getting", post)
        console.log(user)
        if (user) {
          response = await fetch("/api/my_book/title/" + postData.title);
          postData = await response.json();
          console.log("getting", postData)
          if (postData.length === 0) {
            setShowEditForm(false);
          }
          else {
            console.log(postData.ShelfId)
            response = await fetch("/api/shelf/" + postData[0].ShelfId);
            postData = await response.json();
            console.log(postData)
            setEditShelf(postData.type)
            setShowEditForm(true);
          }
      }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching /api/books/" + params.id, error);
        setError(true);
      }
    }
    getData();

    return () => {
      // clean up function
    };
  }, [user, params.id]);

  if (error)
    return (
      <ErrorAlert details={"Book with id=" + params.id + " not found"} />
    );
  if (loading) return <LoadingSpinner />;

  return(
    <div className="container-fluid text-center">
      <div className="row justify-content-center">
        <div className="col-10 col-md-8 col-lg-7">
          <CardTemplate props={post} onAddToShelf={handleAddToShelf} editShelf={showEditForm} 
          onEditSubmit={handleEditSubmit} onRecommend={handleRecommend} />
        </div>
      </div>
      {showShelfForm && (
        <div className="row justify-content-center">
          <div className="col-10 col-md-8 col-lg-7">
            <ShelfFormCard bookProps={post} onSubmit={handleShelfFormSubmit} />
          </div>
        </div>
      )}
      {showFriendForm && (
        <div className="row justify-content-center">
          <div className="col-10 col-md-8 col-lg-7">
            <UserSearchBar addRec={showFriendForm} addFriend={false} props={post} />
          </div>
        </div>
      )}
    </div>
  )
}

export default ShowBookPage;
