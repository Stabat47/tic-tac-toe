// src/components/Board.jsx
import { useState, useEffect } from "react";
import { checkWinner, randomMove, findBlockingMove, minimax } from "../utils/gameLogic";
import Cell from "./Cell";

export default function Board({ playerSymbol, computerSymbol, boardSize, difficulty, setWins, setLosses, setDraws }) {
  const [board, setBoard] = useState(Array(boardSize * boardSize).fill(null));
  const [status, setStatus] = useState(`You are ${playerSymbol}`);
  const [firstPlayer, setFirstPlayer] = useState("player");
  const [gameActive, setGameActive] = useState(true);
  const [winningIndices, setWinningIndices] = useState([]);

  useEffect(() => {
    if (firstPlayer === "computer") computerMove();
    // eslint-disable-next-line
  }, []);

  function handleClick(idx) {
    if (!gameActive || board[idx]) return;
    const newBoard = [...board];
    newBoard[idx] = playerSymbol;
    setBoard(newBoard);

    if (checkWinner(newBoard, playerSymbol, boardSize)) {
      setStatus("You win!");
      setWins(w => w + 1);
      endRound();
      return;
    }
    if (newBoard.every(c => c)) {
      setStatus("Draw!");
      setDraws(d => d + 1);
      endRound();
      return;
    }
    setTimeout(() => computerMove(newBoard), 200);
  }

  function computerMove(currBoard = board) {
    let move;
    if (difficulty === "easy") move = randomMove(currBoard);
    else if (difficulty === "medium") move = findBlockingMove(currBoard, playerSymbol, boardSize) || randomMove(currBoard);
    else move = findImmediateWinOrBlock(currBoard) || minimax(currBoard, computerSymbol, computerSymbol, playerSymbol, boardSize).index;

    const newBoard = [...currBoard];
    newBoard[move] = computerSymbol;
    setBoard(newBoard);

    if (checkWinner(newBoard, computerSymbol, boardSize)) {
      setStatus("Computer wins!");
      setLosses(l => l + 1);
      endRound();
      return;
    }
    if (newBoard.every(c => c)) {
      setStatus("Draw!");
      setDraws(d => d + 1);
      endRound();
      return;
    }
  }

  function findImmediateWinOrBlock(currBoard) {
    for (let i = 0; i < currBoard.length; i++) {
      if (!currBoard[i]) {
        currBoard[i] = computerSymbol;
        if (checkWinner(currBoard, computerSymbol, boardSize)) { currBoard[i] = null; return i; }
        currBoard[i] = null;
      }
    }
    for (let i = 0; i < currBoard.length; i++) {
      if (!currBoard[i]) {
        currBoard[i] = playerSymbol;
        if (checkWinner(currBoard, playerSymbol, boardSize)) { currBoard[i] = null; return i; }
        currBoard[i] = null;
      }
    }
    return null;
  }

  function endRound() {
    setGameActive(false);
    setTimeout(() => {
      setBoard(Array(boardSize * boardSize).fill(null));
      setStatus(`You are ${playerSymbol}`);
      setFirstPlayer(prev => (prev === "player" ? "computer" : "player"));
      setGameActive(true);
      setWinningIndices([]);
      if (firstPlayer === "player") return;
      computerMove(Array(boardSize * boardSize).fill(null));
    }, 1500);
  }

  return (
    <>
      <p id="difficulty-display">Difficulty: {difficulty}</p>
      <div
        id="board"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
          gridTemplateRows: `repeat(${boardSize}, 1fr)`,
          width: "100%",
          maxWidth: "400px",
          aspectRatio: "1 / 1",
          gap: "5px",
        }}
      >
        {board.map((cell, idx) => (
          <Cell
            key={idx}
            value={cell}
            onClick={() => handleClick(idx)}
            isWinning={winningIndices.includes(idx)}
          />
        ))}
      </div>
      <p id="status">{status}</p>
    </>
  );
}
