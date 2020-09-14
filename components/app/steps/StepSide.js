import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import SquareButton from "../SquareButton";
import sleep from "../../../libs/sleep";
import { FADE_DURATION, VisibilityAnimation } from "../Animations";
import { withTranslation } from "../../../i18n";

function StepSide({ t, onGetSide }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleGetSide = async side => {
    setIsVisible(false);
    await sleep(FADE_DURATION);
    onGetSide(side);
  };

  return (
    <VisibilityAnimation pose={isVisible ? "visible" : "hidden"}>
      <div className="StepSide">
        <h1>{t(`WhichSideLouder`)}</h1>

        <div className="side">
          <SquareButton onClick={() => handleGetSide("left")} highlightLeft>
            {t(`Left`)}
          </SquareButton>
          <SquareButton onClick={() => handleGetSide("right")} highlightRight>
            {t(`Right`)}
          </SquareButton>
        </div>

        <div>
          <a
            className="default"
            onClick={e => {
              e.preventDefault();
              handleGetSide("left");
            }}
          >
            {t(`BothSimilar`)}
          </a>
        </div>

        {/*language=SCSS*/}
        <style jsx>{`
          h1 {
            font-size: var(--titleSize);
            font-style: italic;
          }
          .default {
            font-family: var(--serif);
            font-style: italic;
            font-weight: normal;
            text-decoration: underline;
            cursor: pointer;
            font-size: 1.2em;
          }
          .side {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 2em;
            margin-top: 2em;
            max-width: 700px;
            margin: 2em auto;
          }
        `}</style>
      </div>
    </VisibilityAnimation>
  );
}

StepSide.propTypes = {
  onGetSide: PropTypes.func.isRequired
};

export default withTranslation("app")(StepSide);
