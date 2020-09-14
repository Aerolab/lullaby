import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Button } from "../Button";
import { withTranslation } from "../../../i18n";

function StepSuccess({
  mainFrequency,
  leftFrequency,
  rightFrequency,
  hasTreatment,
  onFinish,
  userData,
  t
}) {
  const [email, setEmail] = useState(
    userData && userData.email ? userData.email : ""
  );
  const handleOnChange = e => {
    setEmail(e.target.value);
  };

  return (
    <div className="StepSuccess">
      {mainFrequency === null ? (
        <div className="diagnosis">
          <h1>{t(`DiagnosisTitle`)}</h1>

          <div className="explanation">
            <p>{t(`NoSymptoms`)}</p>
          </div>
        </div>
      ) : (
        <div className="diagnosis">
          <h1>{t(`DiagnosisTitle`)}</h1>

          <h2>{Math.round(mainFrequency)} hz</h2>

          <p className="ears">
            {leftFrequency && rightFrequency
              ? t(`InBothEars`, {
                  mainFrequency
                })
              : leftFrequency
              ? t(`InLeftEar`, {
                  mainFrequency
                })
              : t(`InRightEar`, {
                  mainFrequency
                })}
          </p>

          <div className="email">
            <p>{t(`EmailPrompt`)}</p>
            <input
              type="email"
              onChange={handleOnChange}
              value={email}
              placeholder={t(`email@example.com`)}
            />
          </div>

          <div className="cta">
            <Button
              onClick={() =>
                onFinish({
                  email
                })
              }
            >
              {hasTreatment ? t(`SuccessContinue`) : t(`SuccessStart`)}
            </Button>
          </div>
        </div>
      )}

      {/*language=SCSS*/}
      <style jsx>{`
        .diagnosis {
          background: white;
          padding: 3em;
          max-width: 20em;
        }
        h1 {
          font-size: var(--titleSize);
          font-style: italic;
        }
        h2 {
          font-family: var(--serif);
          font-size: 72px;
          font-style: normal;
          color: var(--primary);
          margin: 0;
        }
        .cta {
          margin-top: 2em;
        }
        p.ears {
          margin: 0;
          font-family: var(--serif);
          font-size: 32px;
          font-style: italic;
        }
        input {
          background: white;
          border: 2px solid var(--textLight);
          border-radius: 6px;
          padding: 0.5em 1em;
          box-sizing: border-box;
          width: 90%;
          font-size: 1em;
          font-family: var(--sans);
        }
        input:focus {
          border-color: var(--primary);
          outline: none;
        }
      `}</style>
    </div>
  );
}

StepSuccess.propTypes = {
  onFinish: PropTypes.func,
  mainFrequency: PropTypes.number,
  leftFrequency: PropTypes.number,
  rightFrequency: PropTypes.number,
  hasTreatment: PropTypes.bool
};

export default withTranslation("app")(StepSuccess);
