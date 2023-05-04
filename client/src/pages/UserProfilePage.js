import React, { useState, useEffect } from "react";
// import CardTemplate from "../components/CardTemplate";
// import ProfileCard from "../components/ProfileCard";

// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Image from 'react-bootstrap/Image'
// import "../userprofile.css"


function UserProfile() {
  const [user, setUser] = useState();
  const [myFavoriteBooks, setMyFavoriteBooks] = useState([]);
  const [myCurrentBooks, setMyCurrentBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


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
        console.log(myFavoriteBooks);
      } catch (error) {
        console.error("Error fetching all favorite books", error);
      }
    }
    
    // fetch all data
    getUser();
    getMyCurrentBooks();
    getMyFavoriteBooks();
  }, []);

  return (

    <div>
      <h1 className="profileHeader title">
        Welcome, {user ? user.username : "User"}!
      </h1>

      <div className= "placement-card">
        {user && (
          <h2>Name: {user.name} Email: {user.email}</h2>
        )}
        <img className="profileImage" 
          class="img-thumbnail"
          src="https://images.unsplash.com/photo-1518998053901-5348d3961a04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80"
          alt="User Profile"
        />
      </div>
       <br/>
       <br/>

      <div>
       <h2 className="profileHeader title">Currently Reading</h2>
         {myCurrentBooks.length > 0 && (
          <div className="current-mybooks">
            {myCurrentBooks.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
              </tr>
            ))
            }
          </div>
        )}
        {/* {isLoading ? (
          <p>Loading...</p>
        ) : myCurrentBooks.length > 0 ? (
          <div className="current-mybooks">
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
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No currently reading books found.</p>
        )} */}
      </div>

      <div>
       <h2 className="profileHeader title">Favorite Books</h2>
         {myFavoriteBooks.length > 0 && (
          <div className="favorites-mybooks">
            {myFavoriteBooks.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
              </tr>
            ))
            }
          </div>
        )}
      </div>

{/* <div>
  <h2 className="profileHeader title">Favorite Books</h2>
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
            <td>{book.title}</td>
            <td>{book.author}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div> */}
    </div>
    
  );
}

export default UserProfile;