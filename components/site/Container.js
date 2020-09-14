export default class Container extends React.PureComponent {
  render() {
    return (
      <div className="container">
        {this.props.children}

        <style jsx>{`
          .container {
            padding: 0 20px;
            max-width: 1100px;
            margin: 0 auto;
          }
          @media (min-width: 700px) {
            .container {
              padding: 0 30px;
            }
          }
        `}</style>
      </div>
    );
  }
}
