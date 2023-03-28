import React, { useState } from "react";
import "./GalaxyCard.css";

const ImageCard = ({ imageUrl }) => {
  const [brightness, setBrightness] = useState(100);
  const [hue, setHue] = useState(0);

  const handleBrightnessChange = (event) => {
    setBrightness(event.target.value);
  };

  const handleHueChange = (event) => {
    setHue(event.target.value);
  };

  const handleReset = () => {
    setBrightness(100);
    setHue(0);
  };

  return (
    <div className="image-card">
      <div
        className="image"
        style={{
          backgroundImage: `url(${imageUrl})`,
          filter: `brightness(${brightness}%) hue-rotate(${hue}deg)`,
        }}
      />
      <div className="labels">
        <div className="label label-left">亮度</div>
        <div className="slider slider-left">
          <input
            type="range"
            id="brightness"
            min="0"
            max="30"
            value={brightness}
            onChange={handleBrightnessChange}
          />
        </div>
        <div className="label label-right">颜色</div>
        <div className="slider slider-right">
          <input
            type="range"
            id="hue"
            min="0"
            max="180"
            value={hue}
            onChange={handleHueChange}
          />
        </div>
      </div>
      <div className="rest">
        <button className="button-reset" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default ImageCard;