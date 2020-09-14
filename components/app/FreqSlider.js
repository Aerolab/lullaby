import React, { useState, useEffect } from "react";

export function FreqSlider({
  min,
  max,
  step,
  defaultValue,
  onChange,
  onDragStart,
  onDragEnd
}) {
  const [value, setValue] = useState(defaultValue || min || 0.001);
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = event => {
    const newValue = parseFloat(event.target.value);
    setValue(newValue);
    onChange(newValue);
  };

  const handleDrag = newIsDragging => {
    // This is so we don't trigger things twice when using touchStart and mouseDown in Safari
    if (isDragging === newIsDragging) return;
    if (newIsDragging && onDragStart) onDragStart();
    if (!newIsDragging && onDragEnd) onDragEnd();
    setIsDragging(newIsDragging);
  };

  const percentProgress = ((value - min) / (max - min)) * 100;
  // This is a hack for Chrome so the progress stays hidden behind the thumb
  const percentProgressGradient =
    percentProgress +
    (percentProgress < 40 ? 3 : percentProgress > 60 ? -3 : 0);

  return (
    <div className="FreqSlider">
      <input
        type="range"
        onChange={handleChange}
        onMouseDown={() => handleDrag(true)}
        onMouseUp={() => handleDrag(false)}
        onTouchStart={() => handleDrag(true)}
        onTouchEnd={() => handleDrag(false)}
        min={min}
        max={max}
        step={step || 1}
        value={value || max / min}
      />

      {/*language=SCSS*/}
      <style jsx>{`
        .FreqSlider {
          width: 100%;
        }
        input[type="range"] {
          -webkit-appearance: none;
          margin: 18px 0;
          width: 100%;
          background: none;
        }
        input[type="range"]:focus {
          outline: none;
        }

        input[type="range"]::-webkit-slider-runnable-track {
          width: 100%;
          display: block;
          cursor: pointer;
          background: linear-gradient(
            to right,
            #d4cdfa ${percentProgressGradient}%,
            #ffffff ${percentProgressGradient + 0.00001}%
          );
          height: 30px;
          border-radius: 15px;
          border: 1px solid white;
        }
        input[type="range"]::-webkit-slider-thumb {
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
          height: 36px;
          width: 36px;
          margin-top: -4px;
          border-radius: 100%;
          background: var(--primary);
          border: 1px solid var(--primary);
          cursor: pointer;
          -webkit-appearance: none;
          transition: box-shadow 0.2s ease-out;
        }
        input[type="range"]:active::-webkit-slider-thumb {
          box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
        }

        @media (min-width: 768px) {
          input[type="range"]::-webkit-slider-runnable-track {
            height: 50px;
            border-radius: 25px;
          }
          input[type="range"]::-webkit-slider-thumb {
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
            height: 66px;
            width: 66px;
            margin-top: -10px;
          }
        }

        /* Firefox */
        input[type="range"]::-moz-range-progress {
          background-color: var(--primaryLight);
        }

        /* IE */
        input[type="range"]::-ms-track {
          width: 100%;
          height: 8.4px;
          cursor: pointer;
          background: transparent;
          border-color: transparent;
          border-width: 16px 0;
          color: transparent;
        }
        input[type="range"]::-ms-fill-lower {
          background-color: var(--primaryLight);
        }
        input[type="range"]::-ms-fill-upper {
          background-color: white;
        }
        input[type="range"]::-ms-thumb {
          box-shadow: 1px 1px 1px #000000, 0 0 1px #0d0d0d;
          border: 1px solid #000000;
          height: 36px;
          width: 16px;
          border-radius: 3px;
          background: #ffffff;
          cursor: pointer;
        }
        input[type="range"]:focus::-ms-fill-lower {
          background: #3071a9;
        }
        input[type="range"]:focus::-ms-fill-upper {
          background: #367ebd;
        }
      `}</style>
    </div>
  );
}
