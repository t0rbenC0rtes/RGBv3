import React from "react";

const Header = ({ onNewGame, onShowRankings, onShowHowToPlay, bgColor, textColor }) => {
  return (
    <header
      className="header"
      style={{
        backgroundColor: `rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})`,
        color: `rgb(${textColor.r}, ${textColor.g}, ${textColor.b})`,
      }}
    >
      <button style={{
        backgroundColor: `rgb(${textColor.r}, ${textColor.g}, ${textColor.b})`,
        color: `rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})`,
      }} onClick={onNewGame}>New Game</button>
      <button style={{
        backgroundColor: `rgb(${textColor.r}, ${textColor.g}, ${textColor.b})`,
        color: `rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})`,
      }} onClick={onShowHowToPlay}>How to Play</button>
      <button style={{
        backgroundColor: `rgb(${textColor.r}, ${textColor.g}, ${textColor.b})`,
        color: `rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})`,
      }} onClick={onShowRankings}>Rankings</button>
    </header>
  );
};

export default Header;
