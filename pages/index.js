import Hero from "../components/site/Hero";
import Container from "../components/site/Container";
import Button from "../components/site/Button";
import HowItWorks from "../components/site/HowItWorks";
import LearnMore from "../components/site/LearnMore";
import Head from "next/head";
import Results from "../components/site/Results";
import { withTranslation, Trans } from "../i18n";
import AerolabLogo from "../public/static/aerolab-logo.svg";
import User from "../libs/user";
import { useState, useEffect } from "react";
const { BASE_URL } = require("next/config").default().publicRuntimeConfig;
import { I18nContext } from "next-i18next";
import { useContext } from "react";
import WhatIsTinnitus from "../components/site/WhatIsTinnitus";

function Home({ t }) {
  const { i18n } = useContext(I18nContext);
  const language = i18n.language;
  const [treatmentFrequency, setTreatmentFrequency] = useState(null);

  useEffect(() => {
    User.initTrackers();
    setTreatmentFrequency(User.getFrequency());
  }, []);

  return (
    <div className="Home">
      <Head>
        <title>{t(`page_title`)}</title>
        <meta name="description" content={t(`page_description`)} />

        <meta property="og:site_name" content="Lullaby" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={t(`page_title`)} />
        <meta property="og:description" content={t(`page_description`)} />
        <meta property="og:url" content={`${BASE_URL}`} />
        <meta
          property="og:image"
          content={`${BASE_URL}/static/social/home-${language}.png`}
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@aerolab" />
        <meta name="twitter:title" content={t(`page_title`)} />
        <meta name="twitter:description" content={t(`page_description`)} />
        <meta
          name="twitter:image"
          content={`${BASE_URL}/static/social/home-${language}.png`}
        />
      </Head>

      <Hero treatmentFrequency={treatmentFrequency} />

      <WhatIsTinnitus />

      <HowItWorks />

      <Results />

      <LearnMore />

      <div className="bottom-cta">
        <Button href="/diagnostic">{t(`heroStartTreatment`)}</Button>
      </div>

      <footer>
        <Container>
          <p>
            <Trans t={t} i18nKey="footerSignature">
              Created by
              <a href="https://aerolab.co" rel="noopener" target="_blank">
                Aerolab
              </a>
              - free &amp; open source
            </Trans>
          </p>

          <div className="icon">
            <a
              href="https://aerolab.co"
              rel="noopener"
              target="_blank"
              title="Aerolab"
            >
              <AerolabLogo />
            </a>
          </div>
        </Container>
      </footer>

      {/* language=SCSS */}
      <style jsx>{`
        .Home {
          font-size: 16px;
        }
        .bottom-cta {
          margin-top: 4em;
          text-align: center;
        }
        footer {
          padding-top: 3em;
          text-align: center;
          min-height: 300px;
          background: url("/static/home/footer-bg.svg") repeat-x 50% 100%;
        }
        footer p {
          font-size: 1em;
          font-family: var(--serif);
          font-style: italic;
        }
        footer a {
          font-weight: normal;
        }
        footer .icon {
          margin-top: 5em;
        }
        footer .icon :global(svg) {
          display: inline-block;
          width: 2.3em;
          height: 2.3em;
        }
      `}</style>
    </div>
  );
}

Home.getInitialProps = () => {
  return { namespacesRequired: ["site"] };
};

export default withTranslation(["site"])(Home);
