export default function RulesModal({ onClose }) {
  return (
    <div id="rules-modal">
      <div className="modal-content">
        <h2>Game Rules</h2>
        <ul>
          <li>3×3 → 3 in a row wins</li>
          <li>4×4 → 4 in a row wins</li>
          <li>5×5 → 4 in a row wins</li>
          <li>You vs Computer</li>
          <li>Scoreboard tracks wins/losses/draws</li>
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
