import React from "react";
import Logo from "../../public/static/images/lullaby-logo-simple.svg";
import { Link } from "../../i18n";

const TopNavTreatment = ({
  title,
  buttonText,
  buttonHref,
  showUserFrequency,
  showDiagnosticReminder
}) => (
  <nav className="TopNav">
    <div className="logo">
      <Link href="/">
        <a>
          <Logo />
        </a>
      </Link>
    </div>
    <div className="title">
      <h1>{title}</h1>
    </div>
    <div className="instructions">
      <Link href={buttonHref}>
        <a>{buttonText}</a>
      </Link>
    </div>
    {!!showDiagnosticReminder && (
      <div className="alert">
        <Link href="/diagnostic">
          <a>Do the diagnostic for this week. It takes 5 min</a>
        </Link>
      </div>
    )}
    {!!showUserFrequency && (
      <div className="alert">
        <Link href="/treatment">
          <a>Go back to your frequency ({showUserFrequency} hz)</a>
        </Link>
      </div>
    )}

    {/*language=SCSS*/}
    <style jsx>{`
      .TopNav {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: 100;
        text-align: center;
      }
      .logo {
        position: absolute;
        top: 20px;
        left: 20px;
      }
      .logo :global(svg) {
        display: block;
        height: 34px;
        width: 34px;
      }
      .instructions {
        background: white;
        border-top: 1px solid #fafafa;
        padding: 0.5em;
      }
      .instructions :global(a) {
        font-family: var(--serif);
        font-weight: normal;
        color: var(--primary);
        text-decoration: none;
      }
      .alert {
        background: var(--warning);
        border-top: 1px solid #fafafa;
        padding: 0.5em 0;
      }
      .alert :global(a) {
        font-family: var(--serif);
        font-weight: normal;
        color: white;
        text-decoration: none;
      }
      .title {
        display: block;
        background: white;
        margin: 0 auto;
        padding: 23px 1em;
      }
      .title h1 {
        font-size: 1.2em;
        font-weight: normal;
        margin: 0;
        text-align: center;
      }
      @media (min-width: 768px) {
        h1 {
          font-size: 28px;
        }
        .title {
          display: inline-block;
          border-top: 1px solid rgba(0, 0, 0, 0.1);
          border-bottom: none;
          padding: 2em 0;
          min-width: 23em;
        }
        .alert {
          margin: 0 auto;
          width: 23em;
        }
        .alert a {
          font-size: 0.9em;
        }
        .logo {
          position: absolute;
          top: 30px;
          left: 30px;
        }
        .logo :global(svg) {
          display: block;
          height: 43px;
          width: 43px;
        }
        .instructions {
          position: absolute;
          top: 30px;
          right: 30px;
          background: none;
          border-top: none;
        }
        .instructions :global(a) {
          padding: 5px;
          font-family: var(--serif);
          font-weight: normal;
          display: inline-block;
          background: none;
          text-decoration: underline;
        }
        .Treatment {
          padding-top: 3em;
        }
      }
    `}</style>
  </nav>
);

export { TopNavTreatment };
