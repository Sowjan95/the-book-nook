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
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  let params = useParams();

  // Adding a book to bookshelf
  function handleAddToShelf() {
    setShowShelfForm(true);
  }

  function handleShelfFormSubmit(selectedOption) {
    navigate('/my_book/new', { state: { bookProps: post, shelf: selectedOption } });
  }


  // Sending a recommendation to a friend
  function handleRecommend() {
    setShowFriendForm(true);
  }
  
  // Getting book data
  useEffect(() => {

    // get book data
    async function getData() {
      setLoading(true);
      try {
        let response = await fetch("/api/books/" + params.id);
        let postData = await response.json();
        setPost(postData);
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
  }, [params.id]);

  if (error)
    return (
      <ErrorAlert details={"Book with id=" + params.id + " not found"} />
    );
  if (loading) return <LoadingSpinner />;

  return(
    <div className="container-fluid text-center">
      <div className="row justify-content-center">
        <div className="col-10 col-md-8 col-lg-7">
          <CardTemplate props={post} onAddToShelf={handleAddToShelf} onRecommend={handleRecommend} />
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