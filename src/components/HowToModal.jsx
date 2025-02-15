import React from "react";

const HowToModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>How to Play</h2>
        <p>
          🎨 Your goal is to match the background color by adjusting the RGB sliders. 🎨
        </p>
        <p>🔹 Move the sliders to set Red, Green, and Blue values. 🔹</p>
        <p>🔒 If a color component is correct, it locks. 🔒</p>
        <p>🏆 Match all three to win the round! 🏆</p>
        <p>🏁 Each game consists of 3 rounds. 🏁</p>
        <p>⛔ Each wrong guess counts for a point. Lowest score wins. 👇</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default HowToModal;
