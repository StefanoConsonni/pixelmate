import { useCallback, useMemo } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import toast, { Toaster } from "react-hot-toast";
import { Tools, Square, Loading, ErrorComponent } from "./components";
import { useFetch, useCooldown } from "./hooks";
import { API, GRID_SIZE } from "./utils/constants";
import { colors } from "./utils/colors";

let currentUser = "";
let currentColor = colors.c1;

function App() {
  const { data, isLoading, error } = useFetch(API.MAIN_URL);
  const { canChangeColor, cooldown, startCooldown } = useCooldown();

  const updateSquare = useCallback((coordinate, color) => {
    // Get the current timestamp and store it in localStorage
    const currentTime = Date.now();
    localStorage.setItem("lastSubmitTime", currentTime);

    const newSquareData = {
      coordinates: coordinate,
      user: currentUser,
      color: color,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSquareData),
    };

    return fetch(API.MAIN_URL, requestOptions);
  }, []);

  const squareColorize = useCallback((color) => {
    currentColor = color;
    let r = document.querySelector(":root");
    r.style.setProperty("--squareBgColor", color);
  }, []);

  const handleCurrentUserChange = useCallback((value) => {
    currentUser = value;
  }, []);

  const squaresData = useMemo(() => {
    const squaresArr = [];
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
      const x = parseInt(i / GRID_SIZE);
      const y = parseInt(i % GRID_SIZE);
      const key = `${x}-${y}`;
      const squareData = (data || {})[key];

      squaresArr.push({
        coordinate: key,
        user: squareData?.user || "",
        color: squareData?.color || "rgb(255, 255, 255)",
      });
    }
    return squaresArr;
  }, [data]);

  const handleSquareClick = useCallback(
    (e, square) => {
      if (currentUser) {
        if (canChangeColor) {
          updateSquare(square.coordinate, currentColor)
            .then((resp) => {
              square.color = currentColor;
              square.user = currentUser;
              startCooldown();
              toast.success("Color successfully changed!");
            })
            .catch((err) => {
              throw new Error(err);
            });
        }
      } else {
        toast.error("Username missing!");
      }
    },
    [canChangeColor, startCooldown, updateSquare]
  );

  return (
    <div className="app">
      <Tools handleCurrentUser={handleCurrentUserChange} handleColorChange={squareColorize} />
      <div className="cooldown-container">
        <p>Cooldown: {cooldown}</p>
      </div>
      <div className="board-container">
        <TransformWrapper initialScale={1} panning={{ disabled: true }} pinch={{ disabled: true }}>
          <TransformComponent>
            <div className="board">
              <div className="canvas">
                {isLoading && <Loading />}
                {error && <ErrorComponent />}
                {(squaresData || []).map((square) => (
                  <Square key={square.coordinate} square={square} handleClick={handleSquareClick} />
                ))}
              </div>
            </div>
          </TransformComponent>
        </TransformWrapper>
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            border: "3px solid #d44ddb",
            borderRadius: "2px",
            color: "#0a0a0a",
            padding: "10px",
            fontSize: "14px",
          },
        }}
      />
    </div>
  );
}

export default App;
