import { useState, useRef } from "react";
import { Button } from "./Button";
import { withTranslation } from "../../i18n";
import { Link } from "../../i18n";

const TreatmentInput = ({ t, onSubmit }) => {
  const freqRef = useRef();
  const [inputFrequency, setInputFrequency] = useState("");

  const handleFrequencyInput = e => {
    // Limit to 5 chars
    e.preventDefault();
    const newInputFrequency = `${e.target.value}`
      .replace(/[^0-9]/g, "")
      .replace(".", "")
      .replace(/^0+/, "")
      .slice(0, 5);
    setInputFrequency(newInputFrequency);
  };

  const handleFrequencyPress = e => {
    var key = event.charCode ? event.charCode : event.keyCode;
    if (key < 48 || key > 57) {
      e.preventDefault();
      return false;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (inputFrequency && inputFrequency.match(/[0-9]{3,5}/)) {
      // Save the frequency locally
      onSubmit(inputFrequency);
    }
  };

  return (
    <div className="TreatmentInput">
      <h1>{t(`What's your tinnitus frequency?`)}</h1>
      <form onSubmit={handleSubmit}>
        <span className="frequency-input">
          <input
            type="number"
            min={100}
            max={20000}
            maxLength={5}
            step={1}
            value={`${inputFrequency}` || ""}
            placeholder={8000}
            ref={freqRef}
            onChange={handleFrequencyInput}
            onKeyPress={handleFrequencyPress}
          />{" "}
          <span className="unit">hz</span>
        </span>
        <div className="start">
          <Button
            onClick={handleSubmit}
            disabled={!(inputFrequency && inputFrequency.match(/[0-9]{3,5}/))}
          >
            {t(`Get Started`)}
          </Button>
        </div>
      </form>
      <div className="diagnostic">
        <div>
          {t(`Don't know your frequency?`)}{" "}
          <Link href="/diagnostic">
            <a>{t(`Get Diagnosed`)}</a>
          </Link>
        </div>
      </div>

      <style jsx>{`
        h1 {
          font-size: var(--titleSize);
          font-style: italic;
        }
        form {
          display: block;
          text-align: center;
          margin: 0;
        }
        .frequency-input {
          position: relative;
          display: inline-block;
          margin: 1em 0 2em 0;
        }
        .frequency-input input {
          font-family: var(--serif);
          font-weight: normal;
          margin: 0;
          padding: 0.17em 0;
          padding-right: 40px;
          width: 3.5em;
          font-size: 2em;
          border-radius: 3px;
          background: none;
          border: none;
          border-radius: 0;
          border-bottom: 3px solid var(--text);
        }
        .frequency-input input:focus {
          outline: none;
          border-color: var(--primary);
        }
        .frequency-input .unit {
          display: block;
          padding: 0;
          position: absolute;
          top: 0;
          right: 0;
          font-family: var(--serif);
          font-style: italic;
          font-size: 2em;
        }
        .diagnostic {
          font-size: 14px;
          color: var(--textLight);
          margin-top: 4em;
        }
        .diagnostic a {
          text-decoration: underline;
          cursor: pointer;
          color: var(--textLight);
        }
        .start {
        }
      `}</style>
    </div>
  );
};

export default withTranslation("app")(TreatmentInput);
