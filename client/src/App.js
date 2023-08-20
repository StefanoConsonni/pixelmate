import { useState } from "react";
import { useFetch } from "./hooks/useFetch";
import { colors } from "./utils/colors";
import { Tools, Square } from "./components";

function App() {
  const [currentColor, setCurrentColor] = useState(colors.c1);
  const [user, setUser] = useState("");
  const { data, isLoading, error } = useFetch("http://localhost:8000/");

  console.log("error", error);
  console.log("data", data);
  console.log("currentColor", currentColor);
  if (data) console.log("Object.entries(data)", Object.entries(data));

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
        {isLoading && (
          <div className="loading">
            <div className="loading-text">Loading...</div>
          </div>
        )}
        <div className="canvas">
          {data &&
            Object.entries(data).map((position) => (
              <Square key={position[0]} position={position[0]} color={position[1].color} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
