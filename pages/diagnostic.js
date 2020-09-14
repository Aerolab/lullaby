import React, { Component } from "react";
import StepVolume from "../components/app/steps/StepVolume";
import StepSide from "../components/app/steps/StepSide";
import StepWelcome from "../components/app/steps/StepWelcome";
import StepChatter from "../components/app/steps/StepChatter";
import StepRoughFrequency from "../components/app/steps/StepRoughFrequency";
import StepFineFrequency from "../components/app/steps/StepFineFrequency";
import StepSuccess from "../components/app/steps/StepSuccess";
import StepOctaves from "../components/app/steps/StepOctaves";
import StepNextEar from "../components/app/steps/StepNextEar";
import {
  FADE_DURATION,
  VisibilityAnimation
} from "../components/app/Animations";
import sleep from "../libs/sleep";
import TopNav from "../components/app/TopNav";
import Head from "next/head";
import User from "../libs/user";
import { Router, withTranslation } from "../i18n";
import { isPhone } from "../libs/utils";
import IconWave from "../public/static/images/icon-wave.svg";
import IconNoise from "../public/static/images/icon-noise.svg";
import IconVolume from "../public/static/images/icon-volume-down.svg";
import StepFrequencyIntro from "../components/app/steps/StepFrequencyIntro";
import StepAnalyzing from "../components/app/steps/StepAnalyzing";

const START_FREQ = 8000;
// Use this to skip steps during development
const FIRST_STEP = 0;

class Diagnostic extends Component {
  lastStepStartedAt = null;

  constructor(props) {
    super(props);
    const { t } = props;
    this.state = {
      frequency: START_FREQ,
      mainFrequency: START_FREQ,
      side: "right",
      step: FIRST_STEP,
      balance: 0,

      leftFrequency: null,
      rightFrequency: null,
      leftWaveType: "sine",
      rightWaveType: "sine",

      isVisible: false,
      isAnimating: false
    };

    this.StepNames = {
      0: t("Welcome"),
      2: t("Computer Volume"),
      3: t("Treatment Volume"),
      4: t("Tinnitus Side"),
      6: t("Rough Frequency"),
      8: t("Fine Frequency"),
      10: t("Octaves"),
      11: t("Other Side"),
      14: t("Start Treatment")
    };

    this.TonePlayer = require("../libs/tone").TonePlayer;
    User.init();
  }

  async componentDidMount() {
    // Run the iOS Mute switch fix.
    // TODO: Maybe just run it on the first button press
    const unmuteAudio = require("unmute-ios-audio");
    unmuteAudio();

    // Fade In on start
    this.setState({ isVisible: true, isAnimating: true });
    await sleep(FADE_DURATION);
    this.setState({ isAnimating: false });

    this.lastStepStartedAt = Date.now();

    // Handle back button
    Router.events.on("hashChangeStart", this.handleNavigation);
    if (FIRST_STEP === 0) Router.replace(`/diagnostic#step-0`);
  }

  componentWillUnmount() {
    // Unload back button listener
    Router.events.off("hashChangeStart", this.handleNavigation);
  }

  setFrequency = frequency => {
    if (this.state.side === "left") {
      this.setState({
        frequency: Math.round(frequency),
        leftFrequency: Math.round(frequency),
        mainFrequency: Math.round(frequency)
      });
    } else {
      this.setState({
        frequency: Math.round(frequency),
        rightFrequency: Math.round(frequency),
        mainFrequency: Math.round(frequency)
      });
    }
  };

  initPlayer = () => {
    // Start the Tone Player.
    // Should be done on user interaction (ie: first step)
    this.TonePlayer.init();
    this.TonePlayer.setFreq(START_FREQ);
    this.setBalanceForOppositeSide(this.state.side);
  };

  initWhiteNoise = () => {
    if (this.whiteNoiseAudio) return;

    this.whiteNoiseAudio = new (window.AudioContext ||
      window.webkitAudioContext)();
    this.whiteNoiseGain = this.whiteNoiseAudio.createGain();
    this.whiteNoiseGain.connect(this.whiteNoiseAudio.destination);
    this.whiteNoiseGain.gain.value = 0.1;

    var n = 4096;
    var scriptProcessor = this.whiteNoiseAudio.createScriptProcessor(n, 1, 1);

    scriptProcessor.onaudioprocess = function(e) {
      for (var t = e.outputBuffer.getChannelData(0), o = 0; n > o; o++) {
        t[o] = 2 * Math.random() - 1;
      }
    };

    scriptProcessor.connect(this.whiteNoiseGain);
  };

  stopWhiteNoise = () => {
    if (!this.whiteNoiseAudio) return;
    this.whiteNoiseAudio.close();
    delete this.whiteNoiseAudio;
  };

  handleNavigation = async newPath => {
    // For some reason I get two events in sequence here. Just drop one.
    if (!newPath) return;

    const oldStep = this.state.step;
    const nextStep = parseInt(newPath.replace(/[^0-9]/g, ""));

    if (isNaN(nextStep) || nextStep < 0 || nextStep > 14) return;
    if (oldStep === nextStep) return;

    // Animate the steps
    this.setState({ isAnimating: true, isVisible: false });

    await sleep(FADE_DURATION);

    this.setState({
      isVisible: true,
      isAnimating: false,
      step: nextStep
    });

    // Step 2 (Computer Volume) requires a white noise generator
    if (nextStep === 2) this.initWhiteNoise();
    else this.stopWhiteNoise();

    // Update the timer on how long this step has been shown
    let seconds = (Date.now() - this.lastStepStartedAt) / 1000;
    this.lastStepStartedAt = Date.now();

    // Track the old step so we can know exactly how long each step takes
    if (typeof this.StepNames[oldStep] === "string") {
      User.trackDiagnosticStep(this.StepNames[oldStep], seconds);
    }
  };

  nextStep = async (step, skipRouter = false) => {
    // Do this on any interaction to make sure the player stays on
    this.initPlayer();

    if (step === this.state.step) return;
    if (this.state.isAnimating) return;

    const oldStep = this.state.step;
    const nextStep = typeof step === "number" ? step : this.state.step + 1;

    // Change the url so we can deal with the back button gracefully
    Router.push(`/diagnostic#step-${nextStep}`, undefined, { shallow: true });
  };

  handleStartTreatment = userData => {
    const { mainFrequency, side } = this.state;

    // Save the user's frequency
    User.setFrequency(mainFrequency);

    // Save the diagnostic results
    User.addDiagnostic(mainFrequency);

    // Save the new user data
    User.saveUser({ ...User.getUser(), ...userData });

    // Send the email
    // TODO: Handle this with a loader or something
    if (
      userData &&
      userData.email &&
      typeof userData.email === "string" &&
      userData.email.includes("@")
    ) {
      fetch("/api/send-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: userData.email,
          frequency: mainFrequency,
          side: side
        })
      })
        .then(response => response.json())
        .then(data => {
          console.log("Success:", data);
        })
        .catch(error => {
          console.error("Error:", error);
        });
    }

    // Update the timer on how long this step has been shown
    let seconds = (Date.now() - this.lastStepStartedAt) / 1000;

    User.trackDiagnosticStep(this.StepNames[14], seconds);

    Router.push(`/treatment`);
  };

  confirmOtherEar = hasTinnitus => {
    const { mainFrequency } = this.state;
    const nextState = {};

    if (this.state.side === "left") {
      nextState.rightFrequency = hasTinnitus ? mainFrequency : null;
    } else {
      nextState.leftFrequency = hasTinnitus ? mainFrequency : null;
    }

    this.setState(nextState);
    this.nextStep();
  };

  changeBalance = balance => {
    this.setState({ balance });
    this.TonePlayer.setBalance(balance);
  };

  selectSide = side => {
    this.setBalanceForOppositeSide(side);
    this.setState({ side });
  };

  setBalanceForOppositeSide = side => {
    // Set the sound contralaterally
    if (side === "left") {
      this.changeBalance(+1);
    } else if (side === "right") {
      this.changeBalance(-1);
    } else {
      this.changeBalance(0);
    }
  };

  render() {
    const {
      step,
      frequency,
      mainFrequency,
      leftFrequency,
      rightFrequency,
      side,
      isVisible
    } = this.state;
    const { t } = this.props;

    return (
      <div className="Diagnostic">
        <Head>
          <title>{t(`DiagnosticTitle`)}</title>
        </Head>

        {step >= 0 && (
          <TopNav
            currentStep={step}
            stepNames={this.StepNames}
            onClickStep={step => {
              this.nextStep(step);
            }}
          />
        )}

        <VisibilityAnimation pose={isVisible ? "visible" : "hidden"}>
          <main>
            {step === 0 && <StepWelcome onFinish={() => this.nextStep()} />}

            {step === 1 && (
              <StepChatter
                onFinish={() => this.nextStep()}
                icon={<IconVolume />}
                title={
                  isPhone()
                    ? t(`PutHeadphonesOn`)
                    : t(`PutHeadphonesOnComputer`)
                }
                cta={t(`Done`)}
              />
            )}

            {step === 2 && (
              <StepChatter
                onFinish={this.nextStep}
                icon={<IconNoise />}
                title={
                  isPhone()
                    ? t(`RaiseVolumeNoise`)
                    : t(`RaiseVolumeNoiseComputer`)
                }
                cta={t(`Done`)}
              />
            )}

            {step === 3 && (
              <StepVolume
                onChangeVolume={() => {}}
                onFinish={volume => {
                  User.setVolume(volume);
                  this.TonePlayer.setVolume(volume);
                  this.nextStep();
                }}
              />
            )}

            {step === 4 && (
              <StepSide
                onGetSide={side => {
                  this.selectSide(side);
                  this.nextStep();
                }}
              />
            )}

            {step === 5 && (
              // The side is the side through which the tones will be delivered
              <StepFrequencyIntro
                onFinish={() => this.nextStep()}
                side={side === "left" ? "right" : "left"}
              />
            )}

            {step === 6 && (
              <StepRoughFrequency
                TonePlayer={this.TonePlayer}
                balance={this.state.balance}
                startFrequency={frequency}
                onGetFrequency={frequency => {
                  if (frequency === null) {
                    this.setFrequency(null);
                    this.nextStep(11);
                  } else {
                    this.setFrequency(frequency);
                    this.nextStep();
                  }
                }}
              />
            )}

            {step === 7 && (
              <StepChatter
                onFinish={() => this.nextStep()}
                icon={<IconWave />}
                title={t(`ExactFrequencyIntro`)}
                cta={t(`OK`)}
              />
            )}

            {step === 8 && (
              <StepFineFrequency
                TonePlayer={this.TonePlayer}
                balance={this.state.balance}
                startFrequency={frequency}
                onGetFrequency={frequency => {
                  this.setFrequency(frequency);
                  this.nextStep();
                }}
              />
            )}

            {step === 9 && (
              <StepChatter
                onFinish={() => this.nextStep()}
                icon={<IconWave />}
                title={t(`OctaveIntro`)}
                cta={t(`OK`)}
              />
            )}

            {step === 10 && (
              <StepOctaves
                TonePlayer={this.TonePlayer}
                startFrequency={frequency}
                onGetFrequency={frequency => {
                  this.setFrequency(frequency);
                  this.nextStep();
                }}
              />
            )}

            {step === 11 && (
              <StepNextEar
                firstSide={side}
                onYes={() => this.confirmOtherEar(true)}
                onNo={() => this.confirmOtherEar(false)}
              />
            )}

            {step === 12 && (
              <StepChatter
                onFinish={() => this.nextStep()}
                icon={<IconWave />}
                title={t(`ResultsIntro`)}
                cta={t(`GetResults`)}
              />
            )}

            {step === 13 && <StepAnalyzing onFinish={() => this.nextStep()} />}

            {step === 14 && (
              <StepSuccess
                onFinish={this.handleStartTreatment}
                hasTreatment={!!User.getLastDiagnostic()}
                mainFrequency={mainFrequency}
                leftFrequency={leftFrequency}
                rightFrequency={rightFrequency}
                userData={User.getUser()}
              />
            )}
          </main>
        </VisibilityAnimation>

        <style jsx>{`
          .Diagnostic {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100%;
            line-height: 1.6;
            text-align: center;
            z-index: 0;
            margin: 0 20px;
          }
          main {
            max-width: 900px;
            margin: 0 auto;
            padding: 120px 0;
          }
          @media (min-width: 768px) {
            .Diagnostic {
              margin: 0 30px;
            }
          }
          @media (min-width: 1024px) {
            .Diagnostic {
              margin: 0 50px;
            }
          }
        `}</style>
      </div>
    );
  }
}

Diagnostic.getInitialProps = () => {
  return { namespacesRequired: ["app"] };
};

const DiagnosticView = withTranslation("app")(Diagnostic);

export default DiagnosticView;
