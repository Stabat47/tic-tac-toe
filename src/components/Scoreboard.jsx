export default function Scoreboard({ wins, losses, draws }) {
  return (
    <div id="scoreboard">
      <p>Wins: <span>{wins}</span> | Losses: <span>{losses}</span> | Draws: <span>{draws}</span></p>
    </div>
  );
}
