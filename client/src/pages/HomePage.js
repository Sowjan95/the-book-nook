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
//   const[parks, setParks] = useState();
//   const[concerts, setConcerts] = useState();
//   const[tours, setTours] = useState();
//   const [date, setDate] = useState(new Date());
//   const [sortByDate, setSortByDate] = useState(false);
//   const [eventsByDate, setEventsByDate] = useState(null);

  //fetch data
  useEffect(() => {
    async function getBooks() {
      try {
        let response = await fetch("/api/books/");
        let data = orderAscendingByDate( await response.json());
        setBooks(data);
      } catch (error) {
        console.error("Error fetching all books", error);
      }
    }
    async function getMyBooks() {
      try {
        let response = await fetch("/api/my_book/allmybooks");
        let data = orderAscendingByDate( await response.json());
        setMyBooks(data);
      } catch (error) {
        console.error("Error fetching all user's books", error);
      }
    }
    // get my book by shelf -> currently reading


    // async function getConcerts() {
    //   try {
    //     let response = await fetch("/api/events/Concerts & Shows");
    //     let data = orderAscendingByDate( await response.json());
    //     setConcerts(data);
    //   } catch (error) {
    //     console.error("Error fetching all concert events", error);
    //   }
    // }
    // async function getFree() {
    //   try {
    //     let response = await fetch("/api/events/Free Events");
    //     let data = orderAscendingByDate( await response.json());
    //     setFree(data);
    //   } catch (error) {
    //     console.error("Error fetching all free events", error);
    //   }
    // }
    // async function getTours() {
    //   try {
    //     let response = await fetch("/api/events/Attractions & Tours");
    //     let data = orderAscendingByDate( await response.json());
    //     setTours(data);
    //   } catch (error) {
    //     console.error("Error fetching all tour events", error);
    //   }
    // }
    function orderAscendingByDate(data){
      const copyData = []
      .concat(data)
      .sort((a, b) => (a.date > b.date ? 1 : -1));
      return copyData;
    }
    getBooks();
    getMyBooks();
  }, []);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//         let response = await fetch(`/api/events/date/${date}`);
//         let data = await response.json();
//         setEventsByDate(data);
//         console.log(eventsByDate);
//         setSortByDate(true);
//     } catch (error) {
//         console.error("Server error while creating new event", error);
//     }
//   };
  
//   const clearFilter = async (event) => {
//     event.preventDefault();
//     setSortByDate(false);
//   }

  return 
}

export default HomePage;