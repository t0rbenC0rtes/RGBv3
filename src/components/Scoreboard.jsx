import React from "react";

const Scoreboard = ({ scores }) => {
  const totalScore = scores.reduce((acc, score) => acc + score, 0);

  return (
    <div className="scoreboard">
      <h2>🎉🎉🎉YOU WON 3 ROUNDS🎉🎉🎉</h2>
      {scores.map((score, index) => (
        <p key={index}>Round {index + 1}: {score} guesses</p>
      ))}
      <h3>Total Score: {totalScore} (Lower is better!)</h3>
      <button onClick={() => window.location.reload()}>Play Again</button>
    </div>
  );
};

export default Scoreboard;
