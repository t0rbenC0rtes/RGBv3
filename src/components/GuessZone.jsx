import React from "react";

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
      ></div>
    </div>
  );
};

export default GuessZone;
