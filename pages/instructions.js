import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { TopNavTreatment } from "../components/app/TopNavTreatment";
import { Link } from "../i18n";
import User from "../libs/user";
import { ReactComponent as Headphones } from "../public/static/images/headphones.svg";
import { ReactComponent as Tinnitus } from "../public/static/images/tinnitus.svg";
import { ReactComponent as Volume } from "../public/static/images/volume.svg";
import { ReactComponent as Sleep } from "../public/static/images/sleep.svg";
import { ReactComponent as Clock } from "../public/static/images/clock.svg";
import { ReactComponent as Calendar } from "../public/static/images/calendar.svg";
import { withTranslation } from "../i18n";

function Instructions({ t }) {
  const [frequency, setFrequency] = useState(null);

  useEffect(() => {
    User.init();
    User.initTrackers();
    setFrequency(User.getFrequency());
  }, []);

  return (
    <div className="Instructions">
      <Head>
        <title>{t(`InstructionsTitle`)}</title>
      </Head>

      <TopNavTreatment
        title={t(`InstructionsHeader`)}
        buttonText={t(`BackToTreatment`)}
        buttonHref="/treatment"
      />

      <div className="info">
        <h2>{t(`WhatYouNeed`)}</h2>

        <div className="requirements-list">
          <div className="requirement">
            <div className="icon">
              <Headphones />
            </div>
            <h3>{t(`NeedHeadphonesTitle`)}</h3>
            <div className="text">
              <p>{t(`NeedHeadphonesDescription`)}</p>
            </div>
          </div>
          <div className="requirement">
            <div className="icon">
              <Tinnitus />
            </div>
            <h3>{t(`NeedDiagnosticTitle`)}</h3>
            <div className="text">
              <p>
                <Link href={`/diagnostic`}>
                  <a>{t(`NeedDiagnosticDescription1`)}</a>
                </Link>{" "}
                {t(`NeedDiagnosticDescription2`)}
              </p>
            </div>
          </div>
        </div>

        <h2>{t(`SetUpTreatmentTitle`)}</h2>

        <div className="requirements-list">
          <div className="requirement">
            <h3>{t(`InstructionVolume`)}</h3>
            <div className="text">
              <div className="icon">
                <Volume />
              </div>
              <p>{t(`InstructionVolumeDescription`)}</p>
            </div>
          </div>
          <div className="requirement">
            <h3>{t(`InstructionVolumeApp`)}</h3>
            <div className="text">
              <div className="icon">
                <Tinnitus />
              </div>
              <p>{t(`InstructionVolumeAppDescription`)}</p>
            </div>
          </div>
        </div>

        <h2>{t(`HowToUse`)}</h2>

        <div className="requirements-list">
          <div className="requirement">
            <h3> {t(`UseHoursDay`)}</h3>
            <div className="text">
              <div className="icon">
                <Clock />
              </div>
              <p>{t(`UseHoursDayDescription`)}</p>
            </div>
          </div>
          <div className="requirement">
            <h3>{t(`UseDiagnosisWeek`)}</h3>
            <div className="text">
              <div className="icon">
                <Calendar />
              </div>
              <p>{t(`UseDiagnosisWeekDescription`)}</p>
            </div>
          </div>
          <div className="requirement">
            <h3>{t(`UseSleeping`)}</h3>
            <div className="text">
              <div className="icon">
                <Sleep />
              </div>

              <p>{t(`UseSleepingDescription`)}</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .info {
          padding: 20px;
          padding-top: 110px;
          padding-bottom: 100px;
          max-width: 800px;
          margin: 0 auto;
        }
        h2 {
          font-size: var(--titleSize);
          font-style: italic;
          text-align: center;
          margin: 1em 0;
        }
        .requirement {
          position: relative;
          margin-bottom: 1em;
          text-align: left;
          background: white;
          padding: 1em;
          border-left: 6px solid var(--secondary);
        }
        .requirement .icon {
          position: absolute;
          top: 1em;
          right: 1em;
          width: 2em;
          height: 2em;
          text-align: right;
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
        .requirement .icon :global(svg) {
          display: block;
          width: 1.6em;
          height: 1.6em;
          fill: #666;
        }
        .requirement h3 {
          font-size: 1.2em;
          font-style: italic;
          margin: 0;
          margin-bottom: 0.5em;
          padding-right: 1.8em;
          padding-bottom: 0.5em;
          border-bottom: 1px solid #f0f0f0;
        }
        .requirement .text {
          display: flex;
          flex-direction: row;
          margin: 0;
        }
        .requirement p {
          margin: 0;
        }
      `}</style>
    </div>
  );
}

Instructions.propTypes = {
  match: PropTypes.object
};

Instructions.getInitialProps = () => {
  return { namespacesRequired: ["app"] };
};

const InstructionsView = withTranslation("app")(Instructions);

export default InstructionsView;
