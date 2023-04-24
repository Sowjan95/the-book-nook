import React, { useState, useEffect } from "react";
import CardTemplate from "../components/CardTemplate";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import ProfileCard from "../components/ProfileCard";
// import "../userprofile.css"

function UserProfile() {
  const [user, setUser] = useState();
  const [myFavoriteBooks, setMyFavoriteBooks] = useState();
  const [myCurrentBooks, setMyCurrentBooks] = useState();
//   const[update, setUpdate] = useState(true);
  //fetch data
  useEffect(() => {
    async function getUser() {
      try {
        let response = await fetch("/api/auth/login");
        let data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching all user data", error);
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

    // get books user is currently reading
    async function getMyFavoriteBooks() {
      try {
        let response = await fetch("/api/my_book/favorites");
        let data = orderAscendingByAddedDate( await response.json());
        setMyFavoriteBooks(data);
      } catch (error) {
        console.error("Error fetching all favorite books", error);
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

    getUser();
    getMyCurrentBooks();
    getMyFavoriteBooks();
});
//   }, [update]);

  return (
    <div>
      <h1 className="profileHeader title">Welcome, User!</h1>
      <Container>
        <Row>
          <Col>
            <Image className="profileImage" src="https://images.unsplash.com/photo-1518998053901-5348d3961a04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80" />
          </Col>

          <Col className= "placement-card">
            {user && (
              <ProfileCard name={user.username} email={user.email} />
            )}
          </Col>
        
        </Row>
      </Container>
      <br /> <br />
      <h2 className="profileHeader title">Currently Reading</h2>
      <Container>
        {myCurrentBooks && (
          <div className="current-mybooks">
            {myCurrentBooks.map((event) => (
              <CardTemplate  key={event.id} props={event} loggedIn={true} />
            ))
            }
          </div>
        )}
      </Container>
      <br /> <br />
      <h2 className="profileHeader title">Favorite Books</h2>
      <Container>
        {myFavoriteBooks && (
          <div className="favorite-mybooks">
            {myFavoriteBooks.map((event) => (
              <CardTemplate  key={event.id} props={event} loggedIn={true} />
            ))
            }
          </div>
        )}
      </Container>

      <br /><br />
    </div>
  );
}

export default UserProfile;