import React, { Component } from "react";
import PropTypes from "prop-types";
import { ReactComponent as PlaySVG } from "../../public/static/images/play.svg";
import { ReactComponent as PauseSVG } from "../../public/static/images/pause.svg";
import { withTranslation } from "../../i18n";

class PlayButton extends Component {
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
        {this.props.children ? (
          <span className="text">{this.props.children}</span>
        ) : (
          <span className="play">
            {typeof this.props.isPlaying === "boolean" ? (
              this.props.isPlaying ? (
                <PauseSVG style={{ marginLeft: "-2px" }} />
              ) : (
                <PlaySVG />
              )
            ) : (
              <span className="label">
                <PlaySVG />
                <span>{t(`Play tone`)}</span>
              </span>
            )}
          </span>
        )}

        {/*language=SCSS*/}
        <style jsx>{`
          .PlayButton {
            color: #2f2e41;
            font-size: 1em;
            font-weight: bold;
            border: none;
            border-radius: 4em;
            min-width: 8em;
            height: 8em;
            width: auto;
            padding: 0 2em;
            text-align: center;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
            background: #f0f0f0;
            transition: all 0.1s ease-out;
            box-sizing: border-box;
            user-select: none;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            cursor: pointer;
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

          .PlayButton .play .label {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            color: #2f80ed;
          }
          .PlayButton .play .label > span {
            font-size: 0.9em;
            margin-left: 1em;
          }

          .PlayButton .text {
            font-size: var(--titleSize);
            font-weight: normal;
          }

          .PlayButton.size-medium {
            min-width: 5em;
            height: 5em;
          }
          .PlayButton.size-medium .text {
            font-size: 32px;
            font-weight: bold;
          }

          .PlayButton.size-small {
            min-width: 4em;
            height: 4em;
          }
          .PlayButton.size-small :global(.play svg) {
            width: 22px;
            height: 28px;
            margin: 3px 0 0 4px;
          }

          .PlayButton.size-tiny {
            min-width: 3em;
            height: 3em;
            padding: 0 1.5em;
          }
          .PlayButton.size-tiny :global(.play svg) {
            width: 18px;
            height: 24px;
            margin: 3px 0 0 4px;
          }

          .PlayButton .icon {
            fill: #2f80ed;
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

PlayButton.propTypes = {
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  isActive: PropTypes.bool,
  isPlaying: PropTypes.bool,
  minDuration: PropTypes.number
};

export default withTranslation("app")(PlayButton);
