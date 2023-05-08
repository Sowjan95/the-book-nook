import React, { useState, useEffect } from "react";
// import CardTemplate from "../components/CardTemplate";
import SearchBar from "../components/SearchBar";
import "../App.css"

function HomePage(props) {
  const[books, setBooks] = useState([]);
  const[myBooks, setMyBooks] = useState([]);
  const[myCurrentBooks, setMyCurrentBooks] = useState([]);

  //fetch data
  useEffect(() => {

    // fetch all books
    // sort books in ascending order by date added
    async function getBooks() {
      try {
        const allBooksResponse = await fetch(
          "/api/books/"
        );
        const allBooksData = await allBooksResponse.json();
        allBooksData.sort((a, b) =>
          a.createdAt > b.createdAt ? 1 : -1
        );
        setBooks(allBooksData);
      } catch (error) {
        console.error("Error fetching all books", error);
      }
    }

    // fetch user's my_books
    // sort books in ascending order by date added
    async function getMyBooks() {
      try {
        const allMyBooksResponse = await fetch(
          "/api/my_book/allmybooks"
        );
        const allMyBooksData = await allMyBooksResponse.json();
        allMyBooksData.sort((a, b) =>
          a.createdAt > b.createdAt ? 1 : -1
        );
        setMyBooks(allMyBooksData);
      } catch (error) {
        console.error("Error fetching all my books", error);
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
        setMyCurrentBooks(currentBooksData);
      } catch (error) {
        console.error("Error fetching all currently reading books", error);
      }
    }

    getBooks();
    getMyBooks();
    getMyCurrentBooks();
  }, []);

  return (
    <div>
      <h1>Home</h1>
      
      <div classname='App'>
        <SearchBar books={books} />
      </div>

    </div>
  );
}

export default HomePage;