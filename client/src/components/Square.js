function Square({ position, color }) {
  console.log("color", color);
  console.log("position", position);
  return <div className="square" position={position} style={{ backgroundColor: color }}></div>;
}

export default Square;
