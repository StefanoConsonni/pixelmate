import { useCallback, useEffect, useState } from "react";
import { useFetch } from "./hooks/useFetch";
import { colors } from "./utils/colors";
import { Tools, Square } from "./components";

function App() {
  const [currentColor, setCurrentColor] = useState(colors.c1);
  const [currentUser, setCurrentUser] = useState("");
  const [squaresData, setSquaresData] = useState(null);

  const { data, isLoading, error } = useFetch("http://localhost:8000/");

  function updateSquare(coordinate, color) {
    const newSquareData = {
      coordinates: coordinate,
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
      .then((res) => {
        console.log(res);
      })
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

  const getSquaresData = useCallback(() => {
    const squaresArr = [];
    for (let i = 0; i < 6400; i++) {
      const x = parseInt(i / 80);
      const y = parseInt(i % 80);
      const key = `${x}-${y}`;
      const squareData = (data || {})[key];

      squaresArr.push({
        coordinate: key,
        user: squareData?.user || "",
        color: squareData?.color || "rgb(255, 255, 255)",
      });
    }
    setSquaresData(squaresArr);
  }, [data]);

  useEffect(() => {
    getSquaresData();
  }, [getSquaresData]);

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
          {squaresData &&
            squaresData.map((square) => (
              <Square
                key={square.coordinate}
                coordinate={square.coordinate}
                color={square.color}
                currentColor={currentColor}
                updateSquare={updateSquare}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
