import React from "react";
import Container from "./Container";
import { withTranslation, Trans } from "../../i18n";

function Results({ t }) {
  return (
    <div className={`Results`}>
      <Container>
        <div className="pretitle">{t(`resultsTitle`)}</div>

        <h1>
          <Trans
            t={t}
            i18nKey="resultsQuote"
            components={{ strong: <strong />, em: <em /> }}
          />
        </h1>

        <div className="intro">
          <p>{t(`resultsIntro`)}</p>
        </div>

        <div className="info">
          <div className="copy">
            <h3>{t(`resultsWwnTitle`)}</h3>
            <p>{t(`resultsWwnInfo`)}</p>

            <h3>{t(`resultsCbtTitle`)}</h3>
            <p>{t(`resultsCbtInfo`)}</p>
          </div>

          <div className="chart">
            <div className="precaption">{t(`resultsPreCaption`)}</div>
            <figure>
              <img src="/static/home/chart.svg" alt="" />
              <figcaption>{t(`resultsCaption`)}</figcaption>
            </figure>
          </div>
        </div>
      </Container>

      {/* language=SCSS */}
      <style jsx>{`
        h1 {
          font-size: 1.9em;
          text-align: center;
        }
        h1 strong,
        h1 em {
          color: var(--primary);
        }
        h1 em,
        h1 strong {
          font-weight: normal;
          font-style: italic;
          text-decoration: none;
        }
        .pretitle {
          text-align: center;
          font-family: var(--serif);
          font-size: 1.6em;
          font-weight: normal;
          font-style: italic;
        }
        .intro {
          margin: 3em auto;
          max-width: 35em;
          text-align: center;
          font-size: 1.3em;
        }
        .info {
          display: block;
          background: white;
          padding: 2em;
        }
        .Results {
          margin-bottom: 4em;
        }
        .info h3 {
          display: block;
          font-size: 1.4em;
          margin-bottom: 1.5em;
        }
        .info p {
          margin-bottom: 3em;
        }
        .info p:last-child {
          margin-bottom: 0;
        }
        .chart {
          margin-top: 3em;
        }
        .precaption {
          font-family: var(--serif);
          font-style: italic;
          text-align: center;
          font-size: 12px;
        }
        figure {
          display: block;
          margin: 0 auto;
        }
        figcaption {
          font-family: var(--serif);
          font-style: italic;
          max-width: 100%;
          text-align: center;
          font-size: 14px;
          margin: 0 auto;
        }
        figure > img {
          width: 100%;
          margin: 0 auto;
          display: block;
          margin: 1em auto;
        }

        @media (min-width: 768px) {
          h1 {
            font-size: 2.6em;
          }
          .info {
            padding: 4em;
            display: grid;
            grid-gap: 3em;
            grid-template-columns: 1fr auto;
          }
          .chart {
            margin-top: 0;
          }
          .precaption {
            text-align: right;
          }
          figure {
            max-width: 400px;
          }
          figcaption {
            max-width: 70%;
          }
          figure > img {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

export default withTranslation("site")(Results);
