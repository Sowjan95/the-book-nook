import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function CardTemplate({props, loggedIn, onAddToShelf }) {
  
  return (
    <div className="container-fluid text-center">
      <div className="row justify-content-center">
        <div className="col-10 col-md-8 col-lg-7">
          <div className="card mb-4 shadow">
            <div className="card-body card-text">
              <h2>{props.title}</h2>
              <h4>{props.author}</h4>
              <p>Pages: {props.pages}</p>
              <button className="btn btn-success" type="button" onClick={onAddToShelf}>
                Add to Shelf
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardTemplate;