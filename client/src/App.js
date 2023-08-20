import { useState } from "react";
import Tools from "./components/Tools/Tools";
import { colors } from "./utils/colors";

function App() {
  const [currentColor, setCurrentColor] = useState(colors.c1);
  const [user, setUser] = useState("");

  function SquareColorize(color) {
    let r = document.querySelector(":root");
    r.style.setProperty("--squareBgColor", color);
    setCurrentColor(color);
  }

  function handleCurrentUser(value) {
    setUser(value);
  }

  return (
    <div className="app">
      <Tools user={user} handleCurrentUser={handleCurrentUser} setCurrentColor={SquareColorize} />
      <div className="board">
        <div className="canvas"></div>
      </div>
    </div>
  );
}

export default App;
