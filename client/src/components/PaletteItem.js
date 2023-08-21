function PaletteItem({ handleColorChange, color }) {
  return (
    <div
      onClick={() => handleColorChange(color)}
      className="palette-item"
      style={{ backgroundColor: color }}
    ></div>
  );
}

export default PaletteItem;
