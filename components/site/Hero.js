import Container from "./Container";
import Button from "./Button";
import { withTranslation, Link, Trans } from "../../i18n";
import LullabyLogo from "../../public/static/lullaby-logo-black.svg";
import GithubLogo from "../../public/static/github.svg";
import { I18nContext } from "next-i18next";
import { useContext } from "react";
import animateScrollTo from "animated-scroll-to";

function TinnitusHighlight({ children }) {
  const onClick = e => {
    e.preventDefault();

    // Yeah I know, but I'm too lazy to do it properly
    const $target = document.querySelector(".WhatIsTinnitus");

    animateScrollTo($target, {
      maxDuration: 1000,
      minDuration: 250,
      speed: 500,
      verticalOffset: -100
    });
  };

  return (
    <a className="strong" onClick={onClick}>
      {children}
    </a>
  );
}

function Hero({ t, treatmentFrequency }) {
  const { i18n } = useContext(I18nContext);
  const language = i18n.language;
  const switchLanguage = newLanguage =>
    newLanguage !== language && i18n.changeLanguage(newLanguage);

  return (
    <div className="Hero">
      <nav>
        <Container>
          <div className="nav">
            <div className="brand">
              <Link href="/">
                <a className="logo" title="Lullaby">
                  <LullabyLogo />
                </a>
              </Link>
            </div>
            <div className="language">
              <a
                className={`lang ${language === "es" ? "is-active" : ""}`}
                onClick={() => switchLanguage("es")}
              >
                <span className="long-name">Español</span>
                <span className="short-name">ES</span>
              </a>
              <a
                className={`lang ${language === "en" ? "is-active" : ""}`}
                onClick={() => switchLanguage("en")}
              >
                <span className="long-name">English</span>
                <span className="short-name">EN</span>
              </a>
            </div>
            <div className="social">
              <a
                href="https://github.com/Aerolab/Lullaby"
                target="_blank"
                rel="noopener"
                className="github"
                title="View Github"
              >
                <GithubLogo />
              </a>
            </div>
          </div>
        </Container>
      </nav>

      <div className="illustration">
        <Container>
          <div className="copy">
            <h1>
              <Trans
                t={t}
                i18nKey="heroTitle"
                components={{ strong: <TinnitusHighlight /> }}
              />
            </h1>

            <p>{t(`heroTagline`)}</p>
            <p className="price">
              <Trans t={t} i18nKey="heroPrice" components={{ em: <em /> }} />
            </p>

            {treatmentFrequency ? (
              <div className="cta">
                <Button href="/treatment">{t(`heroContinueTreatment`)}</Button>
                <div className="cta-new">
                  {t(`heroOr`)}{" "}
                  <Link href="/diagnostic">
                    <a>{t(`heroOrStartTreatment`)}</a>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="cta">
                <Button href="/diagnostic">{t(`heroStartTreatment`)}</Button>
              </div>
            )}
          </div>
        </Container>
      </div>

      <style jsx>{`
        .Hero {
          box-sizing: border-box;
        }
        .illustration {
          padding: 150px 0;
          background: linear-gradient(
              90deg,
              rgba(244, 244, 244, 0.85) 0%,
              rgba(244, 244, 244, 0.95) 50%,
              rgba(244, 244, 244, 0.85) 100%
            ),
            url(/static/home/hero-bg.svg) no-repeat 0% 50%;
          background-size: cover;
        }
        .copy {
          margin-left: 0;
          box-sizing: border-box;
          text-align: center;
        }
        .nav {
          display: flex;
          flex-direction: row;
          justify-content: center;
        }
        .nav .brand {
          text-align: center;
          flex-grow: 0;
        }
        .nav .social {
          position: absolute;
          top: 28px;
          right: 28px;
          flex-grow: 1;
          text-align: right;
        }
        .nav .language {
          position: absolute;
          left: 28px;
          top: 30px;
        }
        a.lang {
          display: inline-block;
          padding: 0.3em 1em;
          border-radius: 1em;
          color: var(--primary);
          font-weight: normal;
          font-size: 0.9em;
          text-transform: uppercase;
          cursor: pointer;
          background: white;
        }
        .lang.is-active {
          display: none;
        }
        .lang .long-name {
          display: none;
        }
        a.logo {
          display: flex;
          align-items: center;
          color: white;
          font-size: 1.2em;
          text-decoration: none;
        }
        a.logo :global(svg) {
          display: inline-block;
          width: 140px;
          height: 40px;
        }
        a.github :global(svg) {
          display: inline-block;
          width: 33px;
          height: 33px;
        }
        nav img {
          display: inline-block;
        }
        .cta {
          margin-top: 2em;
        }
        .cta-new {
          font-family: var(--serif);
          font-size: 1.2em;
          margin-top: 0.8em;
          color: #333333;
        }
        .cta-new a {
          font-weight: normal;
          font-style: italic;
        }
        a.learn-more {
          color: white;
          text-decoration: underline;
          margin-left: 2em;
        }
        h1 {
          font-weight: normal;
          font-size: 2.4em;
          line-height: 1.2;
        }
        h1 :global(a.strong) {
          position: relative;
          display: inline-block;
          font-style: italic;
          font-weight: normal;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.2s ease-out;
        }
        h1 :global(a.strong:hover) {
          background: var(--primaryLight);
        }
        h1 :global(a.strong::after) {
          content: "";
          position: absolute;
          bottom: 2px;
          left: 0;
          right: 0;
          border-bottom: 3px solid black;
        }
        p {
          font-size: 1.2em;
          line-height: 1.4;
          max-width: 24em;
        }
        p.price {
          font-size: 1.3em;
          font-family: var(--serif);
          font-style: italic;
        }
        p.price :global(strong) {
          font-weight: normal;
          font-style: italic;
          text-decoration: underline;
        }

        @media (min-width: 768px) {
          .nav {
            margin-left: 40%;
            justify-content: center;
          }
          .nav .brand {
            margin-left: -5px; /* Optical adjustment */
          }
          .nav .social {
            display: block;
            position: static;
          }
          .lang .short-name {
            display: none;
          }
          .lang .long-name {
            display: block;
          }
          h1 {
            font-size: 3em;
          }
          p {
            font-size: 1.3em;
          }
          p.price {
            font-size: 1.5em;
          }
          .cta-new {
            margin-left: 2.5em;
          }
          .illustration {
            box-sizing: border-box;
            display: flex;
            align-items: center;
            min-height: 100vh;
            margin: 0 auto;
            background: linear-gradient(
                90deg,
                rgba(244, 244, 244, 0.75) 0%,
                rgba(244, 244, 244, 0.85) 40%,
                rgba(244, 244, 244, 0.9) 41%,
                rgba(244, 244, 244, 1) 50%
              ),
              linear-gradient(0deg, #f4f4f4 0%, rgba(244, 244, 244, 0) 20%),
              url(/static/home/hero-bg.svg) no-repeat 50% 50%;
            background-size: cover;
          }
          .copy {
            margin-left: 40%;
            box-sizing: border-box;
            text-align: left;
          }
        }
        nav {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 10;
          padding: 24px 0;
        }
        @media (min-width: 768px) {
          nav {
            padding: 34px 0;
          }
        }
      `}</style>
    </div>
  );
}

export default withTranslation("site")(Hero);
