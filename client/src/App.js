import { useState } from "react";
import { useFetch } from "./hooks/useFetch";
import Tools from "./components/Tools/Tools";
import { colors } from "./utils/colors";

function App() {
  const [currentColor, setCurrentColor] = useState(colors.c1);
  const [user, setUser] = useState("");
  const { data, isLoading, error } = useFetch("http://localhost:8000/");

  console.log("error", error);
  console.log("data", data);
  console.log("currentColor", currentColor);

  function SquareColorize(color) {
    let r = document.querySelector(":root");
    r.style.setProperty("--squareBgColor", color);
    setCurrentColor(color);
  }

  function handleCurrentUser(value) {
    setUser(value);
  }

  if (isLoading) {
    return (
      <div className="loading">
        <div className="loading-text">Loading...</div>
      </div>
    );
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
