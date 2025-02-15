import React, { useState } from "react";

const Scoreboard = ({ scores }) => {
  const totalScore = scores.reduce((acc, score) => acc + score, 0);
  const [playerName, setPlayerName] = useState(""); // Store name input
  const [submitted, setSubmitted] = useState(false); // Track submission

  const handleSubmit = async () => {
    if (playerName.length !== 3 || !/^[A-Z]+$/.test(playerName)) {
      alert("Please enter a 3-letter name (A-Z only)");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/scores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: playerName, score: totalScore }),
      });

      if (response.ok) {
        setSubmitted(true);
        alert("Score submitted!");
      } else {
        alert("Error submitting score.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error. Try again later.");
    }
  };

  return (
    <div className="scoreboard">
      <h2>🎉 YOU WON 3 ROUNDS! 🎉</h2>
      {scores.map((score, index) => (
        <p key={index}>Round {index + 1}: {score} guesses</p>
      ))}
      <h3>Total Score: {totalScore} (Lower is better!)</h3>

      {!submitted ? (
        <div>
          <input
            type="text"
            maxLength="3"
            placeholder="Your initials"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value.toUpperCase())}
          />
          <button onClick={handleSubmit}>Submit Score</button>
        </div>
      ) : (
        <p>✅ Score saved!</p>
      )}

      <button onClick={() => window.location.reload()}>Play Again</button>
    </div>
  );
};

export default Scoreboard;
