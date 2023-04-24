import React, { useState, useEffect } from "react";
import CardTemplate from "../components/CardTemplate";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'; 
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

function HomePage(props) {
  const[books, setBooks] = useState();
  const[myBooks, setMyBooks] = useState();
  const[myCurrentBooks, setMyCurrentBooks] = useState();

  //fetch data
  useEffect(() => {

    // get regular books
    async function getBooks() {
      try {
        let response = await fetch("/api/books/");
        let data = orderAscendingByAddedDate( await response.json());
        setBooks(data);
      } catch (error) {
        console.error("Error fetching all books", error);
      }
    }

    // get some of user's recently added books
    async function getMyBooks() {
      try {
        let response = await fetch("/api/my_book/allmybooks");
        let data = orderAscendingByAddedDate( await response.json());
        setMyBooks(data);
      } catch (error) {
        console.error("Error fetching all user's books", error);
      }
    }
    
    // get books user is currently reading
    async function getMyCurrentBooks() {
      try {
        let response = await fetch("/api/my_book/shelf/Currently Reading");
        let data = orderAscendingByStartedDate( await response.json());
        setMyCurrentBooks(data);
      } catch (error) {
        console.error("Error fetching all currently reading books", error);
      }
    }

    function orderAscendingByAddedDate(data){
      const copyData = []
      .concat(data)
      .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
      return copyData;
    }

    function orderAscendingByStartedDate(data){
      const copyData = []
      .concat(data)
      .sort((a, b) => (a.date_started > b.date_started ? 1 : -1));
      return copyData;
    }

    getBooks();
    getMyBooks();
    getMyCurrentBooks();
  }, []);

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //       let response = await fetch(`/api/events/date/${date}`);
  //       let data = await response.json();
  //       setEventsByDate(data);
  //       console.log(eventsByDate);
  //       setSortByDate(true);
  //   } catch (error) {
  //       console.error("Server error while creating new event", error);
  //   }
  // };
  
//   const clearFilter = async (event) => {
//     event.preventDefault();
//     setSortByDate(false);
//   }

  return 
}

export default HomePage;