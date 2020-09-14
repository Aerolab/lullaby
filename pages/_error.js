import PropTypes from "prop-types";
import { withTranslation } from "../i18n";
import Button from "../components/site/Button";

function Error({ t }) {
  return (
    <div className="Error">
      <div className="ErrorCopy">
        <h1>{t(`ErrorTitle`)}</h1>
        <p>{t(`ErrorDescription`)}</p>
        <div className="actions">
          <Button href="/">{t(`ErrorBackHome`)}</Button>
        </div>
      </div>

      <style jsx>{`
        .Error {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          height: 100%;
          margin: 0 2em;
        }
        .ErrorCopy {
          width: 100%;
          max-width: 800px;
        }
        h1 {
          font-size: var(--titleSize);
          font-style: italic;
          margin: 0;
        }
        .actions {
          margin-top: 2em;
        }
      `}</style>
    </div>
  );
}

Error.propTypes = {
  t: PropTypes.func
};

const ErrorView = withTranslation("app")(Error);

export default ErrorView;
