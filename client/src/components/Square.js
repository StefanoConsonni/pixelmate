function Square({ position, color }) {
  return (
    <div className="square" position={position} style={{ backgroundColor: color || "white" }}></div>
  );
}

export default Square;
