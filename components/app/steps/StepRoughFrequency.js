import PropTypes from "prop-types";
import * as React from "react";
import { calculateERB } from "../../../libs/tone";
import PlayButtonSmall from "../PlayButtonSmall";
import { withTranslation } from "../../../i18n";
import SquareButton from "../SquareButton";

const MIN_PLAY_DURATION = 700;

class StepRoughFrequency extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      frequency: this.props.startFrequency,
      lastDiff: this.props.startFrequency,
      step: 0,
      showButtons: false,
      isPlaying: false
    };
  }

  playToggle = on => {
    const { TonePlayer, balance } = this.props;

    if (on) {
      TonePlayer.setBalance(balance);
      TonePlayer.setFreq(this.state.frequency);
      TonePlayer.play();
      this.setState({
        showButtons: true,
        isPlaying: true
      });
    } else {
      TonePlayer.stop();
      this.setState({ isPlaying: false });
    }
  };

  nextStep = direction => {
    let { TonePlayer, onGetFrequency } = this.props;
    let { frequency, lastDiff } = this.state;
    let step = this.state.step + 1;

    if (direction === 0) {
      // Same freq as before!
    } else if (direction > 0) {
      frequency = Math.round(frequency + lastDiff / 2);
    } else if (direction < 0) {
      frequency = Math.round(frequency - lastDiff / 2);
    } else {
      throw new Error(`Wat. That's not a valid direction`);
    }

    lastDiff = Math.abs(this.state.frequency - frequency);

    const erbSize = calculateERB(frequency);
    const done = lastDiff < erbSize / 2;

    if (done) {
      onGetFrequency(frequency);
      return;
    }

    this.setState({ frequency, step, lastDiff, showButtons: false });
    TonePlayer.setFreq(frequency);
  };

  render() {
    const { step, showButtons } = this.state;
    const { t } = this.props;
    const stepTitles = [
      t(`FrequencyPrompt1`),
      t(`FrequencyPrompt2`),
      t(`FrequencyPrompt3`),
      t(`FrequencyPrompt4`),
      t(`FrequencyPrompt5`),
      t(`FrequencyPrompt6`),
      t(`FrequencyPrompt7`),
      t(`FrequencyPrompt8`),
      t(`FrequencyPrompt9`),
      t(`FrequencyPrompt10`),
      t(`FrequencyPrompt11`)
      // This should be enough
    ];

    return (
      <div>
        <h1>
          {step >= stepTitles.length
            ? `Attempt #${step + 1}`
            : stepTitles[step]}
        </h1>

        <div className="play">
          <PlayButtonSmall
            onChange={this.playToggle}
            minDuration={MIN_PLAY_DURATION}
            label={t(`PlayExample`)}
          />
        </div>

        <div className="controls">
          <SquareButton
            size="small"
            disabled={!showButtons}
            onClick={() => this.nextStep(-1)}
          >
            {t(`FrequencyIsLower`)}
          </SquareButton>
          <SquareButton
            size="small"
            disabled={!showButtons}
            onClick={() => this.nextStep(0)}
          >
            {t(`FrequencyIsSimilar`)}
          </SquareButton>
          <SquareButton
            size="small"
            disabled={!showButtons}
            onClick={() => this.nextStep(+1)}
          >
            {t(`FrequencyIsHigher`)}
          </SquareButton>
        </div>

        {/*language=SCSS*/}
        <style jsx>{`
          h1 {
            font-size: var(--titleSize);
            font-weight: normal;
            font-style: italic;
          }
          .controls {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-gap: 1em;
            flex-grow: 1;
            align-items: center;
            margin-left: 1em;
            margin-right: 1em;
            margin-bottom: 2em;
          }
          @media (max-width: 768px) {
            .controls {
              grid-template-columns: 1fr;
            }
          }
          .play {
            margin: 2em auto;
          }
        `}</style>
      </div>
    );
  }
}

StepRoughFrequency.propTypes = {
  /** The Tone Player */
  TonePlayer: PropTypes.object.isRequired,
  /** The starting frequency for the rough pass */
  startFrequency: PropTypes.number.isRequired,
  /** Receives the rough frequency or null if there's no tinnitus on that side */
  onGetFrequency: PropTypes.func.isRequired
};

export default withTranslation("app")(StepRoughFrequency);
