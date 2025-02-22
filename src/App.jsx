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
    r: 250,
    g: 250,
    b: 250,
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
  const [invertedColor, setInvertedColor] = useState({
    r: 150,
    g: 150,
    b: 200,
  });
  const [incorrectMarks, setIncorrectMarks] = useState({ r: [], g: [], b: [] });

  const invertColor = (color) => ({
    r: 255 - color.r,
    g: 255 - color.g,
    b: 255 - color.b,
  });

  const getRandomStepValue = () => {
    const values = Array.from({ length: 26 }, (_, i) => i * 10).filter(
      (v) => v <= 250
    );
    return values[Math.floor(Math.random() * values.length)];
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
      setIncorrectMarks({ r: [], g: [], b: [] });
    }, 2000); // Display animation for 2 seconds
  };

  const randomizeBackgroundColor = () => {
    const newColor = {
      r: getRandomStepValue(),
      g: getRandomStepValue(),
      b: getRandomStepValue(),
    };

    setTargetColor(newColor);
    setInvertedColor(invertColor(newColor));

    setGuessCount(0);
    setGuessedColor({ r: 0, g: 0, b: 0 });
    setLastGuessedColor({ r: 250, g: 250, b: 250 });
    setLockedSliders({ r: false, g: false, b: false });
    setShowWinAnimation(false);
  };

  const handleGuess = () => {
    setLastGuessedColor(guessedColor);
    setGuessCount(guessCount + 1);

    let newLocked = { ...lockedSliders };
    let newIncorrectMarks = { ...incorrectMarks };
    ["r", "g", "b"].forEach((color) => {
      if (guessedColor[color] === targetColor[color]) {
        newLocked[color] = true; // Correct guess, lock slider
      } else {
        newIncorrectMarks[color] = [
          ...newIncorrectMarks[color],
          guessedColor[color],
        ]; // Add to incorrect marks
      }
    });

    setLockedSliders(newLocked);
    setIncorrectMarks(newIncorrectMarks);

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
        bgColor={invertedColor}
        textColor={targetColor}
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

          <p className="round-info">
            Round{" "}
            <span
              style={{
                color: `rgb(${targetColor.r}, ${targetColor.g}, ${targetColor.b})`,
              }}
            >
              {round}
            </span>{" "}
            of{" "}
            <span
              style={{
                color: `rgb(${invertedColor.r}, ${invertedColor.g}, ${invertedColor.b})`,
              }}
            >
              3
            </span>
          </p>

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
            incorrectMarks={incorrectMarks}
            invertedColor={invertedColor}
          />
          <GuessZone
            guessedColor={lastGuessedColor}
            lockedSliders={lockedSliders}
            invertedColor={invertedColor}
          />

          <p className="round-info">Guesses this round: {guessCount}</p>
          <GuessButton
            onGuess={handleGuess}
            gameRunning={gameRunning}
            targetColor={targetColor}
            invertedColor={invertedColor}
          />
        </>
      )}
    </motion.div>
  );
}

export default App;
