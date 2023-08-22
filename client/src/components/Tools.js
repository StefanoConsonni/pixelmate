import { useState } from "react";
import { colors } from "../utils/colors";
import PaletteItem from "./PaletteItem";

function Tools({ handleCurrentUser, handleColorChange }) {
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
    handleCurrentUser(e.target.value);
  };

  return (
    <div className="tools">
      <input
        type="text"
        placeholder="Username"
        value={input}
        onChange={handleInputChange}
        className="input-user"
      />
      <div className="palette">
        {Object.entries(colors).map((color) => (
          <PaletteItem key={color[0]} handleColorChange={handleColorChange} color={color[1]} />
        ))}
      </div>
    </div>
  );
}

export default Tools;
