import React from "react";

const Header = ({ onNewGame, onShowRankings, onShowHowToPlay }) => {
  return (
    <header className="header">
      <button onClick={onNewGame}>New Game</button>
      <button onClick={onShowHowToPlay}>How to Play</button>
      <button onClick={onShowRankings}>Rankings</button>
    </header>
  );
};

export default Header;
