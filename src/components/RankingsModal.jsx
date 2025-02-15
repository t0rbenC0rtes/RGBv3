import React, { useEffect, useState } from "react";

const RankingsModal = ({ isOpen, onClose }) => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetch("http://localhost:5000/scores")
        .then((res) => res.json())
        .then((data) => setScores(data))
        .catch((err) => console.error("Error fetching scores:", err));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>🏆 Leaderboard 🏆</h2>
        <ul>
          {scores.map((entry, index) => (
            <li key={entry._id}>
              {index + 1}. {entry.name} - {entry.score} pts
            </li>
          ))}
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default RankingsModal;
