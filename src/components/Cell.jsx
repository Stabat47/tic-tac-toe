// src/components/Cell.jsx
export default function Cell({ value, onClick, isWinning }) {
  return (
    <div
      className={`cell ${value ? "taken" : ""} ${isWinning ? "winning-cell" : ""}`}
      onClick={onClick}
    >
      {value && <span>{value}</span>}
    </div>
  );
}
