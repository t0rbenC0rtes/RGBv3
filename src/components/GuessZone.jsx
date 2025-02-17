import React from "react";
import { BsPaintBucket } from "react-icons/bs";

const GuessZone = ({
  guessedColor,
  lockedSliders = { r: false, g: false, b: false },
}) => {
  return (
    <div className="guess-zone">
      <div
        className="color-display"
        style={{
          backgroundColor: `rgb(${guessedColor?.r || 0}, ${
            guessedColor?.g || 0
          }, ${guessedColor?.b || 0})`,
          transition: "background-color 0.3s ease",
        }}
      ><BsPaintBucket style={{color:"blue", fontSize:"5rem", marginTop:"1rem"}}/></div>
    </div>
  );
};

export default GuessZone;
