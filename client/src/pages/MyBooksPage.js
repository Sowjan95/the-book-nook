import React, { useState, useEffect } from "react";
import ReadBookView from "../components/ReadBookView";
import CurrentBookView from "../components/CurrentBookView";
import ToReadBookView from "../components/ToReadBookView";
// import CardTemplate from "../components/CardTemplate";
// import Container from 'react-bootstrap/Container';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form'; 
// import { getToPathname } from "@remix-run/router";
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';


function MyBooks(props) {
  const[myCurrentBooks, setMyCurrentBooks] = useState([]);
  const[myReadBooks, setMyReadBooks] = useState([]);
  const[myToReadBooks, setMyToReadBooks] = useState([]);
  const [selectedOption, setSelectedOption] = useState('Read');

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

  let selectedComponent;
  if (selectedOption === 'Read') {
    selectedComponent = <ReadBookView readBooks={myReadBooks} />;
  } else if (selectedOption === 'Want to Read') {
    selectedComponent = <ToReadBookView readBooks={myToReadBooks} />;
  } else {
    selectedComponent = <CurrentBookView readBooks={myCurrentBooks} />;
  }

    return (
    <div>
        <h1>My Books</h1>
        <div className="container-fluid text-center">
            <div className="row justify-content-center">
                <div classname='App'>
                <nav className="navbar navbar-expand-sm navbar-dark shadow mb-3">
                    <div>
                        <button onClick={() => setSelectedOption('Read')}>
                            Read
                        </button>
                        <button onClick={() => setSelectedOption('Want to Read')}>
                            Want to Read
                        </button>
                        <button onClick={() => setSelectedOption('Currently Reading')}>
                            Currently Reading
                        </button>
                    </div>
                    </nav>
                    {selectedComponent}
                </div>
            </div>
        </div>
    </div>
  );
}

export default MyBooks;