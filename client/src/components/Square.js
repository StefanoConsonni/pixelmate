import { useRef } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional

function Square({ coordinate, color, user, currentColor, updateSquare, canChangeColor }) {
  const divRef = useRef(null);

  const changeBgColor = () => {
    divRef.current.style.backgroundColor = currentColor;
  };

  return (
    <Tippy
      content={`${coordinate} • ${user || "Unknown"} • ${color}`}
      placement="bottom"
      delay={800}
    >
      <div
        className="square"
        coordinate={coordinate}
        onClick={() => {
          if (canChangeColor) {
            changeBgColor();
            updateSquare(coordinate, currentColor);
          }
        }}
        style={{ backgroundColor: color || "rgb(255, 255, 255)" }}
        ref={divRef}
      ></div>
    </Tippy>
  );
}

export default Square;
