import PropTypes from "prop-types";
import * as React from "react";
import { Button } from "./Button";
import VolumeControl from "./VolumeControl";
import { isPhone } from "../../libs/utils";
import { withTranslation } from "../../i18n";

class VolumeTutorial extends React.Component {
  constructor(props) {
    super(props);
    this.state = { volume: 0.0, isPlaying: false, step: 1 };
  }

  startAudioContext() {
    if (this.audio) return;

    this.audio = new (window.AudioContext || window.webkitAudioContext)();
    this.gain = this.audio.createGain();
    this.gain.connect(this.audio.destination);
    this.gain.gain.value = 0.07;

    var n = 4096;
    var scriptProcessor = this.audio.createScriptProcessor(n, 1, 1);

    scriptProcessor.onaudioprocess = function(e) {
      for (var t = e.outputBuffer.getChannelData(0), o = 0; n > o; o++) {
        t[o] = 2 * Math.random() - 1;
      }
    };

    scriptProcessor.connect(this.gain);
  }

  onDragStart = () => {
    // We need to start the audiocontext on a user event (touchstart/click).
    // onChange breaks in iOS.
    this.startAudioContext();
  };

  onChangeVolume = volume => {
    if (!this.audio) return;
    this.gain.gain.value = Math.pow(1.2, volume) - 1.0;
    this.setState({ volume });
  };

  onFinishStep3 = async () => {
    this.nextStep();
  };

  nextStep = () => {
    const { step, volume } = this.state;
    if (step === 2) {
      // Start the white noise
      this.startAudioContext();
    } else if (step === 3) {
      this.gain.gain.value = 0.001;
    } else if (step === 4) {
      if (this.audio) this.audio.close();
      delete this.audio;
    } else if (step === 5) {
      this.props.onFinish(volume);
    }
    this.setState({ step: this.state.step + 1 });
  };

  render() {
    const { step } = this.state;
    const { t } = this.props;

    return (
      <div className="VolumeTutorial">
        <main>
          {step === 1 && (
            <div className="TutorialDevice">
              <h1>{t(`Welcome to your treatment!`)}</h1>

              <div className="note">
                <h3>{t(`Before we start`)}</h3>
                {isPhone()
                  ? t(
                      `It's important to set both your phone's and the app's volume correctly for this treatment. Let's see how.`
                    )
                  : t(
                      `It's important to set both your computer's and the app's volume correctly for this treatment. Let's see how.`
                    )}
              </div>

              <div className="cta">
                <Button onClick={this.nextStep}>{t(`Let's start`)}</Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="TutorialDevice">
              {isPhone() ? (
                <h1>
                  {t(
                    `Put your headphones on and lower your phone's volume to the minimum`
                  )}
                </h1>
              ) : (
                <h1>
                  {t(
                    `Put your headphones on and lower your computer's volume to the minimum`
                  )}
                </h1>
              )}
              <div className="cta">
                <Button onClick={this.nextStep}>{t(`Done`)}</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="TutorialDevice">
              {isPhone() ? (
                <h1>
                  {t(
                    `Raise the volume on your phone until you can comfortably hear the white noise`
                  )}
                </h1>
              ) : (
                <h1>
                  {t(
                    `Raise the volume on your computer until you can comfortably hear the white noise`
                  )}
                </h1>
              )}
              <div className="cta">
                <Button onClick={this.onFinishStep3}>{t(`Done`)}</Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="TutorialApp">
              <h1>
                {t(
                  `Adjust the volume below until your Tinnitus is slightly louder than the white noise`
                )}
              </h1>

              <div className="side">
                <VolumeControl
                  min={0.001}
                  defaultValue={0.001}
                  max={1.0}
                  step={0.001}
                  onDragStart={this.onDragStart}
                  onChange={this.onChangeVolume}
                />
              </div>

              <div className="cta">
                <Button onClick={this.nextStep}>{t(`Sounds good!`)}</Button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="TutorialDevice">
              {isPhone() ? (
                <h1>
                  {t(
                    `Remember: When you change the volume on your phone, always set the app's volume to be slightly less loud than your Tinnitus`
                  )}
                </h1>
              ) : (
                <h1>
                  {t(
                    `Remember: When you change the volume on your computer, always set the app's volume to be slightly less loud than your Tinnitus`
                  )}
                </h1>
              )}
              <div className="cta">
                <Button onClick={this.nextStep}>
                  {t(`Start the treatment`)}
                </Button>
              </div>
            </div>
          )}
        </main>

        {/*language=SCSS*/}
        <style jsx>{`
          main {
            max-width: 900px;
            margin: 0 auto;
          }
          h1 {
            font-size: var(--titleSize);
            font-style: italic;
          }
          .side {
            display: grid;
            grid-template-columns: auto;
            grid-gap: 1em;
          }
          h3 {
            color: var(--primary);
            text-transform: uppercase;
            font-weight: bold;
            font-family: var(--sans);
            margin: 0;
            margin-bottom: 0.5em;
          }
          .note {
            margin: 2em auto;
            border-left: 7px solid var(--secondary);
            padding: 1.5em 2em 2em 2em;
            max-width: 30em;
            background: white;
            text-align: left;
          }
          .cta {
            margin-top: 2em;
          }
          a {
            color: white;
            text-decoration: underline;
          }
        `}</style>
      </div>
    );
  }
}

VolumeTutorial.propTypes = {
  onChangeVolume: PropTypes.func,
  onFinish: PropTypes.func
};

export default withTranslation("app")(VolumeTutorial);
