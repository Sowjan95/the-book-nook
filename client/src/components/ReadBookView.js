import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart } from '@fortawesome/free-solid-svg-icons';

function ReadBookView(props) {
    const[books, setBooks] = useState([]);
    const navigate = useNavigate();

    // fetch book data of user's read my_books
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

      const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < rating; i++) {
          stars.push(<FontAwesomeIcon key={i} icon={faStar} color="#ffc107" />);
        }
        return stars;
      };

    function handleEdit(book) {
      navigate("/my_book/edit", {
        state: { bookProps: book, shelf: "Read" },
      });
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
                        <p>Review: {book.review}</p>
                        <div>{book.like && <div><FontAwesomeIcon icon={faHeart} style={{ color: '#2AAA8A' }}/></div>}</div>
                        <button className="btn btn-success" type="button" onClick={() => handleEdit(book)}>
                            Edit
                        </button>
                        <button className="btn btn-danger" type="button" onClick={() => handleEdit(book)}>
                            Delete
                        </button>
                        <div className="card-footer small text-muted d-flex justify-content-between">
                            <div>Rating: {renderStars(book.rating)}</div>
                            <div>Date Finished: {new Date(book.date_ended).toLocaleDateString("en-US",
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
