import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTranslation } from "../../i18n";

class PlayButtonSquare extends Component {
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
    const { t } = this.props;
    return (
      <button
        className={`PlayButton ${this.props.isActive ? "is-active" : ""} ${
          this.props.size ? `size-${this.props.size}` : ""
        }`}
        onClick={() => (this.props.onClick ? this.props.onClick() : null)}
        onMouseDown={() => this.handlePress(true)}
        onMouseUp={() => this.handlePress(false)}
        onTouchStart={() => this.handlePress(true)}
        onTouchEnd={() => this.handlePress(false)}
      >
        <span className="text">{this.props.children}</span>

        {/*language=SCSS*/}
        <style jsx>{`
          .PlayButton {
            display: inline-block;
            box-sizing: border-box;
            font-family: var(--serif);
            font-size: 3em;
            line-height: 1;
            padding: 1em 0em;
            border-radius: 0;
            text-decoration: none;
            font-weight: normal;
            border: 7px solid white;
            color: black;
            background: white;
            transition: all 0.15s ease-out;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            cursor: pointer;
          }
          @media (min-width: 768px) {
            .PlayButton {
              font-size: 5em;
              padding: 0.7em 0em;
            }
          }

          .PlayButton :global(svg) {
            display: inline-block;
            margin: 6px 0 0 8px;
          }

          .PlayButton :global(svg .icon) {
            fill: #2f80ed;
          }

          .PlayButton :global(svg .line) {
            stroke: #2f80ed;
            stroke-width: 1px;
          }

          .PlayButton .play :global(svg) {
            width: 40px;
            height: 52px;
          }

          .PlayButton .text {
            font-weight: normal;
          }

          .PlayButton:focus {
            outline: none;
          }

          .PlayButton:active {
            outline: none;
            background: #fff;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          }
          .PlayButton:active :global(svg .icon) {
            fill: #074dda;
          }
          .PlayButton:active .play .label {
            color: #074dda;
          }

          .PlayButton.is-active {
            border-color: var(--primary);
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

PlayButtonSquare.propTypes = {
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  isActive: PropTypes.bool,
  isPlaying: PropTypes.bool,
  minDuration: PropTypes.number
};

export default withTranslation("app")(PlayButtonSquare);
