import React from "react";
import { MdBlock } from "react-icons/md";
import { FaQuestion } from "react-icons/fa6";

const GuessButton = ({ onGuess, gameRunning }) => {
  return (
    <div className="guess-button-container">
      <button
        className="guess-button"
        onClick={onGuess}
        disabled={!gameRunning} // Disable button if game hasn't started
      >
        {gameRunning ? <FaQuestion /> : <MdBlock />}
      </button>
    </div>
  );
};

export default GuessButton;
