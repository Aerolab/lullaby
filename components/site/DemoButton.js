import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ReactComponent as PlaySVG } from "../../public/static/images/play.svg";
import { ReactComponent as PauseSVG } from "../../public/static/images/pause.svg";
import { withTranslation } from "../../i18n";

function DemoButton({ t }) {
  const TonePlayer = require("../../libs/tone").TonePlayer;

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Run the iOS Mute switch fix.
    const unmuteAudio = require("unmute-ios-audio");
    unmuteAudio();
  }, []);

  const onClick = () => {
    // Run the iOS Mute switch fix just in case
    const unmuteAudio = require("unmute-ios-audio");
    unmuteAudio();

    const didPress = !isPlaying;
    setIsPlaying(didPress);

    if (didPress) {
      TonePlayer.setBalance(0);
      TonePlayer.setFreq(10000);
      TonePlayer.play();
    } else {
      TonePlayer.stop();
    }
  };

  return (
    <button
      className={`DemoButton ${isPlaying ? "is-playing" : ""}`}
      onClick={onClick}
    >
      <span className="icon">
        {isPlaying ? (
          <PauseSVG className="pause" style={{ marginLeft: "-2px" }} />
        ) : (
          <PlaySVG className="play" />
        )}
      </span>
      <span className="label">
        <h4>{isPlaying ? t(`whatStopTinnitus`) : t(`whatTryTinnitus`)}</h4>
      </span>

      {/*language=SCSS*/}
      <style jsx>{`
        .DemoButton {
          display: flex;
          flex-direction: row;
          color: #2f2e41;
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
          font-size 14px;
          cursor: pointer;
        }
        @media(min-width: 1024px) {
          .DemoButton {
            font-size: 16px;
          }
          .DemoButton .icon {
            width: 90px;
          }
        }
        .DemoButton :global(svg) {
          display: inline-block;
          height: 1.8em;
          width: 1.8em;
          fill: var(--primary);
        }

        .DemoButton :global(svg path) {
          fill: var(--primary);
        }

        h4 {
          display: block;
          font-family: var(--sans);
          font-weight: bold;
          font-size: 16px;
          margin: 0;
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
          width: 70px;
          transition: background 0.15s ease-out;
          padding: 0 1.8em 0 2.2em;
        }
        .label {
          align-items: flex-start;
          width: 12em;
          padding-left: 0;
          padding-right: 2.5em;
        }
        .icon :global(.play) {
          margin-right: -6px;
        }
        .label {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: var(--primary);
        }

        .DemoButton:hover {
          box-shadow: 0 0px 0px 5px var(--primaryLight);
        }
        .DemoButton:active {
          outline: none;
        }
        .DemoButton:active :global(svg .icon) {
          fill: #074dda;
        }
        .DemoButton:active .play .label {
          color: #074dda;
        }
        .DemoButton.is-playing,
        .DemoButton:active {
          background: var(--primaryLight);
        }
        .DemoButton.is-playing h4 {
          animation: shake 0.3s;
          animation-iteration-count: infinite;
        }


        @keyframes shake {
          0% { transform: translate(1px, 1px) rotate(0deg); }
          10% { transform: translate(-1px, -2px) rotate(-1deg); }
          20% { transform: translate(-3px, 0px) rotate(1deg); }
          30% { transform: translate(3px, 2px) rotate(0deg); }
          40% { transform: translate(1px, -1px) rotate(1deg); }
          50% { transform: translate(-1px, 2px) rotate(-1deg); }
          60% { transform: translate(-3px, 1px) rotate(0deg); }
          70% { transform: translate(3px, 1px) rotate(-1deg); }
          80% { transform: translate(-1px, -1px) rotate(1deg); }
          90% { transform: translate(1px, 2px) rotate(0deg); }
          100% { transform: translate(1px, -2px) rotate(-1deg); }
        }
      `}</style>
    </button>
  );
}

DemoButton.propTypes = {
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  isActive: PropTypes.bool,
  isPlaying: PropTypes.bool,
  currentDuration: PropTypes.number,
  targetDuration: PropTypes.number
};

export default withTranslation("site")(DemoButton);
