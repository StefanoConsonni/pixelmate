import { useMemo, useState } from "react";
import { useFetch } from "./hooks/useFetch";
import { colors } from "./utils/colors";
import { Tools, Square } from "./components";

function App() {
  const [currentColor, setCurrentColor] = useState(colors.c1);
  const [currentUser, setCurrentUser] = useState("");
  const { data, isLoading, error } = useFetch("http://localhost:8000/");

  function updateSquare(coordinates, color) {
    const newSquareData = {
      coordinates: coordinates,
      user: "Stefano",
      color: color,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSquareData),
    };

    fetch("http://localhost:8000/", requestOptions)
      .then((res) => console.log(res))
      .catch((err) => {
        throw new Error(err);
      });
  }

  function SquareColorize(color) {
    setCurrentColor(color);
    let r = document.querySelector(":root");
    r.style.setProperty("--squareBgColor", color);
  }

  function handleCurrentUser(value) {
    setCurrentUser(value);
  }

  const renderGrid = useMemo(() => {
    const squares = [];
    for (let i = 0; i < 6400; i++) {
      const x = parseInt(i / 80);
      const y = parseInt(i % 80);
      const key = `${x}-${y}`;
      const squareData = (data || {})[key];

      squares.push(
        <Square
          key={key}
          position={key}
          color={squareData?.color}
          currentColor={currentColor}
          updateSquare={updateSquare}
        />
      );
    }
    return squares;
  }, [data]);

  return (
    <div className="app">
      <Tools
        currentUser={currentUser}
        handleCurrentUser={handleCurrentUser}
        handleColorChange={SquareColorize}
      />
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
