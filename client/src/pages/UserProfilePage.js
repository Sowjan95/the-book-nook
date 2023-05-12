import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.js";
import LoadingSpinner from "../components/LoadingSpinner";

function UserProfile() {
  const [user, setUser] = useState();
  const [myFavoriteBooks, setMyFavoriteBooks] = useState([]);
  const [myCurrentBooks, setMyCurrentBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const auth = useAuth();


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

    // fetch user's currently reading my_books
    // sort books in ascending order by date_started
    async function getMyCurrentBooks() {
      try {
        const currentBooksResponse = await fetch(
          "/api/my_book/shelf/Currently Reading"
        );
        const currentBooksData = await currentBooksResponse.json();
        currentBooksData.sort((a, b) =>
          a.date_started > b.date_started ? 1 : -1
        );
        // fetch associated NewBook model for each Book model
        const currentBooks = await Promise.all(
          currentBooksData.map(async (book) => {
            const newBookResponse = await fetch(`/api/books/${book.BookId}`);
            const newBookData = await newBookResponse.json();
            return { ...book, title: newBookData.title, author: newBookData.author };
          })
        );
        setMyCurrentBooks(currentBooks);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching all currently reading books", error);
      }
    }

    // fetch user's favorite my_books
    // sort books in ascending order by createdAt
    async function getMyFavoriteBooks() {
      try {
        const favoriteBooksResponse = await fetch("/api/my_book/favorites");
        const favoriteBooksData = await favoriteBooksResponse.json();
        favoriteBooksData.sort((a, b) =>
          a.createdAt > b.createdAt ? 1 : -1
        );
        // fetch associated NewBook model for each Book model
        const favoriteBooks = await Promise.all(
          favoriteBooksData.map(async (book) => {
            const newBookResponse = await fetch(`/api/books/${book.BookId}`);
            const newBookData = await newBookResponse.json();
            return { ...book, title: newBookData.title, author: newBookData.author };
          })
        );
        setMyFavoriteBooks(favoriteBooks);
      } catch (error) {
        console.error("Error fetching all favorite books", error);
      }
    }
    
    // fetch all data
    getUser();
    getMyCurrentBooks();
    getMyFavoriteBooks();
  }, []);

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      await auth.signout();
      console.log("logged out");
      window.location.replace('/');
      
    } catch (error) {
      console.error("Server error while logging in", error);
    }
  };
  
  if (isLoading) return <LoadingSpinner />;
  return (
  <div>
    <h1 className="profileHeader title">
      Welcome, {user ? user.username : "User"}!
    </h1>
    <div className= "placement-card">
      <img className="profileImage img-thumbnail"
          src="https://i.pinimg.com/564x/d0/85/32/d0853248f043d7010f280d5b43687dc0.jpg"
          alt="User Profile"
      />
      <div className="logout">
        {user && 
          <button type="submit" className="btn btn-secondary" onClick={handleLogout}>
            Logout
          </button>
        }
      </div>
    </div>
    <br/>
    <br/>
    <div className="container-fluid text-center">
    <div className="row justify-content-center">
      <div className="col-md-5">
       <h4 className="profileHeader title">Your Current Reads</h4>
         {myCurrentBooks.length > 0 && (
        <table>
          <thead>
              <tr>
                  <th>Title</th>
                  <th>Author</th>
              </tr>
          </thead>
          <tbody>
              {myCurrentBooks.map((book) => (
                  <tr key={book.id}>
                      <td className="bookLink">{book.title}</td>
                      <td>{book.author}</td>
                  </tr>
              ))}
          </tbody>
        </table>
        )}
      </div>

      <div className="col-md-5">
       <h4 className="profileHeader title">Your All Time Favorites</h4>
         {myFavoriteBooks.length > 0 && (
        <table>
          <thead>
              <tr>
                  <th>Title</th>
                  <th>Author</th>
              </tr>
          </thead>
          <tbody>
              {myFavoriteBooks.map((book) => (
              <tr key={book.id}>
                  <td className="bookLink">{book.title}</td>
                  <td>{book.author}</td>
              </tr>
              ))}
          </tbody>
        </table>
        )}
      </div>
    </div>
    </div>
  </div>
    
  );
}

export default UserProfile;