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

  return (
    <div className="slider-group">
      {["r", "g", "b"].map((color) => (
        <div className="slider" key={color}>
          <label>
            {color.toUpperCase()}: {guessedColor[color]}{" "}
            {lockedSliders[color] ? "✔" : ""}
          </label>
          <Slider
            min={0}
            max={255}
            step={10}
            value={guessedColor[color]}
            onChange={(value) => handleChange(color, value)}
            styles={{
              track: { backgroundColor: colorMap[color] }, // Map r/g/b to red/green/blue
              handle: { borderColor: colorMap[color] },
            }}
            dots={true}
            disabled={lockedSliders[color]}
          />
          <div className="slider-buttons">
            <button
              disabled={lockedSliders[color]}
              onClick={() => adjustValue(color, "decrease")}
            >
              <CgMathMinus />
            </button>
            <button
              disabled={lockedSliders[color]}
              onClick={() => adjustValue(color, "increase")}
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
