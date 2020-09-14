import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export class StepBar extends PureComponent {
  onClickStep = (event, step) => {
    event.preventDefault();
    if (this.props.currentStep > step) {
      this.props.onClickStep(step);
    }
  };

  render() {
    const { currentStep, stepNames } = this.props;
    return (
      <div className="StepBar">
        {Object.keys(stepNames).map((s, _) => {
          const step = parseInt(s);
          return (
            <a
              key={`stepbar-step-${step}`}
              onClick={e => this.onClickStep(e, step)}
              className={`step ${
                currentStep === step ||
                (currentStep + 1 === step &&
                  stepNames[currentStep + 1] &&
                  !stepNames[currentStep])
                  ? "is-active"
                  : currentStep > step
                  ? "is-done"
                  : ""
              }`}
              title={stepNames[step]}
              href={`#step-${step}`}
            >
              <span>Step {step}</span>
            </a>
          );
        })}

        {/*language=SCSS*/}
        <style jsx>{`
          .StepBar {
            display: block;
            text-align: center;
            padding: 8px 0;
          }
          .step {
            display: inline-block;
            width: 8px;
            height: 8px;
            overflow: hidden;
            background: rgba(0, 0, 0, 0.1);
            border: 4px solid rgba(0, 0, 0, 0);
            border-radius: 8px;
            margin: 0 4px;
            transition: all 0.3s ease-in-out;
            cursor: default;
          }

          .step.is-active {
            background: #2f80ed;
            border-color: white;
          }
          .step.is-done {
            background: #2f80ed;
            border-color: #2f80ed;
            cursor: pointer;
          }
          .step > span {
            position: absolute;
            text-indent: -9999;
            overflow: hidden;
            width: 1px;
            height: 1px;
          }
        `}</style>
      </div>
    );
  }
}

StepBar.propTypes = {
  currentStep: PropTypes.number.isRequired,
  stepNames: PropTypes.object.isRequired
};
