import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ToReadBookView(props) {
    const[books, setBooks] = useState([]);

    // fetch book data of user's want to read my_books
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
            console.error("Error fetching all want to read book data", error);
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
                        <div className="card-footer small text-muted">
                            <div className="text-end">Date Added: {new Date(book.createdAt).toLocaleDateString("en-US",
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

export default ToReadBookView;
