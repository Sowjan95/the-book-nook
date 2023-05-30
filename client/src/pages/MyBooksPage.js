import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReadBookView from "../components/ReadBookView";
import CurrentBookView from "../components/CurrentBookView";
import ToReadBookView from "../components/ToReadBookView";
import LoadingSpinner from "../components/LoadingSpinner";
import "../LoginPage.css"


function MyBooks() {
  const location = useLocation();
  const [myCurrentBooks, setMyCurrentBooks] = useState([]);
  const [myReadBooks, setMyReadBooks] = useState([]);
  const [myToReadBooks, setMyToReadBooks] = useState([]);
  const [selectedOption, setSelectedOption] = useState(location.state || 'Read');
  const [loading, setLoading] = useState(true);

  //fetch data
  useEffect(() => {
    // fetch user's currently reading my_books
    // sort books in ascending order by date_started
    async function getMyCurrentBooks() {
      setLoading(true);
      try {
        const currentBooksResponse = await fetch(
          "/api/my_book/shelf/Currently Reading"
        );
        const currentBooksData = await currentBooksResponse.json();
        currentBooksData.sort((a, b) =>
          a.date_started > b.date_started ? 1 : -1
        );
        setMyCurrentBooks(currentBooksData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching all currently reading books", error);
      }
    }

    // fetch user's currently reading my_books
    // sort books in ascending order by date_started
    async function getMyReadBooks() {
      setLoading(true);
        try {
            const readBooksResponse = await fetch(
            "/api/my_book/shelf/Read"
            );
            const readBooksData = await readBooksResponse.json();
            readBooksData.sort((a, b) =>
            a.createdAt > b.createdAt ? 1 : -1
            );
            setMyReadBooks(readBooksData);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching all read books", error);
        }
    }

    // fetch user's currently reading want to read
    // sort books in ascending order by date_started
    async function getMyToReadBooks() {
      setLoading(true);
        try {
            const toReadBooksResponse = await fetch(
            "/api/my_book/shelf/Want to Read"
            );
            const toReadBooksData = await toReadBooksResponse.json();
            toReadBooksData.sort((a, b) =>
            a.createdAt > b.createdAt ? 1 : -1
            );
            setMyToReadBooks(toReadBooksData);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching all want to read books", error);
        }
    }


    getMyReadBooks();
    getMyToReadBooks();
    getMyCurrentBooks();
  }, []);

  if (loading) return <LoadingSpinner />;
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
            <div className="justify-content-center">
                <div className='App'>
                <nav className="navbar navbar-expand-sm justify-content-center">
                    <div>
                        <button className={selectedOption === 'Read' ? 'btn btn-chosen' : 'btn  btn-notchosen'} onClick={() => setSelectedOption('Read')}>
                          Read
                        </button>
                        <button className={selectedOption === 'Want to Read' ? 'btn btn-chosen' : 'btn btn-notchosen'} onClick={() => setSelectedOption('Want to Read')}>
                          Want to Read
                        </button>
                        <button className={selectedOption === 'Currently Reading' ? 'btn btn-chosen' : 'btn btn-notchosen'} onClick={() => setSelectedOption('Currently Reading')}>
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