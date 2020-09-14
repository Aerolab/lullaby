import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Button } from "../Button";
import { VisibilityAnimationSlow } from "../Animations";
import { withTranslation } from "../../../i18n";
import { Link } from "../../../i18n";

function StepWelcome({ t, onFinish }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <VisibilityAnimationSlow pose={isVisible ? "visible" : "hidden"}>
      <div className="StepWelcome">
        <h1>{t(`WelcomeTitle`)}</h1>

        <h2>{t(`WelcomeDuration`)}</h2>

        <div className="note">
          <h3>{t(`WelcomeImportant`)}</h3>
          {t(`WelcomeHeadphones`)}
        </div>

        <div className="disclaimer">
          <p>{t(`WelcomeDisclaimer`)}</p>
        </div>

        <div className="cta">
          <Button onClick={onFinish}>{t(`WelcomeStart`)}</Button>
        </div>

        {/*language=SCSS*/}
        <style jsx>{`
          h1 {
            font-size: var(--titleSize);
            font-style: italic;
          }
          h2 {
            font-size: var(--largeTitleSize);
          }
          h3 {
            color: var(--primary);
            text-transform: uppercase;
            font-weight: bold;
            font-family: var(--sans);
            margin: 0;
            margin-bottom: 0.5em;
          }
          .note {
            margin: 2em auto;
            border-left: 7px solid var(--secondary);
            padding: 1em 1.2em;
            max-width: 30em;
            background: white;
            text-align: left;
          }
          .disclaimer {
            margin: 1em auto;
            max-width: 30em;
            text-align: center;
            font-style: italic;
            font-family: var(--serif);
          }
          @media (min-width: 768px) {
            .note {
              padding: 1.5em 2em 2em 2em;
            }
          }
          .cta {
            margin-top: 2em;
          }
          a {
            color: white;
            text-decoration: underline;
          }
        `}</style>
      </div>
    </VisibilityAnimationSlow>
  );
}

StepWelcome.propTypes = {
  onFinish: PropTypes.func.isRequired
};

export default withTranslation("app")(StepWelcome);
