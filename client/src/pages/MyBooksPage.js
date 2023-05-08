import React, { useState, useEffect } from "react";
import ReadBookView from "../components/ReadBookView";
import CurrentBookView from "../components/CurrentBookView";
// import CardTemplate from "../components/CardTemplate";
// import Container from 'react-bootstrap/Container';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form'; 
// import { getToPathname } from "@remix-run/router";
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

function MyBooks(props) {
  const[books, setBooks] = useState([]);
  const[myCurrentBooks, setMyCurrentBooks] = useState([]);
  const[myReadBooks, setMyReadBooks] = useState([]);
  const[myToReadBooks, setMyToReadBooks] = useState([]);

  //fetch data
  useEffect(() => {

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

    // fetch user's currently reading my_books
    // sort books in ascending order by date_started
    async function getMyReadBooks() {
        try {
            const readBooksResponse = await fetch(
            "/api/my_book/shelf/Read"
            );
            const readBooksData = await readBooksResponse.json();
            readBooksData.sort((a, b) =>
            a.createdAt > b.createdAt ? 1 : -1
            );
            setMyReadBooks(readBooksData);
        } catch (error) {
            console.error("Error fetching all read books", error);
        }
    }

    // fetch user's currently reading want to read
    // sort books in ascending order by date_started
    async function getMyToReadBooks() {
        try {
            const toReadBooksResponse = await fetch(
            "/api/my_book/shelf/Want to Read"
            );
            const toReadBooksData = await toReadBooksResponse.json();
            toReadBooksData.sort((a, b) =>
            a.createdAt > b.createdAt ? 1 : -1
            );
            setMyToReadBooks(toReadBooksData);
        } catch (error) {
            console.error("Error fetching all want to read books", error);
        }
    }


    getMyReadBooks();
    getMyToReadBooks();
    getMyCurrentBooks();
  }, []);

    return (
    <div>
        <h1>My Books</h1>
        <div className="container-fluid text-center">
            <div className="row justify-content-center">
                <div classname='App'>
                    <ReadBookView readBooks={myReadBooks} />
                    <CurrentBookView readBooks={myCurrentBooks} />
                </div>
                {/* {homeView()} */}
            </div>
        </div>
    </div>
  );
}

export default MyBooks;