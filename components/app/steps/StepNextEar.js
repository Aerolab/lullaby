import PropTypes from "prop-types";
import * as React from "react";
import SquareButton from "../SquareButton";
import { withTranslation } from "../../../i18n";

class StepNextEar extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <div className="StepNextEar">
        <h1>
          {t(
            this.props.firstSide === "left"
              ? "BothEarsPromptRight"
              : "BothEarsPromptLeft"
          )}
        </h1>

        <div className="cta">
          <SquareButton small onClick={this.props.onYes}>
            {t(`PickBothEars`)}
          </SquareButton>

          <SquareButton small onClick={this.props.onNo}>
            {this.props.firstSide === "left"
              ? t(`PickLeftEar`)
              : t(`PickRightEar`)}
          </SquareButton>
        </div>

        {/*language=SCSS*/}
        <style jsx>{`
          h1 {
            font-size: var(--titleSize);
            font-style: italic;
          }
          .cta {
            display: grid;
            grid-template-columns: 1fr;
            grid-gap: 1em;
            margin-top: 2em;
          }
          @media (min-width: 768px) {
            .cta {
              grid-template-columns: 1fr 1fr;
            }
          }
        `}</style>
      </div>
    );
  }
}

StepNextEar.propTypes = {
  firstSide: PropTypes.string.isRequired,
  onYes: PropTypes.func.isRequired,
  onNo: PropTypes.func.isRequired
};

export default withTranslation("app")(StepNextEar);
