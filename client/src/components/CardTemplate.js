import React from "react";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
// import "../card.css"

function CardTemplate({props, loggedIn}) {
  const handleDelete = async function(event){
    event.preventDefault();
    try{
      const url = "/api/events/" + props.id;
      await fetch(url, {method: "DELETE"})
      .then(() => console.log("deleted event "));
      window.location.reload(false);
    }catch(error){
      console.log(error);
    }
  }

  return (
    <div className="cardStyle">
      <Card style={{ width: '18rem' }}>
      <Card.Body className="lowerCard">
        <Card.Title>Title: {props.title}</Card.Title>
        <Card.Text>Author: {props.author}</Card.Text>
        <Card.Link href={props.link} target="_blank" className="link-color">Register</Card.Link>
      </Card.Body>
    </Card>
    {loggedIn && (
      <div className="buttons">
        <Button className="button">
          <Link className="update-link" to="/event-form" state={{eventInfo: props}}>Update</Link>
        </Button>
        <Button className="button" onClick={handleDelete}>Delete</Button>
        
      </div>
    )}
    </div>
    
  );
}

export default CardTemplate;