import React, { useState, useEffect } from "react";


function Community(props) {
  const[myFriends, setMyFriends] = useState([]);

  //fetch data
  useEffect(() => {

    // fetch user's currently reading my_books
    // sort books in ascending order by date_started
    async function getMyFriends() {
      try {
        const friendsResponse = await fetch(
          "/api/my_book/friend"
        );
        const currentBooksData = await friendsResponse.json();
        currentBooksData.sort((a, b) =>
          a.date_started > b.date_started ? 1 : -1
        );
        setMyFriends(currentBooksData);
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
        <h1>Community</h1>
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

export default Community;