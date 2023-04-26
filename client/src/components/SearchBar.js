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

            setSearchedBooks([]);

            const titleBooksPromise = fetch(`/api/books/title/${searchInput}`)
                .then(res => res.clone().json() || [])
            const authorBooksPromise = fetch(`/api/books/author/${searchInput}`)
                .then(res => res.clone().json() || []);

            let [titleBooks, authorBooks] = await Promise.all([titleBooksPromise, authorBooksPromise]);

            if (!titleBooks) titleBooks = [];
            else if (titleBooks.length === 1) titleBooks = [titleBooks];
            if (!authorBooks) authorBooks = [];
            else if (authorBooks.length === 1) authorBooks = [authorBooks];

            console.log(titleBooks);
            console.log(authorBooks);

            if (titleBooks.length === 0 && authorBooks.length === 0) {
                setSearchedBooks([]);
            } else if (titleBooks.length === 0) {
                setSearchedBooks(authorBooks);
            } else if (authorBooks.length === 0) {
                setSearchedBooks(titleBooks);
            } else {
                setSearchedBooks([...titleBooks, ...authorBooks]);
            }
              
            console.log(searchedBooks)

            // return data;
        } catch (error) {
            console.error("Server error while getting searched books", error);
        }
        e.target.reset(); // empty form field
    }

    return (
    <div>
        <form onSubmit={handleSubmit}>
            <input
                type="search"
                placeholder="Search book title or author"
                onChange={handleChange}
                value={searchInput}
            />
            <button type="submit">Search</button>
        </form>
        
        <table>
        <thead>
          <tr>
            <th>Book</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {searchedBooks && searchedBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )

};

export default SearchBar;