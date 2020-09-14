import Container from "./Container";
import Title from "./Title";
import React from "react";

import { withTranslation, Trans } from "../../i18n";

function HowItWorks({ t }) {
  return (
    <div className={`HowItWorks`}>
      <Container>
        <Title
          title={<Trans t={t} i18nKey="howTitle" components={{ em: <em /> }} />}
          description={t(`howIntro`)}
        />

        <div className="techniques">
          <div className="technique technique-wnn">
            <picture>
              <div className="img-clip">
                <img src="/static/home/wwn.svg" alt="" />
              </div>
            </picture>
            <div className="info">
              <h2>{t(`wwnTitle`)}</h2>
              <p>
                <Trans
                  t={t}
                  i18nKey="wwnInfo1"
                  components={{ strong: <strong /> }}
                />
              </p>
              <p>
                <Trans
                  t={t}
                  i18nKey="wwnInfo2"
                  components={{ strong: <strong /> }}
                />
              </p>
            </div>
          </div>

          <div className="technique technique-cbt">
            <picture>
              <div className="img-clip">
                <img src="/static/home/cbt.svg" alt="" />
              </div>
            </picture>
            <div className="info">
              <h2>{t(`cbtTitle`)}</h2>
              <p>
                <Trans
                  t={t}
                  i18nKey="cbtInfo1"
                  components={{ strong: <strong /> }}
                />
              </p>
              <p>
                <Trans
                  t={t}
                  i18nKey="cbtInfo2"
                  components={{ strong: <strong /> }}
                />
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* language=SCSS */}
      <style jsx>{`
        .HowItWorks {
          margin-bottom: 6em;
        }

        .techniques {
          display: block;
        }
        .technique {
          background: white;
          display: grid;
          grid-template-columns: 1fr;
        }
        .technique picture {
          padding: 3em 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .technique .img-clip {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
        }
        .technique .info {
          padding: 2em;
        }
        .technique-wnn {
          margin-bottom: 3em;
        }

        .technique-wnn picture {
          background: #f2efff;
        }
        .technique-cbt picture {
          background: #f7e7f2;
        }

        .technique picture {
          padding: 3em 2em;
        }
        .technique .img-clip {
          height: 10em;
          overflow: hidden;
        }
        .technique picture img {
          display: block;
          margin: 0 auto;
          height: auto;
          width: 100%;
          max-width: 20em;
        }

        @media (min-width: 1024px) {
          .technique {
            grid-template-columns: 1fr 1fr;
          }
          .technique .info {
            padding: 3em;
          }
          .technique-cbt picture {
            order: 2;
          }
          .technique .img-clip {
            height: auto;
          }
          .technique picture img {
            height: 20em;
            width: auto;
          }
        }

        h2 {
          margin: 0;
          font-size: 1.5em;
          margin-bottom: 1.5em;
        }
        p {
          font-size: 1em;
          line-height: 1.6;
          margin-bottom: 2em;
        }
      `}</style>
    </div>
  );
}

export default withTranslation("site")(HowItWorks);
