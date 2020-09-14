import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Link } from "../../i18n";

export default function SquareButton({
  href,
  size,
  disabled,
  secondary,
  target,
  small,
  onClick,
  children,
  highlightLeft,
  highlightRight
}) {
  const handleClick = e => {
    if (disabled) return;
    if (onClick) onClick(e);
  };

  return (
    <>
      {href ? (
        <Link
          href={href}
          onClick={handleClick}
          target={target || null}
          className={`SquareButton ${size ? `is-${size}` : ""} ${
            disabled ? `is-disabled` : ""
          } ${secondary ? `is-secondary` : ""}
          ${highlightLeft ? `highlight-left` : ""}
          ${highlightRight ? `highlight-right` : ""}
          ${small ? `is-small` : ""}`}
        >
          {children}
        </Link>
      ) : (
        <button
          className={`SquareButton ${size ? `is-${size}` : ""} ${
            disabled ? `is-disabled` : ""
          } ${secondary ? `is-secondary` : ""}
          ${highlightLeft ? `highlight-left` : ""}
          ${highlightRight ? `highlight-right` : ""}
          ${small ? `is-small` : ""}`}
          onClick={handleClick}
        >
          {children}
        </button>
      )}

      {/*language=SCSS*/}
      <style jsx>{`
        .SquareButton {
          display: inline-block;
          box-sizing: border-box;
          font-family: var(--serif);
          font-size: 2em;
          line-height: 1;
          padding: 1.5em 0.5em;
          border-radius: 0;
          text-decoration: none;
          font-weight: normal;
          border: none;
          color: black;
          background: white;
          transition: all 0.15s ease-out;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          cursor: pointer;
        }
        @media (min-width: 768px) {
          .SquareButton {
            font-size: 3em;
          }
        }

        .SquareButton.highlight-left {
          border-left: 7px solid var(--secondary);
        }
        .SquareButton.highlight-right {
          border-right: 7px solid var(--secondary);
        }

        .SquareButton.is-secondary {
          color: #2f80ed;
          background: #f0f0f0;
        }

        .SquareButton.is-small {
          font-size: 1.2em;
          padding: 1.5em 0.5em;
          font-style: italic;
        }

        @media (min-width: 768px) {
          .SquareButton.is-small {
            font-size: 1.5em;
            padding: 2.5em 0.5em;
          }
        }

        .SquareButton.is-tiny {
          font-size: 0.7em;
          padding: 0.55em 1.2em;
        }

        .SquareButton.is-disabled {
          color: #999;
          background: #ddd;
          border-color: #ddd;
        }

        .SquareButton:not(.is-secondary):not(.is-disabled):focus,
        .SquareButton:not(.is-secondary):not(.is-disabled):hover,
        .SquareButton:not(.is-disabled):focus,
        .SquareButton:not(.is-disabled):hover {
          outline: none;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .SquareButton.is-secondary:not(.is-disabled):focus,
        .SquareButton.is-secondary:not(.is-disabled):hover {
          outline: none;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </>
  );
}

SquareButton.defaultProps = {
  disabled: false,
  highlightLeft: false,
  highlightRight: false
};

SquareButton.propTypes = {
  size: PropTypes.string,
  primary: PropTypes.bool,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  target: PropTypes.string,
  highlightLeft: PropTypes.bool,
  highlightRight: PropTypes.bool
};
