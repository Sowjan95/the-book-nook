import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function CurrentBookView(props) {
    const[books, setBooks] = useState([]);
    const navigate = useNavigate();

    // fetch book data of user's currently reading my_books
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

    function handleEdit(book) {
      navigate("/my_book/edit", {
        state: { bookProps: book, shelf: "Currently Reading" },
      });
    }


    const handleDelete = async (book) => {
      try {
        const response = await fetch(`/api/my_book/${book.id}`, {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: book.id })
        });
        if (!response.ok) {
          throw new Error('Failed to delete my book');
        }
        const data = await response.text();
        if (data) {
          return JSON.parse(data);
        }
        window.location.reload();
        return null;
      } catch (error) {
        console.error(error);
      }
    }

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
                        <button className="btn btn-success" type="button" onClick={() => handleEdit(book)}>
                            Edit
                        </button>
                        <button className="btn btn-danger" type="button" onClick={() => handleDelete(book)}>
                            Delete
                        </button>
                        <div className="card-footer small text-muted d-flex justify-content-between">
                            <div>Pages Read: {book.pages_read}</div>
                            <div>Date Started: {new Date(book.date_started).toLocaleDateString("en-US",
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

export default CurrentBookView;
