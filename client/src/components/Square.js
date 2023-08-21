import { useRef } from "react";

function Square({ coordinate, color, currentColor, updateSquare }) {
  const divRef = useRef(null);

  const changeBgColor = () => {
    divRef.current.style.backgroundColor = currentColor;
  };

  return (
    <div
      className="square"
      coordinate={coordinate}
      onClick={() => {
        changeBgColor();
        updateSquare(coordinate, currentColor);
      }}
      style={{ backgroundColor: color || "rgb(255, 255, 255)" }}
      ref={divRef}
    ></div>
  );
}

export default Square;
