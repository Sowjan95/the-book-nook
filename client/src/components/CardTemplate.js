import React from "react";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
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

  // return (
  //   <div className="cardStyle">
  //     <Card style={{ width: '18rem' }}>
  //     <Card.Header>{props.title}</Card.Header>
  //     <Card.Body className="lowerCard">
  //       <Card.Title>Title: {props.title}</Card.Title>
  //       <Card.Text>Author: {props.author}</Card.Text>
  //       <Card.Link href={props.link} target="_blank" className="link-color">Register</Card.Link>
  //     </Card.Body>
  //   </Card>
  //   {loggedIn && (
  //     <div className="buttons">
  //       <Button className="button">
  //         <Link className="update-link" to="/event-form" state={{eventInfo: props}}>Update</Link>
  //       </Button>
  //       <Button className="button" onClick={handleDelete}>Delete</Button>
        
  //     </div>
  //   )}
  //   </div>
    
  // );

  return (
    <div className="container-fluid text-center">
    <div className="row justify-content-center">
    <div className="col-10 col-md-8 col-lg-7">
    <div className="card mb-4 shadow">
        <div className="card-body card-text">
          <h2>{props.title}</h2>
          <h4>{props.author}</h4>
          <p>Pages: {props.pages}</p>
        </div>
    </div>
    </div>
    </div>
    </div>
    )
}

export default CardTemplate;