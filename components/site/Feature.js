import Container from "./Container";

export default class Feature extends React.PureComponent {
  render() {
    return (
      <div className={`Feature ${this.props.dark ? "is-dark" : ""}`}>
        <Container>{this.props.children}</Container>

        <style jsx>{`
          .Feature {
            padding: 5em 0;
          }
          .Feature.is-dark {
            background: #333;
            color: white;
          }
          .Feature :global(h1) {
            position: relative;
            padding-bottom: 0.5em;
          }
          .Feature :global(h1::after) {
            content: "";
            width: 3em;
            height: 5px;
            border-radius: 5px;
            background: white;
            display: block;
            position: absolute;
            bottom: 0;
            left: 0;
          }
        `}</style>
      </div>
    );
  }
}
