import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { CgMathPlus, CgMathMinus } from "react-icons/cg";

const colorMap = { r: "red", g: "green", b: "blue" };

const SliderGroup = ({ onColorChange, guessedColor, lockedSliders }) => {
  const stepValues = Array.from({ length: 26 }, (_, i) => i * 10).concat(255);

  const handleChange = (color, value) => {
    if (!lockedSliders[color]) {
      onColorChange({ ...guessedColor, [color]: value });
    }
  };

  const adjustValue = (color, change) => {
    if (lockedSliders[color]) return;

    let currentValue = guessedColor[color];
    let index = stepValues.indexOf(currentValue);
    let newValue;

    if (change === "increase" && index < stepValues.length - 1) {
      newValue = stepValues[index + 1];
    } else if (change === "decrease" && index > 0) {
      newValue = stepValues[index - 1];
    } else {
      return;
    }

    handleChange(color, newValue);
  };

  const marks = {};
  for (let i = 0; i <= 250; i += 10) {
    marks[i] = `${i}`; // Converts numbers into string labels
  }
  marks[255] = "255";

  const colors = {
    r: { name: "Red", color: "red" },
    g: { name: "Green", color: "green" },
    b: { name: "Blue", color: "blue" },
  };

  return (
    <div className="slider-group">
      {Object.keys(colors).map((color) => (
        <div className="slider" key={color}>
          <label style={{ color: colors[color].color }}>
            {" "}
            {/* ✅ Label matches color */}
            {colors[color].name}: {guessedColor[color]}{" "}
            {lockedSliders[color] ? "✔" : ""}
          </label>
          <Slider
            min={0}
            max={255}
            step={10}
            marks={marks}
            value={guessedColor[color]}
            onChange={(value) => handleChange(color, value)}
            railStyle={{ backgroundColor: `${colors[color].color}40` }} // ✅ Lightened color track
            handleStyle={{ borderColor: colors[color].color }} // ✅ Handle matches color
            trackStyle={{ backgroundColor: colors[color].color }} // ✅ Track matches color
            dots={true}
            disabled={lockedSliders[color]}
          />
          <div className="slider-buttons">
            <button
              disabled={lockedSliders[color]}
              onClick={() => adjustValue(color, "decrease")}
              style={{ backgroundColor: colors[color].color, color: "white" }} // ✅ Button color
            >
              <CgMathMinus />
            </button>
            <button
              disabled={lockedSliders[color]}
              onClick={() => adjustValue(color, "increase")}
              style={{ backgroundColor: colors[color].color, color: "white" }} // ✅ Button color
            >
              <CgMathPlus />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SliderGroup;
