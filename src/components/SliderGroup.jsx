import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { BiBorderRadius } from "react-icons/bi";
import { CgMathPlus, CgMathMinus } from "react-icons/cg";

const colorMap = { r: "red", g: "green", b: "blue" };

const SliderGroup = ({
  onColorChange,
  guessedColor,
  lockedSliders,
  incorrectMarks = { r: [], g: [], b: [] },
  invertedColor,
}) => {
  const stepValues = Array.from({ length: 26 }, (_, i) => i * 10).filter(
    (v) => v <= 250
  );

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

  const colors = {
    r: { name: "Red", color: "red" },
    g: { name: "Green", color: "green" },
    b: { name: "Blue", color: "blue" },
  };

  return (
    <div className="slider-group">
      {Object.keys(colors).map((color) => {
        const incorrect = incorrectMarks[color] || [];
        // Define marks inside the loop, so it gets the right color
        const marks = {};
        for (let i = 0; i <= 250; i += 10) {
          marks[i] = {
            style: {
              color: colors[color].color,
              fontWeight: "bold",
              fontSize: "12px",
              textShadow: `
                -.5px -.5px 0 lightGray,  
                 .5px -.5px 0 lightGray,  
                -.5px  .5px 0 lightGray,  
                 .5px  .5px 0 lightGray
              `,
            },
            label: incorrect.includes(i) ? "❌" : `${i}`,
          };
        }

        return (
          <div className="slider" key={color}>
            <label
              style={{
                color: colors[color].color,
                borderColor: colors[color].color,
                border: "4px solid",
                minWidth: "6.8rem",
              }}
            >
              {colors[color].name}: {guessedColor[color]}{" "}
              {lockedSliders[color] ? "✔" : ""}
            </label>

            <div className="slider-buttons">
              <button
                disabled={lockedSliders[color]}
                onClick={() => adjustValue(color, "decrease")}
                style={{
                  backgroundColor: colors[color].color,
                  color: "white",
                  border: `4px solid rgb(${invertedColor.r}, ${invertedColor.g}, ${invertedColor.b})`,
                }}
              >
                <CgMathMinus />
              </button>
              <button
                disabled={lockedSliders[color]}
                onClick={() => adjustValue(color, "increase")}
                style={{
                  backgroundColor: colors[color].color,
                  color: "white",
                  border: `4px solid rgb(${invertedColor.r}, ${invertedColor.g}, ${invertedColor.b})`,
                }}
              >
                <CgMathPlus />
              </button>
            </div>
            <Slider
              min={0}
              max={250}
              step={10}
              marks={marks} // ✅ Now correctly colored per slider
              value={guessedColor[color]}
              onChange={(value) => handleChange(color, value)}
              railStyle={{
                backgroundColor: `${colors[color].color}40`,
                height: "10px", // ✅ Matches track height
              }}
              handleStyle={{
                borderColor: colors[color].color,
                width: "22px", // ✅ Bigger handle for better grip
                height: "22px",
                marginTop: "-8px", // ✅ Centers handle with track
              }}
              trackStyle={{
                backgroundColor: colors[color].color,
                height: "15px", // ✅ Same height as rail
                marginTop: "-5px",
              }}
              dots={true}
              disabled={lockedSliders[color]}
            />
          </div>
        );
      })}
    </div>
  );
};

export default SliderGroup;
