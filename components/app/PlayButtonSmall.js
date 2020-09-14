import React, { Component } from "react";
import PropTypes from "prop-types";
import { ReactComponent as PlaySVG } from "../../public/static/images/play.svg";
import { ReactComponent as PauseSVG } from "../../public/static/images/pause.svg";
import { withTranslation } from "../../i18n";

class PlayButtonSmall extends Component {
  constructor(props) {
    super(props);
    this.state = { isPressed: false };
    // To prevent race conditions with touchstart/mouseedown we use this variable instead of setState
    this.isPressed = false;
    // This is so we can handle the min duration
    this.pressedAt = null;
    this.durationTimeout = null;
  }

  handlePress = isPressed => {
    // This is so we don't trigger things twice when using touchStart and mouseDown in Safari
    if (this.isPressed === isPressed) return;
    const minDuration = this.props.minDuration || 0;
    this.isPressed = isPressed;

    if (this.isPressed) {
      this.pressedAt = Date.now();
      clearTimeout(this.durationTimeout);

      if (this.props.onChange) this.props.onChange(isPressed);
      this.setState({ isPressed });
    } else {
      const currentDuration = Date.now() - this.pressedAt;

      const triggerStop = () => {
        this.pressedAt = null;
        if (this.props.onChange) this.props.onChange(false);
        this.setState({ isPressed: false });
      };

      if (currentDuration < minDuration) {
        // Unpress the button after the minimum time has happened
        const remainingDuration = minDuration - currentDuration;
        this.durationTimeout = setTimeout(triggerStop, remainingDuration);
      } else {
        triggerStop();
      }
    }
  };

  render() {
    const { t, isPlaying, size, isActive, onClick, label } = this.props;
    return (
      <button
        className={`PlayButton ${isActive ? "is-active" : ""} ${
          size ? `size-${size}` : ""
        }`}
        onClick={() => (onClick ? onClick() : null)}
        onMouseDown={() => this.handlePress(true)}
        onMouseUp={() => this.handlePress(false)}
        onTouchStart={() => this.handlePress(true)}
        onTouchEnd={() => this.handlePress(false)}
      >
        <span className="icon">
          {isPlaying ? (
            <PauseSVG className="pause" style={{ marginLeft: "-2px" }} />
          ) : (
            <PlaySVG className="play" />
          )}
        </span>
        <span className="label">{label ? label : t(`Play tone`)}</span>

        {/*language=SCSS*/}
        <style jsx>{`
          .PlayButton {
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
            outline: none;
            cursor: pointer;
          }

          .PlayButton :global(svg) {
            display: inline-block;
            height: 30px;
            width: 30px;
            fill: var(--primary);
          }

          .PlayButton :global(svg path) {
            fill: var(--primary);
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
            padding-right: 0;
          }
          .label {
            padding-left: 1.5em;
          }
          .icon :global(.play) {
            margin-right: -6px;
          }
          .PlayButton .label {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            color: var(--primary);
            // border-left: 3px solid var(--primary);
          }
          .PlayButton:active {
            outline: none;
            background: var(--primaryLight);
          }
          .PlayButton:active :global(svg .icon) {
            fill: #074dda;
          }
          .PlayButton:active .play .label {
            color: #074dda;
          }

          .PlayButton.is-active {
            transition: none;
            background: #0e87ff; /* fallback for old browsers */
            color: #fff;
          }

          .PlayButton.is-active :global(svg .icon) {
            fill: #fff;
          }

          .PlayButton.is-active :global(svg .line) {
            stroke: #fff;
          }
        `}</style>
      </button>
    );
  }
}

PlayButtonSmall.propTypes = {
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  isActive: PropTypes.bool,
  isPlaying: PropTypes.bool,
  minDuration: PropTypes.number,
  label: PropTypes.string
};

export default withTranslation("app")(PlayButtonSmall);
