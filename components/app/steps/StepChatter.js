import PropTypes from "prop-types";
import * as React from "react";
import { Button } from "../Button";

const CHATTER_DURATION = 4000;

export default function StepChatter({
  title,
  description,
  cta,
  icon,
  onFinish
}) {
  return (
    <div className="StepChatter">
      <div className="icon">{icon}</div>

      {!!title && <h1>{title}</h1>}
      {!!description && <p>{description}</p>}

      <div className="cta">
        <Button onClick={onFinish}>{cta}</Button>
      </div>

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
      `}</style>
    </div>
  );
}

StepChatter.defaultProps = {
  duration: CHATTER_DURATION
};

StepChatter.propTypes = {
  duration: PropTypes.number,
  onFinish: PropTypes.func,
  cta: PropTypes.string
};
