import { useCallback, useEffect, useState } from "react";
import { useFetch } from "./hooks/useFetch";
import { colors } from "./utils/colors";
import { Tools, Square } from "./components";

function App() {
  const { data, isLoading, error } = useFetch("http://localhost:8000/");
  const [currentColor, setCurrentColor] = useState(colors.c1);
  const [currentUser, setCurrentUser] = useState("");
  const [squaresData, setSquaresData] = useState(null);

  const [canChangeColor, setCanChangeColor] = useState(true);
  const [cooldown, setCooldown] = useState(0);

  function updateSquare(coordinate, color) {
    if (!canChangeColor) {
      return;
    }
    // Get the current timestamp and store it in localStorage
    const currentTime = Date.now();
    localStorage.setItem("lastSubmitTime", currentTime);

    const newSquareData = {
      coordinates: coordinate,
      user: currentUser || "Unknown",
      color: color,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSquareData),
    };

    fetch("http://localhost:8000/", requestOptions).catch((err) => {
      throw new Error(err);
    });

    // Disable the possibility to change color and start the cooldown
    setCanChangeColor(false);
    setCooldown(5);
    // Start the countdown timer
    const timer = setInterval(() => {
      setCooldown((prevCooldown) => prevCooldown - 1);
    }, 1000);
    // Clear the timer after the cooldown ends
    setTimeout(() => {
      setCanChangeColor(true);
      clearInterval(timer);
    }, 1000 * 5);
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

  useEffect(() => {
    // Check if there's a previous timestamp in localStorage
    const lastSubmitTime = localStorage.getItem("lastSubmitTime");

    if (lastSubmitTime) {
      // Calculate the time elapsed since the last submission
      const currentTime = Date.now();
      const timeElapsed = Math.floor((currentTime - parseInt(lastSubmitTime)) / 1000);

      if (timeElapsed < 5) {
        // If still in cooldown period, don't allow to change color and start the countdown
        setCanChangeColor(false);
        setCooldown(5 - timeElapsed);
      }
    }
  }, []);

  return (
    <div className="app">
      <Tools
        currentUser={currentUser}
        handleCurrentUser={handleCurrentUser}
        handleColorChange={SquareColorize}
      />
      <div className="cooldown-container">
        <p>Cooldown: {cooldown}</p>
      </div>
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
                canChangeColor={canChangeColor}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
