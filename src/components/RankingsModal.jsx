import React, { useEffect, useState } from "react";
import { PacmanLoader } from "react-spinners"; // ✅ Import loader

const RankingsModal = ({ isOpen, onClose }) => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [minimumTimePassed, setMinimumTimePassed] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      setMinimumTimePassed(false);

      // Minimum loader time (1 sec)
      const timer = setTimeout(() => {
        setMinimumTimePassed(true);
      }, 1000);

      fetch(`${import.meta.env.VITE_BACKEND_URL}/scores`)
        .then((res) => res.json())
        .then((data) => setScores(data))
        .catch((err) => console.error("Error fetching scores:", err))
        .finally(() => {
          setTimeout(() => {
            setLoading(false);
            clearTimeout(timer);
          }, 1000); // ✅ Guarantees loader is removed after 1 sec
        });

      return () => clearTimeout(timer); // ✅ Cleanup timer if modal closes early
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>🏆 Leaderboard 🏆</h2>

        {loading || !minimumTimePassed ? (
          <div className="loader-container">
            <PacmanLoader color="#ff9900" /> {/* ✅ Loader */}
            <p>Fetching scores...</p>
          </div>
        ) : (
          <ul>
            {scores.map((entry, index) => (
              <li key={entry._id}>
                {index + 1}. {entry.name} - {entry.score} pts
              </li>
            ))}
          </ul>
        )}

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default RankingsModal;
