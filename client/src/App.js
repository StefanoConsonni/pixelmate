import { useCallback, useMemo, useRef, useEffect, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import toast, { Toaster } from "react-hot-toast";
import { Tools, Loading, ErrorComponent } from "./components";
import { useFetch, useCooldown } from "./hooks";
import { API, GRID_SIZE } from "./utils/constants";
import { colors } from "./utils/colors";

let currentUser = "";
let currentColor = colors.c1;
const scaleSize = 1.5;

function App() {
  const { data, isLoading, error } = useFetch(API.MAIN_URL);
  const { canChangeColor, cooldown, startCooldown } = useCooldown();
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const activePixelRef = useRef(null);
  const [overlayStyle, setOverlayStyle] = useState({ top: "0px", left: "0px" });
  console.log("overlayStyle", overlayStyle);

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
          // updateSquare(square.coordinate, currentColor)
          //   .then((resp) => {
          //     square.color = currentColor;
          //     square.user = currentUser;
          //     startCooldown();
          //     toast.success("Color successfully changed!");
          //   })
          //   .catch((err) => {
          //     throw new Error(err);
          //   });
          const clickedX = Math.floor(e.pageX / scaleSize);
          const clickedY = Math.floor(e.pageY / scaleSize);
          setOverlayStyle({ top: `${clickedY * scaleSize}px`, left: `${clickedX * scaleSize}px` });
          activePixelRef.current = `${clickedX}-${clickedY}`;
        }
      } else {
        toast.error("Username missing!");
      }
    },
    [canChangeColor, startCooldown, updateSquare]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d");
    // context.lineCap = "round";
    // context.strokeStyle = "black";
    // context.scale(2, 2);
    context.lineWidth = 5;
    contextRef.current = context;

    squaresData.forEach((square) => {
      const [x, y] = square.coordinate.split("-");
      context.fillRect(x, y, 2, 2);
      context.fillStyle = square.color;
    });
  }, [squaresData]);

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
              <canvas className="canvas" ref={canvasRef} onClick={handleSquareClick}>
                {isLoading && <Loading />}
                {error && <ErrorComponent />}
                {/* {(squaresData || []).map(
                  (square) =>   (
                    <Square key={square.coordinate} square={square} handleClick={handleSquareClick} />



                  )

                )} */}
              </canvas>
              {activePixelRef && (
                <div id="overlay-id" className="overlay-style" style={overlayStyle}></div>
              )}
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
