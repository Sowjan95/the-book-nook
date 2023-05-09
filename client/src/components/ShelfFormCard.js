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
    <div className="col-10 col-md-8 col-lg-7">
      <div className="input-group">
        <div>
          <button onClick={() => handleButtonClick("Read")}>Read</button>
          <button onClick={() => handleButtonClick("Want to Read")}>
            Want to Read
          </button>
          <button onClick={() => handleButtonClick("Currently Reading")}>
            Currently Reading
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShelfFormCard;