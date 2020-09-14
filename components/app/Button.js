import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Link } from "../../i18n";

export function Button({
  href,
  size,
  disabled,
  secondary,
  important,
  target,
  onClick,
  children
}) {
  const handleClick = e => {
    if (disabled) return;
    if (onClick) onClick(e);
  };

  return (
    <>
      {href ? (
        <Link href={href}>
          <a
            target={target || null}
            className={`Button ${size ? `is-${size}` : ""} ${
              disabled ? `is-disabled` : ""
            } ${secondary ? `is-secondary` : ""} ${
              important ? `is-important` : ""
            }`}
            onClick={handleClick}
          >
            {children}
          </a>
        </Link>
      ) : (
        <button
          className={`Button ${size ? `is-${size}` : ""} ${
            disabled ? `is-disabled` : ""
          } ${secondary ? `is-secondary` : ""}
          ${important ? `is-important` : ""}`}
          onClick={handleClick}
        >
          {children}
        </button>
      )}

      {/*language=SCSS*/}
      <style jsx>{`
        .Button {
          display: inline-block;
          box-sizing: border-box;
          font-size: 1em;
          line-height: 1;
          padding: 1.1em 2.5em 1.2em 2.5em;
          border-radius: 4em;
          text-decoration: none;
          font-weight: bold;
          border: none;
          text-transform: uppercase;
          color: white;
          background: var(--primary);
          border: 3px solid var(--primary);
          transition: box-shadow 0.2s ease-out;
          font-family: var(--sans);
          cursor: pointer;
        }

        .Button.is-important {
          color: white;
          background: var(--secondary);
          border-color: var(--secondary);
        }

        .Button.is-secondary {
          color: #2f80ed;
          background: #f0f0f0;
        }

        .Button.is-small {
          font-size: 0.9em;
          padding: 0.9em 1.2em;
        }

        .Button.is-tiny {
          font-size: 0.7em;
          padding: 0.55em 1.2em;
        }

        .Button.is-disabled {
          color: #999;
          background: #ddd;
          border-color: #ddd;
          outline: none;
        }

        .Button:not(.is-secondary):not(.is-disabled):focus,
        .Button:not(.is-secondary):not(.is-disabled):hover,
        .Button:not(.is-disabled):focus,
        .Button:not(.is-disabled):hover {
          outline: none;
          color: #ffffff;
          box-shadow: 0 0px 0px 5px var(--primaryLight);
        }

        .Button.is-important:not(.is-disabled):focus,
        .Button.is-important:not(.is-disabled):hover {
          outline: none;
          box-shadow: 0 0px 0px 5px var(--secondaryLight);
        }

        .Button.is-secondary:not(.is-disabled):focus,
        .Button.is-secondary:not(.is-disabled):hover {
          outline: none;
          color: #7f00ff;
          background: #fff;
          box-shadow: 0 0px 0px 5px var(--secondaryLight);
        }
      `}</style>
    </>
  );
}

Button.defaultProps = {
  disabled: false,
  primary: false,
  secondary: false,
  important: false
};

Button.propTypes = {
  size: PropTypes.string,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  important: PropTypes.bool,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  target: PropTypes.string
};
