import React, { Component } from "react";
import VolumeDown from "../../public/static/images/icon-volume-down.svg";
import VolumeUp from "../../public/static/images/icon-volume-up.svg";
import { FreqSlider } from "./FreqSlider";
import { withTranslation } from "../../i18n";

function VolumeControl({ defaultValue, step, onChange, onDragStart }) {
  return (
    <div className="VolumeControl">
      <div className="volume volume-down">
        <VolumeDown />
      </div>
      <FreqSlider
        min={0.001}
        defaultValue={defaultValue}
        max={1.0}
        step={step || 0.001}
        onDragStart={onDragStart ? onDragStart : () => {}}
        onChange={onChange ? onChange : () => {}}
      />
      <div className="volume volume-up">
        <VolumeUp />
      </div>

      {/*language=SCSS*/}
      <style jsx>{`
        .VolumeControl {
          width: 100%;
          max-width: 700px;
          margin: 0 auto;
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .volume {
          background: none;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-grow: 0;
          flex-basis: 24px;
          margin: 0;
          opacity: 0.3;
        }
        .volume-down {
          margin-right: 1em;
        }
        .volume-up {
          margin-left: 1em;
        }
        .volume :global(svg) {
          width: 24px;
          height: 24px;
          fill: white;
        }
        input[type="range"] {
          -webkit-appearance: none;
          margin: 8px 0 7px 0;
          display: block;
          background: none;
          border-radius: 3px;
          flex-grow: 1;
        }
        input[type="range"]:focus {
          outline: none;
        }
        input[type="range"]::-webkit-slider-runnable-track {
          width: 100%;
          display: block;
          height: 4px;
          cursor: pointer;
          background: rgba(0, 0, 0, 0.1);
          border-radius: 4px;
          border: 0.2px solid #010101;
        }
        input[type="range"]::-webkit-slider-thumb {
          box-shadow: 0 1px 10px rgba(0, 0, 0, 0.3);
          height: 18px;
          width: 18px;
          border-radius: 100%;
          background: white;
          border: 1px solid #f0f0f0;
          cursor: pointer;
          -webkit-appearance: none;
          margin-top: -8px;
        }
        input[type="range"]:focus::-webkit-slider-thumb {
          background: #e0e0e0;
        }

        input[type="range"]::-moz-range-track {
          width: 100%;
          height: 4px;
          cursor: pointer;
          box-shadow: 1px 1px 1px #000000, 0 0 1px #0d0d0d;
          background: #3071a9;
          border-radius: 1.3px;
          border: 0.2px solid #010101;
        }
        input[type="range"]::-moz-range-thumb {
          box-shadow: 1px 1px 1px #000000, 0 0 1px #0d0d0d;
          border: 1px solid #000000;
          height: 18px;
          width: 8px;
          border-radius: 3px;
          background: #ffffff;
          cursor: pointer;
        }
        input[type="range"]::-ms-track {
          width: 100%;
          height: 4px;
          cursor: pointer;
          background: transparent;
          border-color: transparent;
          border-width: 16px 0;
          color: transparent;
        }
        input[type="range"]::-ms-fill-lower {
          background: #2a6495;
          border: 0.2px solid #010101;
          border-radius: 2.6px;
          box-shadow: 1px 1px 1px #000000, 0 0 1px #0d0d0d;
        }
        input[type="range"]::-ms-fill-upper {
          background: #3071a9;
          border: 0.2px solid #010101;
          border-radius: 2.6px;
          box-shadow: 1px 1px 1px #000000, 0 0 1px #0d0d0d;
        }
        input[type="range"]::-ms-thumb {
          box-shadow: 1px 1px 1px #000000, 0 0 1px #0d0d0d;
          border: 1px solid #000000;
          height: 18px;
          width: 8px;
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

export default withTranslation("app")(VolumeControl);
