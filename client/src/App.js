import { useMemo, useState } from "react";
import { useFetch } from "./hooks/useFetch";
import { colors } from "./utils/colors";
import { Tools, Square } from "./components";

function App() {
  const [currentColor, setCurrentColor] = useState(colors.c1);
  const [user, setUser] = useState("");
  const { data, isLoading, error } = useFetch("http://localhost:8000/");

  function SquareColorize(color) {
    let r = document.querySelector(":root");
    r.style.setProperty("--squareBgColor", color);
    setCurrentColor(color);
  }

  function handleCurrentUser(value) {
    setUser(value);
  }

  const renderGrid = useMemo(() => {
    const squares = [];
    for (let i = 0; i < 6400; i++) {
      const x = parseInt(i / 80);
      const y = parseInt(i % 80);
      const key = `${x}-${y}`;
      const squareData = (data || {})[key];

      squares.push(<Square key={key} position={key} color={squareData?.color} />);
    }
    return squares;
  }, [data]);

  return (
    <div className="app">
      <Tools user={user} handleCurrentUser={handleCurrentUser} handleColorChange={SquareColorize} />
      <div className="board">
        <div className="canvas">
          {isLoading && (
            <div className="loading-error">
              <div className="loading-error-text">Loading...</div>
            </div>
          )}
          {error && (
            <div className="loading-error">
              <div className="loading-error-text">Something went wrong</div>
            </div>
          )}
          {renderGrid}
        </div>
      </div>
    </div>
  );
}

export default App;
