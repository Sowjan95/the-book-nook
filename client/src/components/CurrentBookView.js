import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ReadBookView(props) {
    const[books, setBooks] = useState([]);

    // fetch user's currently reading my_books
    // sort books in ascending order by date_started
    useEffect(() => {
        async function getBookData(myBookData) {
          try {
            const bookData = await Promise.all(
              myBookData.map(async (book) => {
                const newBookResponse = await fetch(`/api/books/${book.BookId}`);
                const newBookData = await newBookResponse.json();
                return { ...book, title: newBookData.title, author: newBookData.author };
              })
            );
            setBooks(bookData);
          } catch (error) {
            console.error("Error fetching all read book data", error);
          }
        }
    
        getBookData(props.readBooks);
      }, [props.readBooks]);

    return (
        <div className="container-fluid text-center">
        <div className="row justify-content-center">
        <div className="col-10 col-md-8 col-lg-7">
        <div className="card mb-4 shadow">
            <div className="card-body card-text">
                {books.map((book) => (
                    <div key={book.id}>
                        <Link to={"/book/" + book.BookId}><h5 className="bookLink">{book.title}</h5></Link>
                        <p>{book.author}</p>
                        <div className="card-footer small text-muted d-flex justify-content-between">
                            <div>Pages Read: {book.pages_read}</div>
                            <div>Date Started: {new Date(book.date_ended).toLocaleDateString("en-US",
                            {
                                month: "long",
                                day: "numeric",
                                year: "numeric"
                            })}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </div>
        </div>
        </div>
    );
}

export default ReadBookView;
