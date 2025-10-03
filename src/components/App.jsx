import { useState } from "react";
import Setup from "./Setup";
import Board from "./Board";
import Scoreboard from "./Scoreboard";
import RulesModal from "./RulesModal";
import "../index.css";

export default function App() {
  const [playerSymbol, setPlayerSymbol] = useState("X");
  const [computerSymbol, setComputerSymbol] = useState("O");
  const [boardSize, setBoardSize] = useState(3);
  const [difficulty, setDifficulty] = useState("easy");
  const [showRules, setShowRules] = useState(false);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [draws, setDraws] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const handleStart = () => {
    setComputerSymbol(playerSymbol === "X" ? "O" : "X");
    setGameStarted(true);
  };

  const resetGame = () => {
    setGameStarted(false);
  };

  return (
    <div className="tictactoe-app">
      <h1>Ultimate Tic Tac Toe</h1>

      {!gameStarted && (
        <Setup
          playerSymbol={playerSymbol}
          setPlayerSymbol={setPlayerSymbol}
          boardSize={boardSize}
          setBoardSize={setBoardSize}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          onStart={handleStart}
        />
      )}

      {gameStarted && (
        <>
          <Board
            playerSymbol={playerSymbol}
            computerSymbol={computerSymbol}
            boardSize={boardSize}
            difficulty={difficulty}
            setWins={setWins}
            setLosses={setLosses}
            setDraws={setDraws}
          />
          <Scoreboard wins={wins} losses={losses} draws={draws} />
          <button id="reset-game" onClick={resetGame}>Reset Game</button>
        </>
      )}

      <button id="rules-btn" onClick={() => setShowRules(true)}>Rules</button>
      {showRules && <RulesModal onClose={() => setShowRules(false)} />}
    </div>
  );
}
