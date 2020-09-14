import Container from "./Container";
import PaperItem from "./PaperItem";
import Title from "./Title";
import { withTranslation } from "../../i18n";

class LearnMore extends React.PureComponent {
  render() {
    const { t } = this.props;

    return (
      <div className={`LearnMore`}>
        <Container>
          <Title title={t(`learnTitle`)} description={t(`learnDescription`)} />

          <div className="papers">
            <PaperItem
              href="https://www.cambridge.org/core/books/tinnitus-retraining-therapy/F2A9064C4B9DDACEBE10AE4A24F2C3CE"
              title={t(`learn_trt_title`)}
              publisher={t(`learn_trt_publisher`)}
              logoSrc="/static/studies/cambridge.png"
              description={t(`learn_trt_description`)}
            />

            <PaperItem
              href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4797223/"
              title={t(`learn_trial_title`)}
              publisher={t(`learn_trial_publisher`)}
              logoSrc="/static/studies/national-biotech.png"
              description={t(`learn_trial_description`)}
            />

            <PaperItem
              href="http://www.tinnitusjournal.com/articles/the-windowed-sound-therapy-a-new-empirical-approach-for-an-effective-personalized-treatment-of-tinnitus.pdf"
              title={t(`learn_wwn_title`)}
              publisher={t(`learn_wwn_publisher`)}
              logoSrc="/static/studies/parma.png"
              description={t(`learn_wwn_description`)}
            />

            <PaperItem
              href="https://www.researchgate.net/publication/264831147_Music_Therapy_for_Chronic_Tinnitus_Variability_of_Tinnitus_Pitch_in_the_Course_of_Therapy"
              title={t(`learn_variability_title`)}
              publisher={t(`learn_variability_publisher`)}
              logoSrc="/static/studies/researchgate.png"
              description={t(`learn_variability_description`)}
            />

            <PaperItem
              href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2918775/pdf/cib0303_0274.pdf"
              title={t(`learn_music_title`)}
              publisher={t(`learn_music_publisher`)}
              logoSrc="/static/studies/national-biotech.png"
              description={t(`learn_music_description`)}
            />

            <PaperItem
              href="https://www.researchgate.net/publication/264831147_Music_Therapy_for_Chronic_Tinnitus_Variability_of_Tinnitus_Pitch_in_the_Course_of_Therapy"
              title={t(`learn_music_study_title`)}
              publisher={t(`learn_music_study_publisher`)}
              logoSrc="/static/studies/plos.png"
              description={t(`learn_music_study_description`)}
            />
          </div>
        </Container>

        <style jsx>{`
          .papers {
            margin-top: 2em;
            display: grid;
            grid-gap: 2em;
            grid-template-columns: 1fr;
          }

          @media (min-width: 1024px) {
            .papers {
              grid-template-columns: 1fr 1fr;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default withTranslation("site")(LearnMore);
