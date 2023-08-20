import { colors } from "../utils/colors";

function Tools({ user, handleCurrentUser, handleColorChange }) {
  return (
    <div className="tools">
      <input
        className="input-user"
        type="text"
        placeholder="User"
        value={user}
        onChange={(e) => handleCurrentUser(e.target.value)}
      />
      <div className="palette">
        <div
          onClick={() => handleColorChange(colors.c1)}
          className="palette-item"
          style={{ backgroundColor: colors.c1 }}
        ></div>
        <div
          onClick={() => handleColorChange(colors.c2)}
          className="palette-item"
          style={{ backgroundColor: colors.c2 }}
        ></div>
        <div
          onClick={() => handleColorChange(colors.c3)}
          className="palette-item"
          style={{ backgroundColor: colors.c3 }}
        ></div>
        <div
          onClick={() => handleColorChange(colors.c4)}
          className="palette-item"
          style={{ backgroundColor: colors.c4 }}
        ></div>
        <div
          onClick={() => handleColorChange(colors.c5)}
          className="palette-item"
          style={{ backgroundColor: colors.c5 }}
        ></div>
        <div
          onClick={() => handleColorChange(colors.c6)}
          className="palette-item"
          style={{ backgroundColor: colors.c6 }}
        ></div>
        <div
          onClick={() => handleColorChange(colors.c7)}
          className="palette-item"
          style={{ backgroundColor: colors.c7 }}
        ></div>
        <div
          onClick={() => handleColorChange(colors.c8)}
          className="palette-item"
          style={{ backgroundColor: colors.c8 }}
        ></div>
        <div
          onClick={() => handleColorChange(colors.c9)}
          className="palette-item"
          style={{ backgroundColor: colors.c9 }}
        ></div>
        <div
          onClick={() => handleColorChange(colors.c10)}
          className="palette-item"
          style={{ backgroundColor: colors.c10 }}
        ></div>
        <div
          onClick={() => handleColorChange(colors.c11)}
          className="palette-item"
          style={{ backgroundColor: colors.c11 }}
        ></div>
        <div
          onClick={() => handleColorChange(colors.c12)}
          className="palette-item"
          style={{ backgroundColor: colors.c12 }}
        ></div>
        <div
          onClick={() => handleColorChange(colors.c13)}
          className="palette-item"
          style={{ backgroundColor: colors.c13 }}
        ></div>
        <div
          onClick={() => handleColorChange(colors.c14)}
          className="palette-item"
          style={{ backgroundColor: colors.c14 }}
        ></div>
        <div
          onClick={() => handleColorChange(colors.c15)}
          className="palette-item"
          style={{ backgroundColor: colors.c15 }}
        ></div>
        <div
          onClick={() => handleColorChange(colors.c16)}
          className="palette-item"
          style={{ backgroundColor: colors.c16 }}
        ></div>
      </div>
    </div>
  );
}

export default Tools;
