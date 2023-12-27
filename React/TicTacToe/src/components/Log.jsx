const Log = ({ turns }) => {
  return (
    <ol id="log">
      {turns.map((turn) => (
        <li key={`${turn.square.row} ${turn.square.col}`}>
          {turn.player} Selcted {turn.square.row} {turn.square.col}
        </li>
      ))}
    </ol>
  );
};

export { Log };
