import PropTypes from "prop-types";
import { useEffect } from "react";
import { withTranslation } from "../../../i18n";
import IconWave from "../../../public/static/images/icon-wave.svg";

const CHATTER_DURATION = 4000;

function StepAnalyzing({ icon, onFinish, t }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onFinish();
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="StepAnalyzing">
      <div className="icon">
        <IconWave />
      </div>

      <h1>
        {t(`Analyzing`)}
        <div className="dots">
          <div className="dot">.</div>
          <div className="dot">.</div>
          <div className="dot">.</div>
        </div>
      </h1>

      {/*language=SCSS*/}
      <style jsx>{`
        h1 {
          font-size: var(--titleSize);
          font-style: italic;
        }
        .icon {
          height: 50px;
          margin-bottom: 2em;
        }
        .icon :global(svg) {
          height: 50px;
          width: auto;
        }
        .cta {
          margin-top: 2em;
        }
        .dots {
          display: inline-block;
        }
        .dot {
          display: inline-block;
          animation: FadeIn 0.4s ease-out;
          animation-fill-mode: forwards;
          opacity: 0;
        }
        .dot:nth-child(1) {
          animation-delay: 0.5s;
        }
        .dot:nth-child(2) {
          animation-delay: 1.3s;
        }
        .dot:nth-child(3) {
          animation-delay: 2.1s;
        }

        @keyframes FadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

StepAnalyzing.defaultProps = {
  duration: CHATTER_DURATION
};

StepAnalyzing.propTypes = {
  duration: PropTypes.number,
  onFinish: PropTypes.func,
  cta: PropTypes.string
};

export default withTranslation("app")(StepAnalyzing);
