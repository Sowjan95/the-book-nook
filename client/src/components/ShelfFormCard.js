import React from "react";
import { useNavigate } from "react-router-dom";

function ShelfFormCard({ bookProps }) {
  const navigate = useNavigate();

  function handleButtonClick(option) {
    navigate("/my_book/new", {
      state: { bookProps: bookProps, shelf: option },
    });
  }

  return (
    <div className="col-10 col-md-8 col-lg-7 container-fluid text-center">
      <div className="input-group justify-content-center">
        <h4>Choose a shelf for this book:</h4>
        <div>
          <button className="btn btn-primary" onClick={() => handleButtonClick("Read")}>Read</button>
          <button className="btn btn-primary" onClick={() => handleButtonClick("Want to Read")}>
            Want to Read
          </button>
          <button className="btn btn-primary" onClick={() => handleButtonClick("Currently Reading")}>
            Currently Reading
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShelfFormCard;