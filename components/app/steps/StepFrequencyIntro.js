import PropTypes from "prop-types";
import * as React from "react";
import { Button } from "../Button";
import { withTranslation } from "../../../i18n";
import SideIllustration from "../../../public/static/images/side-wave.svg";

function StepFrequencyIntro({ t, side, onFinish }) {
  return (
    <div className="StepFrequencyIntro">
      <h1>{t(`FindFrequencyIntro`)}</h1>
      <h2>
        {side === "left"
          ? t(`FindFrequencyLeftEar`)
          : t(`FindFrequencyRightEar`)}
      </h2>

      <div className="cta">
        <Button onClick={onFinish}>{t(`Continue`)}</Button>
      </div>

      {side === "right" ? (
        <div className="illustration right">
          <SideIllustration />
        </div>
      ) : (
        <div className="illustration left">
          <SideIllustration />
        </div>
      )}

      {/*language=SCSS*/}
      <style jsx>{`
        h1,
        h2 {
          font-size: var(--titleSize);
          font-style: normal;
        }
        h2 {
          margin-top: 1em;
          font-style: italic;
        }
        .cta {
          margin-top: 2em;
        }
        .illustration {
          position: absolute;
          top: 1em;
          bottom: 1em;
          z-index: -1;
          width: 70%;
          display: flex;
          align-items: center;
          overflow: hidden;
          pointer-events: none;
        }
        .illustration.right {
          right: 0;
          justify-content: flex-end;
          border-right: 6px solid var(--secondary);
        }
        .illustration.left {
          left: 0;
          justify-content: flex-start;
          border-left: 6px solid var(--secondary);
        }
        .illustration :global(svg) {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 200%;
          height: 100%;
        }
        .illustration.left :global(svg) {
          left: -100%;
        }
        .illustration.right :global(svg) {
          right: -100%;
        }
        .illustration :global(svg .circle-1),
        .illustration :global(svg .circle-2),
        .illustration :global(svg .circle-3) {
          opacity: 0;
          animation: WaveAnimation;
          animation-duration: 400ms;
          animation-timing-function: ease-out;
          animation-fill-mode: forwards;
          transform-origin: 50% 50%;
        }
        .illustration :global(svg .circle-1) {
          animation-delay: 500ms;
        }
        .illustration :global(svg .circle-2) {
          animation-delay: 800ms;
        }
        .illustration :global(svg .circle-3) {
          animation-delay: 1200ms;
        }
        @keyframes WaveAnimation {
          from {
            opacity: 0;
            transform: scale(0.7);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}

StepFrequencyIntro.propTypes = {
  side: PropTypes.string.isRequired,
  onFinish: PropTypes.func.isRequired
};

export default withTranslation("app")(StepFrequencyIntro);
