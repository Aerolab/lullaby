import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { FreqSlider } from "../FreqSlider";
import { calculateERB } from "../../../libs/tone";
import PlayButtonSmall from "../PlayButtonSmall";
import { Button } from "../Button";
import { withTranslation } from "../../../i18n";

const MIN_PLAY_DURATION = 700;
let toneTimeout = null;

function StepFineFrequency({
  t,
  TonePlayer,
  balance,
  startFrequency,
  onGetFrequency
}) {
  // Store the startFrequency locally so it doesn't change when the tone is set upstream
  const [initialFrequency] = useState(startFrequency);
  const [frequency, setFrequency] = useState(initialFrequency);
  const [didMoveSlider, setDidMoveSlider] = useState(false);

  const handleDragStart = () => {
    TonePlayer.play();
  };

  const handleDragEnd = () => {
    clearTimeout(toneTimeout);
    toneTimeout = setTimeout(() => {
      TonePlayer.stop();
    }, MIN_PLAY_DURATION);
  };

  const handleMoveSlider = newFrequency => {
    setDidMoveSlider(true);
    setFrequency(newFrequency);

    TonePlayer.setBalance(balance);
    TonePlayer.setFreq(newFrequency);

    // Play the sound as the slider moves and stop it a bit later for reference
    TonePlayer.play();
    clearTimeout(toneTimeout);
    toneTimeout = setTimeout(() => {
      TonePlayer.stop();
    }, MIN_PLAY_DURATION);
  };

  const playToggle = on => {
    on ? TonePlayer.play() : TonePlayer.stop();
  };

  const erbSize = calculateERB(initialFrequency);
  const rangeSize = 1;

  return (
    <div>
      <h1>{t(`ExactFrequencyPrompt`)}</h1>

      <div className="controls">
        <div className="slider">
          <FreqSlider
            min={+Math.round(initialFrequency - erbSize * rangeSize)}
            max={+Math.round(initialFrequency + erbSize * rangeSize)}
            defaultValue={initialFrequency}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onChange={handleMoveSlider}
          />
        </div>
        {/* <div className="play">
          <PlayButtonSmall
            onChange={playToggle}
            minDuration={MIN_PLAY_DURATION}
          />
        </div> */}
      </div>

      <div className="side">
        <Button
          important
          onClick={() => onGetFrequency(frequency)}
          disabled={!didMoveSlider}
        >
          {t(`FrequencyFound`)}
        </Button>
      </div>

      {/*language=SCSS*/}
      <style jsx>{`
        h1 {
          font-size: var(--titleSize);
          font-style: italic;
        }
        .controls {
          display: flex;
          flex-direction: column;
          margin: 2em 0;
        }
        .slider {
          display: flex;
          flex-grow: 1;
          align-items: center;
          margin-bottom: 1em;
        }
        .play {
          flex-grow: 0;
        }
      `}</style>
    </div>
  );
}

StepFineFrequency.propTypes = {
  startFrequency: PropTypes.number.isRequired,
  onGetFrequency: PropTypes.func.isRequired
};

export default withTranslation("app")(StepFineFrequency);
