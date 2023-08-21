import { colors } from "../utils/colors";
import PaletteItem from "./PaletteItem";

function Tools({ currentUser, handleCurrentUser, handleColorChange }) {
  return (
    <div className="tools">
      <input
        className="input-user"
        type="text"
        placeholder="Username"
        value={currentUser}
        onChange={(e) => handleCurrentUser(e.target.value)}
      />
      <div className="palette">
        <PaletteItem handleColorChange={handleColorChange} color={colors.c1} />
        <PaletteItem handleColorChange={handleColorChange} color={colors.c2} />
        <PaletteItem handleColorChange={handleColorChange} color={colors.c3} />
        <PaletteItem handleColorChange={handleColorChange} color={colors.c4} />
        <PaletteItem handleColorChange={handleColorChange} color={colors.c5} />
        <PaletteItem handleColorChange={handleColorChange} color={colors.c6} />
        <PaletteItem handleColorChange={handleColorChange} color={colors.c7} />
        <PaletteItem handleColorChange={handleColorChange} color={colors.c8} />
        <PaletteItem handleColorChange={handleColorChange} color={colors.c9} />
        <PaletteItem handleColorChange={handleColorChange} color={colors.c10} />
        <PaletteItem handleColorChange={handleColorChange} color={colors.c11} />
        <PaletteItem handleColorChange={handleColorChange} color={colors.c12} />
        <PaletteItem handleColorChange={handleColorChange} color={colors.c13} />
        <PaletteItem handleColorChange={handleColorChange} color={colors.c14} />
        <PaletteItem handleColorChange={handleColorChange} color={colors.c15} />
        <PaletteItem handleColorChange={handleColorChange} color={colors.c16} />
      </div>
    </div>
  );
}

export default Tools;
