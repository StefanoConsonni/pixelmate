function Square({ coordinate, color, currentColor, updateSquare }) {
  return (
    <div
      className="square"
      coordinate={coordinate}
      onClick={() => {
        updateSquare(coordinate, currentColor);
      }}
      style={{ backgroundColor: color || "white" }}
    ></div>
  );
}

export default Square;
