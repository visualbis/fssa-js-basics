const GameOver = ({ winner, onRestart }) => {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winner && <p>{winner} won the match</p>}
      {!winner && <p>It's a draw</p>}
      <p>
        <button onClick={onRestart}>Rematch</button>
      </p>
    </div>
  );
};
export { GameOver };
