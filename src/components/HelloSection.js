import React from "react";
import "../App.css";
import { Button } from "./Button";
import "./HelloSection.css";

function HelloSection() {
  return (
    <div className="hello-container">
      <video src="/videos/video-1.mp4" autoPlay loop muted />
      <h1>Galaxy Museum</h1>
      <p>What are you waiting for?</p>
      <div className="hello-btns">
        <Button
          className="btns"
          buttonStyle="btn--outline"
          to="/Galclass"
          id="galaxy"
          buttonSize="btn--large"
        >
          GET STARTED
        </Button>
        <Button
          className="btns"
          buttonStyle="btn--primary"
          buttonSize="btn--large"
          onClick={console.log("hey")}
        >
          WATCH VIDEO <i className="far fa-play-circle" />
        </Button>
      </div>
    </div>
  );
}

export default HelloSection;


