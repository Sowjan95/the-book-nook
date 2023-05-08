import React, { useState, useEffect } from "react";

const SearchBar = (props) => {

    const [searchInput, setSearchInput] = useState("");
    const [searchedBooks, setSearchedBooks] = useState([]);

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };


    useEffect(() => {
        // This code will run whenever searchedBooks changes
        console.log("searchedBooks changed:", searchedBooks);
    }, [searchedBooks]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(searchInput);
        try {

            // empty searchedBooks
            setSearchedBooks([]);

            // fetch books by titile and author
            const titleBooksPromise = fetch(`/api/books/title/${searchInput}`)
                .then(res => res.clone().json() || [])
            const authorBooksPromise = fetch(`/api/books/author/${searchInput}`)
                .then(res => res.clone().json() || []);

            // populate titleBooks and authorBooks with fetched data
            let [titleBooks, authorBooks] = await Promise.all([titleBooksPromise, authorBooksPromise]);


            // make sure titleBooks is null and is an array
            if (!titleBooks) titleBooks = [];
            else if (!titleBooks.length)
                titleBooks = [titleBooks];
            
            // make sure authorBooks is not null
            if (!authorBooks) authorBooks = [];

            // don't add empty arrays into searchedBooks
            if (titleBooks.length === 0 && authorBooks.length === 0) {
                setSearchedBooks([]);
            } else if (titleBooks.length === 0) {
                setSearchedBooks(authorBooks);
            } else if (authorBooks.length === 0) {
                setSearchedBooks(titleBooks);
            } else {
                setSearchedBooks([...titleBooks, ...authorBooks]);
            }

        } catch (error) {
            console.error("Server error while getting searched books", error);
        }
        e.target.reset(); // empty form field
    }

    return (
    <div className="col-md-8 col-lg-7 mx-auto">
        <h4>Search for a book by title or author:</h4>
        <form onSubmit={handleSubmit}>
        <div className="input-group">
            <input
                type="search"
                placeholder="Search book title or author"
                onChange={handleChange}
                value={searchInput}
                className="form-control"
                autoFocus
            />
            <button className="btn btn-primary" type="submit">Search</button>
            </div>
        </form>
        
        {searchedBooks.length > 0 && (
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                </tr>
            </thead>
            <tbody>
                {searchedBooks.map((book) => (
                    <tr key={book.id}>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )}
    </div>
    )

};

export default SearchBar;