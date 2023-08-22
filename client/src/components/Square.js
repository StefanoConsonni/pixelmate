import React from "react";
import { useCallback } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

function Square({ square, handleClick }) {
  const onClick = useCallback(
    (e) => {
      handleClick(e, square);
    },
    [handleClick, square]
  );

  return (
    <Tippy
      content={`${square.coordinate} • ${square.user || "Unknown"} • ${square.color}`}
      delay={1000}
    >
      <div
        className="square"
        coordinate={square.coordinate}
        onClick={onClick}
        style={{ backgroundColor: square.color || "rgb(255, 255, 255)" }}
      ></div>
    </Tippy>
  );
}

export default React.memo(Square);
