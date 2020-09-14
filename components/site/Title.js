export default class Title extends React.Component {
  render() {
    const { title, description } = this.props;

    return (
      <div className="Title">
        <h1>{title}</h1>
        {description && <p>{description}</p>}

        {/* language=SCSS */}
        <style jsx>{`
          .Title {
            text-align: center;
            margin-bottom: 2em;
          }
          @media (min-width: 768px) {
            .Title {
              margin-bottom: 4em;
            }
          }
          h1 {
            font-family: var(--serif);
            font-style: italic;
            font-size: 2.1em;
            margin: 0 auto;
            margin-bottom: 1em;
          }
          p {
            font-size: 1em;
            max-width: 30em;
            margin: 0 auto;
          }
        `}</style>
      </div>
    );
  }
}
