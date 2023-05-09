import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function CardTemplate({props, loggedIn, onAddToShelf }) {
  const [user, setUser] = useState();

  useEffect(() => {

    // fetch user
    async function getUser() {
      try {
        const userResponse = await fetch("/api/auth/login");
        const userData = await userResponse.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching all user data", error);
      }
    }
    
    getUser();
  }, []);
  
  return (
    <div className="container-fluid text-center">
      <div className="row justify-content-center">
        <div className="col-10 col-md-8 col-lg-7">
          <div className="card mb-4 shadow">
            <div className="card-body card-text">
              <h2>{props.title}</h2>
              <h4>{props.author}</h4>
              <p>Pages: {props.pages}</p>
              {user && (
                <button className="btn btn-success" type="button" onClick={onAddToShelf}>
                  Add to Shelf
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardTemplate;