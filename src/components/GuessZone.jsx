
import React from "react";
import { BsPaintBucket } from "react-icons/bs";

const GuessZone = ({ guessedColor, invertedColor }) => {
  return (
    <div className="guess-zone">
      <div
        className="color-display"
        style={{
          backgroundColor: `rgb(${guessedColor?.r || 0}, ${guessedColor?.g || 0}, ${guessedColor?.b || 0})`,
          transition: "background-color 0.3s ease",
          position: "relative",
        }}
      >
        <BsPaintBucket
          style={{
            color: `rgb(${invertedColor.r}, ${invertedColor.g}, ${invertedColor.b})`, // ✅ Uses inverted color
            fontSize: "5rem",
            marginTop: "1rem",
          }}
        />
      </div>
    </div>
  );
};

export default GuessZone;
