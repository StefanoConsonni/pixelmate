function Square({ position, color, currentColor, updateSquare }) {
  return (
    <div
      className="square"
      position={position}
      onClick={() => {
        updateSquare(position, currentColor);
      }}
      style={{ backgroundColor: color || "white" }}
    ></div>
  );
}

export default Square;
