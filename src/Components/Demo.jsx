import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Demo() {
  return (
    <div className="text-white bg-black flex items-center justify-center h-screen ">
      <div className="card bg-dark text-white w-25 h-75">
        <img
          src="https://source.unsplash.com/1600x900/?nature,water"
          className="cardImg"
          alt="cardimage"
        />
        <div className="card-img-overlay">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </p>
          <p className="card-text">Last updated 3 mins ago</p>
        </div>
      </div>
      {/* <button type="button" class="btn btn-outline-primary">
        Primary
      </button>
      <button type="button" class="btn btn-outline-warning">
        Warning
      </button> */}
    </div>
  );
}

export default Demo;
