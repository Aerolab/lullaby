import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Button } from "../Button";
import VolumeControl from "../VolumeControl";
import { withTranslation } from "../../../i18n";

let audioContext = null;
let audioGain = null;
let scriptProcessor = null;

function StepVolume({ t, onFinish }) {
  const [volume, setVolume] = useState(0.001);
  const [didAdjustVolume, setDidAdjustVolume] = useState(false);

  useEffect(() => {
    startAudioContext();
    return removeAudioContext;
  }, []);

  const removeAudioContext = () => {
    if (!audioContext) return;
    try {
      audioContext.close();
      audioContext = null;
    } catch (e) {}
  };

  const startAudioContext = () => {
    if (audioContext) return;

    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    audioGain = audioContext.createGain();
    // Set a default gain value
    audioGain.gain.value = Math.pow(1.2, volume) - 1.0;
    audioGain.connect(audioContext.destination);

    var n = 4096;
    scriptProcessor = audioContext.createScriptProcessor(n, 1, 1);

    scriptProcessor.onaudioprocess = function(e) {
      for (var t = e.outputBuffer.getChannelData(0), o = 0; n > o; o++) {
        t[o] = 2 * Math.random() - 1;
      }
    };

    scriptProcessor.connect(audioGain);
  };

  const onDragStart = () => {
    // We need to start the audiocontext on a user event (touchstart/click).
    // onChange breaks in iOS.
    startAudioContext();
  };

  const onChangeVolume = newVolume => {
    startAudioContext();
    audioGain.gain.value = Math.pow(1.2, newVolume) - 1.0;
    setVolume(newVolume);
    setDidAdjustVolume(true);
  };

  const handleOnFinish = () => {
    removeAudioContext();
    onFinish(audioGain ? audioGain.gain.value : 0.1);
  };

  return (
    <div className="StepVolume">
      <h1>{t(`AdjustVolume`)}</h1>

      <div className="control">
        <VolumeControl
          min={0.001}
          defaultValue={0.001}
          max={1.0}
          step={0.001}
          onDragStart={onDragStart}
          onChange={onChangeVolume}
        />
      </div>

      <div className="cta">
        <Button disabled={!didAdjustVolume} onClick={handleOnFinish}>
          {t(`Done`)}
        </Button>
      </div>

      {/*language=SCSS*/}
      <style jsx>{`
        h1 {
          font-size: var(--titleSize);
          font-style: italic;
        }
        .cta {
          margin-top: 2em;
        }
        .control {
          margin: 2em 0;
        }
      `}</style>
    </div>
  );
}

StepVolume.propTypes = {
  onChangeVolume: PropTypes.func,
  onFinish: PropTypes.func
};

export default withTranslation("app")(StepVolume);
