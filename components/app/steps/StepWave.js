import PropTypes from "prop-types";
import * as React from "react";
import PlayButton from "../components/PlayButton";
import { Button } from "../components/Button";
import { ReactComponent as TriangleSVG } from "../images/triangle.svg";
import { ReactComponent as SawtoothSVG } from "../images/sawtooth.svg";
import { ReactComponent as SquareSVG } from "../images/square.svg";
import { ReactComponent as SineSVG } from "../images/sine.svg";

export default class StepWave extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      waveType: "sine"
    };
  }

  playToggle = (on, waveType) => {
    const { TonePlayer } = this.props;
    this.setState({ waveType });
    TonePlayer.setWaveType(waveType);
    on ? TonePlayer.play() : TonePlayer.stop();
  };

  render() {
    const { onGetWave } = this.props;
    const { waveType } = this.state;

    return (
      <div>
        <h1>¿Cuál de estos sonidos se parece más al pitido que escuchás?</h1>

        <div className="waves">
          <PlayButton
            onChange={on => this.playToggle(on, "sine")}
            isActive={waveType === "sine"}
          >
            <SineSVG width="90px" height="50px" />
          </PlayButton>{" "}
          <PlayButton
            onChange={on => this.playToggle(on, "square")}
            isActive={waveType === "square"}
          >
            <SquareSVG width="90px" height="50px" />
          </PlayButton>{" "}
          <PlayButton
            onChange={on => this.playToggle(on, "triangle")}
            isActive={waveType === "triangle"}
          >
            <TriangleSVG width="90px" height="50px" />
          </PlayButton>{" "}
          <PlayButton
            onChange={on => this.playToggle(on, "sawtooth")}
            isActive={waveType === "sawtooth"}
          >
            <SawtoothSVG width="90px" height="50px" />
          </PlayButton>
        </div>

        <div className="cta">
          <Button onClick={() => onGetWave(waveType)}>Listo, continuar</Button>
        </div>

        {/*language=SCSS*/}
        <style jsx>{`
          .waves {
            display: grid;
            grid-gap: 1em;
            grid-template-columns: auto auto auto auto;
            align-items: center;
            justify-items: center;
          }
          .cta {
            margin-top: 2em;
          }
        `}</style>
      </div>
    );
  }
}

StepWave.propTypes = {
  /** The Tone Player */
  TonePlayer: PropTypes.object.isRequired,
  /** Receives the wave type adjusted by octave */
  onGetWave: PropTypes.func.isRequired
};
