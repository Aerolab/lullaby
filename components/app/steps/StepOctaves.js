import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import PlayButtonSquare from "../PlayButtonSquare";
import { Button } from "../Button";
import { withTranslation } from "../../../i18n";

const MIN_PLAY_DURATION = 700;
let toneTimeout = null;

function StepOctaves({ t, startFrequency, TonePlayer, onGetFrequency }) {
  const [initialFrequency] = useState(startFrequency);
  const [frequency, setFrequency] = useState(initialFrequency);

  const playTone = newFrequency => {
    setFrequency(newFrequency);
    TonePlayer.setFreq(newFrequency);
    TonePlayer.play();

    clearTimeout(toneTimeout);
    toneTimeout = setTimeout(() => TonePlayer.stop(), MIN_PLAY_DURATION);
  };

  const canContinue = frequency > 0;
  const numButtons = initialFrequency <= 8000 ? 3 : 2;

  return (
    <div className="StepOctaves">
      <h1>{t(`OctavePrompt`)}</h1>

      <div className={`octaves buttons-${numButtons}`}>
        <PlayButtonSquare
          onChange={on => on && playTone(initialFrequency / 2)}
          isActive={frequency === initialFrequency / 2}
          size="medium"
        >
          A
        </PlayButtonSquare>
        <PlayButtonSquare
          onChange={on => on && playTone(initialFrequency)}
          isActive={frequency === initialFrequency}
          size="medium"
        >
          B
        </PlayButtonSquare>
        {/* Avoid the upper octave if it's going to be above the human hearing range */}
        {numButtons === 3 && (
          <PlayButtonSquare
            onChange={on => on && playTone(initialFrequency * 2)}
            isActive={frequency === initialFrequency * 2}
            size="medium"
          >
            C
          </PlayButtonSquare>
        )}
      </div>

      <div className="cta">
        {canContinue ? (
          <Button onClick={() => onGetFrequency(frequency)}>
            {t(`ItsOctave`)}{" "}
            {frequency === startFrequency / 2
              ? "A"
              : frequency === startFrequency
              ? "B"
              : "C"}
          </Button>
        ) : (
          <Button onClick={() => onGetFrequency(frequency)}>
            {t(`ChooseOctave`)}
          </Button>
        )}
      </div>

      {/*language=SCSS*/}
      <style jsx>{`
        h1 {
          font-size: var(--titleSize);
          font-style: italic;
        }
        .octaves {
          margin: 2em auto;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-gap: 1em;
          max-width: 45em;
        }
        @media (min-width: 768px) {
          .octaves {
            grid-gap: 2em;
          }
        }
        .octaves.buttons-2 {
          grid-template-columns: 1fr 1fr;
          max-width: 30em;
        }
        .cta {
          margin-top: 2em;
        }
      `}</style>
    </div>
  );
}

StepOctaves.propTypes = {
  /** The Tone Player */
  TonePlayer: PropTypes.object.isRequired,
  /** The reference frequency for octave comparison */
  startFrequency: PropTypes.number.isRequired,
  /** Receives the frequency adjusted by octave */
  onGetFrequency: PropTypes.func.isRequired
};

export default withTranslation("app")(StepOctaves);
