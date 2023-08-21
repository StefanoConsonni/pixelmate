import { useRef } from "react";
import toast from "react-hot-toast";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

function Square({
  coordinate,
  color,
  user,
  currentUser,
  currentColor,
  updateSquare,
  canChangeColor,
}) {
  const divRef = useRef(null);

  function changeBgColor() {
    divRef.current.style.backgroundColor = currentColor;
    toast.success("Color successfully changed!");
  }

  function handleClick() {
    if (currentUser) {
      if (canChangeColor) {
        changeBgColor();
        updateSquare(coordinate, currentColor);
      }
    } else {
      toast.error("Username missing!");
    }
  }

  return (
    <Tippy
      content={`${coordinate} • ${user || "Unknown"} • ${color}`}
      className="tooltip"
      delay={1000}
    >
      <div
        className="square"
        coordinate={coordinate}
        onClick={() => handleClick()}
        style={{ backgroundColor: color || "rgb(255, 255, 255)" }}
        ref={divRef}
      ></div>
    </Tippy>
  );
}

export default Square;
