import React from "react";
import { MdBlock } from "react-icons/md";

const GuessButton = ({ onGuess, gameRunning, invertedColor, targetColor }) => {
  return (
    <div className="guess-button-container">
      <button
        style={{
          backgroundColor: `rgb(${invertedColor.r}, ${invertedColor.g}, ${invertedColor.b})`,
          color: `rgb(${targetColor.r}, ${targetColor.g}, ${targetColor.b})`,
        }}
        className="guess-button"
        onClick={onGuess}
        disabled={!gameRunning} // Disable button if game hasn't started
      >
        {gameRunning ? "Guess !" : <MdBlock />}
      </button>
    </div>
  );
};

export default GuessButton;
