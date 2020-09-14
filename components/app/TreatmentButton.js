import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ReactComponent as PlaySVG } from "../../public/static/images/play.svg";
import { ReactComponent as PauseSVG } from "../../public/static/images/pause.svg";
import { withTranslation } from "../../i18n";
import { formatTimer } from "../../libs/time";

function TreatmentButton({
  t,
  isPlaying,
  size,
  currentDuration,
  targetDuration,
  onChange,
  onClick
}) {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = didPress => {
    // This is so we don't trigger things twice when using touchStart and mouseDown in Safari
    if (isPressed === didPress) return;
    setIsPressed(didPress);
    if (onChange) onChange(didPress);
  };

  const percentProgress = (currentDuration / targetDuration) * 100;

  return (
    <button
      className={`TreatmentButton ${isPlaying ? "is-playing" : ""} ${
        size ? `size-${size}` : ""
      }`}
      onClick={() => (onClick ? onClick() : null)}
      onMouseDown={() => handlePress(true)}
      onMouseUp={() => handlePress(false)}
      onTouchStart={() => handlePress(true)}
      onTouchEnd={() => handlePress(false)}
    >
      <span className="icon">
        {isPlaying ? (
          <PauseSVG className="pause" style={{ marginLeft: "-2px" }} />
        ) : (
          <PlaySVG className="play" />
        )}
      </span>
      <span
        className="label"
        style={{
          background: `linear-gradient(
            to right,
            #d4cdfa ${percentProgress}%,
            rgba(255,255,255,0) ${percentProgress + 0.001}%
          )`
        }}
      >
        <h4>{t(`TimeLeft`)}</h4>
        <span className="timer">
          {formatTimer(3 * 60 * 60 - currentDuration)}
        </span>
      </span>

      {/*language=SCSS*/}
      <style jsx>{`
        .TreatmentButton {
          display: flex;
          flex-direction: row;
          color: #2f2e41;
          font-size: 1em;
          font-weight: bold;
          border: none;
          border-radius: 4em;
          width: auto;
          padding: 0;
          background: none;
          border: 3px solid var(--primary);
          transition: all 0.1s ease-out;
          box-sizing: border-box;
          user-select: none;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          margin: 0 auto;
          overflow: hidden;
          outline: none;
          box-shadow: 0;
          font-size 16px;
          cursor: pointer;
        }
        @media(min-width: 1024px) {
          .TreatmentButton {
            font-size: 18px;
          }
        }
        .TreatmentButton :global(svg) {
          display: inline-block;
          height: 1.8em;
          width: 1.8em;
          fill: var(--primary);
        }

        .TreatmentButton :global(svg path) {
          fill: var(--primary);
        }

        h4 {
          display: block;
          font-family: var(--sans);
          font-weight: bold;
          font-size: 16px;
          margin: 0;
        }
        .timer {
          display: block;
          font-family: var(--sans);
          font-weight: normal;
          font-size: 24px;
        }

        .icon,
        .label {
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 5.5em;
          padding: 0 2em;
          text-transform: uppercase;
        }
        .icon {
          width: 90px;
          transition: background 0.15s ease-out;
          padding: 0 1.8em 0 2.2em;
        }
        .label {
          align-items: flex-start;
          min-width: 12em;
          border-left: 3px solid var(--primary);
        }
        .icon :global(.play) {
          margin-right: -6px;
        }
        .label {
          display: flex;
          flex-direction: column;
          align-items: left;
          justify-content: center;
          color: var(--primary);
          white-space: nowrap;
          text-align: left;
        }

        .TreatmentButton:hover {
          box-shadow: 0 0px 0px 5px var(--primaryLight);
        }
        .TreatmentButton:active {
          outline: none;
        }
        .TreatmentButton:active :global(svg .icon) {
          fill: #074dda;
        }
        .TreatmentButton:active .play .label {
          color: #074dda;
        }
        .TreatmentButton.is-playing .icon,
        .TreatmentButton:active .icon {
          background: var(--primaryLight);
        }
      `}</style>
    </button>
  );
}

TreatmentButton.propTypes = {
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  isActive: PropTypes.bool,
  isPlaying: PropTypes.bool,
  currentDuration: PropTypes.number,
  targetDuration: PropTypes.number
};

export default withTranslation("app")(TreatmentButton);
