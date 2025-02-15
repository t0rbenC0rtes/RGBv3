import { p } from "framer-motion/client";
import React from "react";
import { MdBlock } from "react-icons/md";

const GuessButton = ({ onGuess, gameRunning }) => {
  return (
    <div className="guess-button-container">
      <button
        className="guess-button"
        onClick={onGuess}
        disabled={!gameRunning} // Disable button if game hasn't started
      >
        {gameRunning ? "guess" : <MdBlock />}
      </button>
    </div>
  );
};

export default GuessButton;
