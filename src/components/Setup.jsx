export default function Setup({ playerSymbol, setPlayerSymbol, boardSize, setBoardSize, difficulty, setDifficulty, onStart }) {
  return (
    <div id="setup-screen">
      <p>Choose your symbol:</p>
      <button
        className={playerSymbol === "X" ? "selected" : ""}
        onClick={() => setPlayerSymbol("X")}
      >X</button>
      <button
        className={playerSymbol === "O" ? "selected" : ""}
        onClick={() => setPlayerSymbol("O")}
      >O</button>

      <p>Choose board size:</p>
      <select value={boardSize} onChange={e => setBoardSize(Number(e.target.value))}>
        <option value="3">3×3</option>
        <option value="4">4×4</option>
        <option value="5">5×5</option>
      </select>

      <p>Choose difficulty:</p>
      <select value={difficulty} onChange={e => setDifficulty(e.target.value)}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <button id="start-game" onClick={onStart}>Start Game</button>
    </div>
  );
}
