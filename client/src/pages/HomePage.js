import React, { useState, useEffect } from "react";
// import CardTemplate from "../components/CardTemplate";
import SearchBar from "../components/SearchBar";
// import Container from 'react-bootstrap/Container';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form'; 
// import { getToPathname } from "@remix-run/router";
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

function HomePage(props) {
  const[books, setBooks] = useState([]);
  const[myBooks, setMyBooks] = useState([]);
  const[myCurrentBooks, setMyCurrentBooks] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  let homeView = () => {
    return books.map((book) => {  // Extract "title" and "author"
      return <li key={book.id}><b>{book.title}</b> by {book.author}</li>
    });
  }

  //fetch data
  useEffect(() => {

    // get regular books
    async function getBooks() {
      try {
        let response = await fetch("/api/books/");
        let data = orderAscendingByAddedDate( await response.json());
        setBooks(data);
      } catch (error) {
        console.error("Error fetching all books", error);
      }
    }

    // get some of user's recently added books
    async function getMyBooks() {
      try {
        let response = await fetch("/api/my_book/allmybooks");
        let data = orderAscendingByAddedDate( await response.json());
        setMyBooks(data);
      } catch (error) {
        console.error("Error fetching all user's books", error);
      }
    }
    
    // get books user is currently reading
    async function getMyCurrentBooks() {
      try {
        let response = await fetch("/api/my_book/shelf/Currently Reading");
        let data = orderAscendingByStartedDate( await response.json());
        setMyCurrentBooks(data);
      } catch (error) {
        console.error("Error fetching all currently reading books", error);
      }
    }

    function orderAscendingByAddedDate(data){
      const copyData = []
      .concat(data)
      .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
      return copyData;
    }

    function orderAscendingByStartedDate(data){
      const copyData = []
      .concat(data)
      .sort((a, b) => (a.date_started > b.date_started ? 1 : -1));
      return copyData;
    }

    getBooks();
    getMyBooks();
    getMyCurrentBooks();
  }, []);
  
//   const clearFilter = async (event) => {
//     event.preventDefault();
//     setSortByDate(false);
//   }

  return (
    <div>
      <h1>Home</h1>
      {homeView()}
      
      <div classname='App'>
        <SearchBar books={books} />
      </div>

    </div>
  );
}

export default HomePage;