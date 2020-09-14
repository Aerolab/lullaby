import React, { Component, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
  FADE_DURATION,
  VisibilityAnimation
} from "../../components/app/Animations";
import sleep from "../../libs/sleep";
import TreatmentButton from "../../components/app/TreatmentButton";
import Head from "next/head";
import { Link } from "../../i18n";
import { TopNavTreatment } from "../../components/app/TopNavTreatment";
import User from "../../libs/user";
import Tinnitus from "../../libs/tinnitus";
import VolumeControl from "../../components/app/VolumeControl";
import VolumeTutorial from "../../components/app/VolumeTutorial";
import { withTranslation } from "../../i18n";
import { Router } from "../../i18n";
import { useRouter } from "next/router";
import TreatmentInput from "../../components/app/TreatmentInput";
import DayProgress from "../../components/app/DayProgress";

let tinnitusPlayer = null;
const NUM_DAYS_SHOW = 2;
const TARGET_SECONDS = 3 * 60 * 60;

function Treatment({ t }) {
  const DAY_NAMES = [
    t("Sun"),
    t("Mon"),
    t("Tue"),
    t("Wed"),
    t("Thu"),
    t("Fri"),
    t("Sat")
  ];

  const router = useRouter();

  const urlFrequency = !isNaN(parseInt(router.query.frequency))
    ? parseInt(router.query.frequency)
    : null;

  const [sessionStartedAt, setSessionStartedAt] = useState(null);
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [statsByDay, setStatsByDay] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [state, setState] = useState({
    isVisible: false,
    isAnimating: false,
    frequency: urlFrequency,
    doTutorial: false
  });
  const stateForCallbacks = useRef(state);

  useEffect(() => {
    stateForCallbacks.current = {
      isPlaying: !!isPlaying,
      sessionStartedAt: parseInt(sessionStartedAt)
    };
  }, [isPlaying, sessionStartedAt]);

  // Run a clock to update the timer
  useEffect(() => {
    // TODO: Do a proper server-side redirect
    if (
      urlFrequency &&
      (parseInt(router.query.frequency) < 0 ||
        parseInt(router.query.frequency) > 20000)
    ) {
      Router.replace("/treatment");
    }

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - NUM_DAYS_SHOW);
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + NUM_DAYS_SHOW);
    setStatsByDay(User.getSessionDurationsByDay(startDate, endDate));

    setSessionStartedAt(0);
    const timer = setInterval(() => setCurrentTime(Date.now()), 1000);

    setState({ ...state, frequency: urlFrequency || User.getFrequency() });

    return () => clearInterval(timer);
  }, []);

  const playToggle = () => {
    if (!tinnitusPlayer) {
      tinnitusPlayer = new Tinnitus(
        state.frequency || urlFrequency || User.getFrequency() || 0,
        Math.pow(1.2, User.getVolume() || 0.1) - 1.0
      );
    }

    if (!isPlaying) {
      // Play
      tinnitusPlayer.play();
      tinnitusPlayer.setVolume(Math.pow(1.2, User.getVolume() || 0.1) - 1.0);

      setSessionStartedAt(currentTime || Date.now());
      setIsPlaying(true);

      User.trackSessionStart(
        state.frequency || urlFrequency || User.getFrequency()
      );
    } else {
      // Stop
      tinnitusPlayer.stop();

      setIsPlaying(false);

      if (sessionStartedAt) {
        User.addSession(
          state.frequency || urlFrequency || User.getFrequency(),
          sessionStartedAt,
          Date.now()
        );
        User.trackSessionStop(Math.floor(Date.now() - sessionStartedAt) / 1000);
        setSessionStartedAt(0);
      }
    }
  };

  useEffect(() => {
    User.init();

    setState({ ...state, doTutorial: !User.getDidTutorial() });

    if (window) {
      // If the window is closed record the session anyway (same as unmount)
      window.addEventListener("beforeunload", handleUnmount);
    }

    doFadeIn();

    // Unmount
    return handleUnmount;
  }, []);

  const handleUnmount = () => {
    if (tinnitusPlayer) tinnitusPlayer.stop();
    const { isPlaying, sessionStartedAt } = stateForCallbacks.current;

    // Log the session before quitting
    if (isPlaying && sessionStartedAt && User.getFrequency()) {
      User.addSession(User.getFrequency(), sessionStartedAt, Date.now());
      User.trackSessionStop(
        User.getFrequency(),
        Math.floor(Date.now() - sessionStartedAt) / 1000
      );
    }

    if (window) {
      window.removeEventListener("beforeunload", handleUnmount);
    }
  };

  const resetFrequency = () => {
    User.setFrequency("");
    setState({ ...state, frequency: "" });
  };

  const handleSetFrequency = newFrequency => {
    User.setFrequency(newFrequency);
    setState({ ...state, frequency: newFrequency });
  };

  const onChangeVolume = volume => {
    User.setVolume(volume);

    if (tinnitusPlayer) {
      tinnitusPlayer.setVolume(Math.pow(1.2, volume) - 1.0);
    }
  };

  const startTutorial = e => {
    e.preventDefault();
    if (isPlaying) playToggle();
    setState({ ...state, doTutorial: true });
  };

  const endTutorial = volume => {
    User.setDidTutorial();
    User.setVolume(volume);
    setState({ ...state, doTutorial: false });
  };

  const doFadeIn = async () => {
    // Fade In on start
    setState({ ...state, isVisible: true, isAnimating: true });
    await sleep(FADE_DURATION);
    setState({ ...state, isVisible: true, isAnimating: false });
  };

  const { isVisible, doTutorial } = state;
  const frequency = urlFrequency || User.getFrequency();
  const userVolume = User.getVolume() || 0.1;
  const timeElapsed =
    (sessionStartedAt
      ? Math.floor((currentTime - sessionStartedAt) / 1000)
      : 0) + User.getTodayDuration();

  return (
    <div className="Treatment">
      <Head>
        <title>
          {frequency
            ? t(`TreatmentTitle`).replace(`{frequency}`, frequency)
            : t(`TreatmentTitleSimple`)}
        </title>
      </Head>

      <TopNavTreatment
        title={
          frequency
            ? t(`TreatmentHeader`).replace(`{frequency}`, frequency)
            : "TreatmentHeaderEmpty"
        }
        showUserFrequency={
          frequency != User.getFrequency() ? User.getFrequency() : false
        }
        showDiagnosticReminder={
          !!User.getFrequency() && User.hasOldDiagnostic() === true
        }
        buttonText={t(`ReadInstructions`)}
        buttonHref={`/instructions`}
      />

      <VisibilityAnimation pose={isVisible ? "visible" : "hidden"}>
        {!frequency ? (
          <TreatmentInput onSubmit={handleSetFrequency} />
        ) : doTutorial ? (
          <VolumeTutorial onFinish={endTutorial} />
        ) : (
          <div className="playerHolder">
            <div className="stats">
              {!!statsByDay &&
                statsByDay.map(d => (
                  <DayProgress
                    key={`day-${d.day}`}
                    dayName={t(DAY_NAMES[d.day])}
                    progress={d.duration / TARGET_SECONDS}
                    highlight={d.day == new Date().getDay()}
                  />
                ))}
            </div>

            <div className="player">
              <div className="play">
                <TreatmentButton
                  onClick={playToggle}
                  isPlaying={isPlaying}
                  currentDuration={timeElapsed}
                  targetDuration={TARGET_SECONDS}
                />
              </div>
            </div>
            <div className="volume">
              <VolumeControl
                min={0.001}
                defaultValue={userVolume || 0.001}
                max={1.0}
                step={0.001}
                onChange={onChangeVolume}
              />
            </div>
            <div className="diagnostic">
              <div>
                {t(`ForgotVolume`)}{" "}
                <a onClick={startTutorial}>{t(`DoTutorial`)}</a>
              </div>
              <div>
                {t(`ForgotFrequency`)}{" "}
                <Link href="/diagnostic">
                  <a>{t(`DoDiagnostic`)}</a>
                </Link>
                {!urlFrequency && (
                  <>
                    {" "}
                    {t(`or`)}{" "}
                    <a onClick={resetFrequency}>{t(`SetFrequency`)}</a>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </VisibilityAnimation>

      {/*language=SCSS*/}
      <style jsx>{`
        .Treatment {
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100%;
          padding: 170px 20px 100px 20px;
          text-align: center;
          z-index: 0;
        }
        .Treatment :global(> div) {
          // This is the animation holder
          width: 100%;
        }
        @media (max-width: 768px) {
          :global(.Treatment) {
            padding-top: 180px;
          }
        }
        .stats {
          max-width: 30em;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
          grid-gap: 1px;
          margin-bottom: 30px;
        }
        .diagnostic {
          font-size: 14px;
          color: var(--textLight);
          margin-top: 4em;
        }
        .diagnostic a {
          text-decoration: underline;
          cursor: pointer;
          color: var(--textLight);
        }
        .diagnostic > div {
          margin-bottom: 0.5em;
        }
        .playerHolder {
          max-width: 600px;
          margin: 0 auto;
        }
        .player {
          padding: 3em 0;
        }
        @media (max-width: 480px) {
          .player {
            grid-template-columns: 1fr;
          }
          .player .timer {
            text-align: center;
          }
        }
        .timer .intro {
          font-size: 16px;
          color: #b7b5db;
        }
        .timer .timeLeft {
          font-size: 30px;
          font-weight: bold;
          line-height: 1.1;
          color: #0e87ff;
        }
        .volume {
          max-width: 550px;
          margin: 0 auto;
          margin-top: 30px;
        }

        @media (max-height: 700px) {
          .stats {
            font-size: 14px;
          }
          .player {
            padding: 0.5em 0;
          }
          .diagnostic {
            margin-top: 2em;
          }
        }
      `}</style>
    </div>
  );
}

Treatment.propTypes = {
  match: PropTypes.object
};

Treatment.getInitialProps = () => {
  return { namespacesRequired: ["app"] };
};

const TreatmentView = withTranslation("app")(Treatment);

export default TreatmentView;
