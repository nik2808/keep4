import styles from "./ColorPalette.module.css";
import LIST_OF_COLORS from "../../Constants/LIST_OF_COLORS";

export default function ColorPalette(props) {
  const handleBackgroundChange = (color) => {
    props.setBackground(color);
  };

  return (
    <div className={styles.palette}>
      {LIST_OF_COLORS.map((color) => {
        return (
          <button
            className={styles.palette_button}
            style={{ backgroundColor: color }}
            onClick={() => handleBackgroundChange(color)}
          ></button>
        );
      })}
    </div>
  );
}
