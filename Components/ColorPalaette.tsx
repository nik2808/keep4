import LIST_OF_COLORS from "../Constants/LIST_OF_COLORS";

export default function ColorPalette(props) {
  const handleBackgroundChange = (color) => {
    props.setBackground(color);
  };

  return (
    <div className="palette">
      {LIST_OF_COLORS.map((color) => {
        return (
          <button
            className="palette-button"
            style={{ backgroundColor: color }}
            onClick={() => handleBackgroundChange(color)}
          ></button>
        );
      })}
    </div>
  );
}
