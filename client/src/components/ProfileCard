import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
// import "../userprofile.css"

function ProfileCard(props) {
    return (
        <div  className="user-info">
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Name: {props.name}</Card.Title>
                    <Card.Text>Email: {props.email}</Card.Text>
                    <a href="/edit-profile">
                        <Button className="user-button">Edit Profile</Button>{' '}
                    </a>
                   
                    {/* <a href="/event-form">
                    <Button className= "user-button">Send Recommendation</Button>{' '}
                    </a> */}
                    
                </Card.Body>
            </Card>
        </div>

    );
}


export default ProfileCard;