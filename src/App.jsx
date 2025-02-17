import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "./components/Header";
import SliderGroup from "./components/SliderGroup";
import GuessZone from "./components/GuessZone";
import GuessButton from "./components/GuessButton";
import Scoreboard from "./components/Scoreboard";
import HowToModal from "./components/HowToModal";
import RankingsModal from "./components/RankingsModal";
import "./main.scss";

function App() {
  const [guessedColor, setGuessedColor] = useState({ r: 0, g: 0, b: 0 });
  const [lastGuessedColor, setLastGuessedColor] = useState({
    r: 255,
    g: 255,
    b: 255,
  });
  const [targetColor, setTargetColor] = useState({ r: 5, g: 15, b: 30 });
  const [guessCount, setGuessCount] = useState(0);
  const [round, setRound] = useState(1);
  const [scores, setScores] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [lockedSliders, setLockedSliders] = useState({
    r: false,
    g: false,
    b: false,
  });
  const [showWinAnimation, setShowWinAnimation] = useState(false);
  const [showRoundAnimation, setShowRoundAnimation] = useState(false);
  const [gameRunning, setGameRunning] = useState(false);
  const [isHowToOpen, setIsHowToOpen] = useState(false);
  const [isRankingsOpen, setIsRankingsOpen] = useState(false);

  const getRandomStepValue = () => {
    const values = Array.from({ length: 26 }, (_, i) => i * 10).concat(255);
    return values[Math.floor(Math.random() * values.length)];
  };

  const handleGameOver = (finalScores) => {
    setScores(finalScores);
    setGameOver(true);
  };

  const startNewGame = () => {
    setGameRunning(true);
    setRound(1);
    setScores([]);
    setGameOver(false);
    setLockedSliders({ r: false, g: false, b: false });
    startNewRound(1);
  };

  const startNewRound = (roundNumber) => {
    setShowRoundAnimation(true);

    setTimeout(() => {
      setShowRoundAnimation(false);
      randomizeBackgroundColor();
    }, 2000); // Display animation for 2 seconds
  };

  const randomizeBackgroundColor = () => {
    const newColor = {
      r: getRandomStepValue(),
      g: getRandomStepValue(),
      b: getRandomStepValue(),
    };

    setTargetColor(newColor);    
    setGuessCount(0);
    setGuessedColor({ r: 0, g: 0, b: 0 });
    setLastGuessedColor({ r: 255, g: 255, b: 255 });
    setLockedSliders({ r: false, g: false, b: false });
    setShowWinAnimation(false);
  };

  const handleGuess = () => {
    setLastGuessedColor(guessedColor);
    setGuessCount(guessCount + 1);

    let newLocked = { ...lockedSliders };
    if (guessedColor.r === targetColor.r) newLocked.r = true;
    if (guessedColor.g === targetColor.g) newLocked.g = true;
    if (guessedColor.b === targetColor.b) newLocked.b = true;

    setLockedSliders(newLocked);

    if (newLocked.r && newLocked.g && newLocked.b) {
      setScores([...scores, guessCount]);

      if (round < 3) {
        setShowWinAnimation(true);

        setTimeout(() => {
          setRound(round + 1);
          setLockedSliders({ r: false, g: false, b: false });
          startNewRound(round + 1);
        }, 2000);
      } else {
        setGameOver(true);
      }
    }
  };

  return (
    <motion.div
      className="app-container"
      animate={{
        backgroundColor: `rgb(${targetColor.r}, ${targetColor.g}, ${targetColor.b})`,
      }}
      transition={{ duration: 0.5 }} // Smooth color transition
    >
      <Header
        onNewGame={startNewGame}
        onShowRankings={() => setIsRankingsOpen(true)}
        onShowHowToPlay={() => setIsHowToOpen(true)}
      />

      <HowToModal isOpen={isHowToOpen} onClose={() => setIsHowToOpen(false)} />
      <RankingsModal
        isOpen={isRankingsOpen}
        onClose={() => setIsRankingsOpen(false)}
      />

      {gameOver ? (
        <Scoreboard scores={scores} />
      ) : (
        <>
          {showRoundAnimation && (
            <motion.div
              className="round-animation"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              🚀 Round {round} Start! 🚀
            </motion.div>
          )}

          <p className="round-info">Round {round} of 3</p>

          {showWinAnimation && (
            <motion.div
              className="win-animation"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              🎉 Round complete! 🎉
            </motion.div>
          )}

          <SliderGroup
            onColorChange={setGuessedColor}
            guessedColor={guessedColor}
            lockedSliders={lockedSliders}
          />
          <GuessZone
            guessedColor={lastGuessedColor}
            lockedSliders={lockedSliders}
          />

          <p className="round-info">Guesses this round: {guessCount}</p>
          <GuessButton onGuess={handleGuess} gameRunning={gameRunning} />
        </>
      )}
    </motion.div>
  );
}

export default App;
