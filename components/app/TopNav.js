import React from "react";
import { Router, withTranslation } from "../../i18n";
import { ReactComponent as Logo } from "../../public/static/images/lullaby-logo-simple.svg";

function TopNav({ currentStep, stepNames, onClickStep, t }) {
  const handleLogoClick = e => {
    e.preventDefault();
    if (confirm(t(`DiagnosticQuitConfirm`))) {
      Router.push(`/`);
    }
  };

  return (
    <nav className="TopNav">
      <a onClick={handleLogoClick} className="logo">
        <Logo />
      </a>
      {/* <div className="steps">
        <StepBar
          currentStep={currentStep}
          stepNames={stepNames}
          onClickStep={onClickStep}
        />
      </div> */}
      {/*<div className="volume"><VolumeControl /></div>*/}

      {/*language=SCSS*/}
      <style jsx>{`
        .TopNav {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;

          padding: 30px;
        }
        .TopNav a.logo {
          display: inline-block;
          margin: 0 auto;
          cursor: pointer;
        }
        .TopNav .logo :global(svg) {
          display: block;
        }
        .volume {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 20%;
          max-width: 200px;
          min-width: 130px;
          padding: 8px 0;
        }
        @media (max-width: 768px) {
          .TopNav .steps {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
}

export default withTranslation("app")(TopNav);
