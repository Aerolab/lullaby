import Container from "./Container";
import Title from "./Title";
import React from "react";
import { withTranslation, Trans } from "../../i18n";
import DemoButton from "./DemoButton";

function WhatIsTinnitus({ t }) {
  return (
    <div className={`WhatIsTinnitus`}>
      <Container>
        <Title title={t(`whatTitle`)} description={t(`whatIntro`)} />
        <div className="demo">
          <div className="column">
            <p>
              <Trans
                t={t}
                i18nKey="whatTryOut"
                components={{ strong: <strong />, em: <em /> }}
              />
            </p>

            <div className="demoButton">
              <DemoButton />
            </div>
          </div>

          <div className="column">
            <p>
              <Trans t={t} i18nKey="whatOutro" components={{ em: <em /> }} />
            </p>
            <p>
              <Trans t={t} i18nKey="whatLullaby" components={{ em: <em /> }} />
            </p>
          </div>
        </div>
      </Container>

      {/* language=SCSS */}
      <style jsx>{`
        .WhatIsTinnitus {
          margin-bottom: 6em;
        }
        .WhatIsTinnitus :global(strong) {
          display: block;
        }
        .WhatIsTinnitus :global(em) {
          font-style: italic;
        }
        h2 {
          color: var(--primary);

          font-weight: bold;
          font-family: var(--sans);
          margin: 0;
          margin-bottom: 0.5em;
        }
        .demo {
          margin: 2em auto;
          background: white;
          text-align: left;

          display: grid;
          grid-template-columns: 1fr;
          grid-gap: 1em;
          padding: 2em;
        }
        .column {
          padding: 0;
        }
        @media (min-width: 768px) {
          .demo {
            padding: 0em;
            grid-template-columns: 1fr 1fr;
          }
          .column {
            padding: 2.5em 2em;
          }
        }
        .demoButton {
          margin: 2em 0 1em 0;
        }
      `}</style>
    </div>
  );
}

export default withTranslation("site")(WhatIsTinnitus);
