export default class PaperItem extends React.PureComponent {
  render() {
    const { title, description, publisher, logoSrc, href } = this.props;

    return (
      <a href={href} target="_blank" rel="noopener" className="PaperItem">
        <div className="metadata">
          <picture>
            <img src={logoSrc || "/static/studies/paper.png"} alt="" />
          </picture>
          {publisher}
        </div>

        <h3>{title}</h3>
        <p>{description}</p>

        {/*language=SCSS*/}
        <style jsx>{`
          .PaperItem {
            background: white;
            text-decoration: none;
            display: block;
            padding: 2em;
            transition: all 0.2s ease-out;
            cursor: pointer;
          }
          .PaperItem:hover {
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.04);
          }
          .metadata {
            font-weight: 300;
            display: flex;
            align-items: center;
            font-size: 1em;
            margin-bottom: 1.5em;
          }
          .metadata > picture {
            display: inline-block;
            margin-right: 1em;
            width: 32px;
            height: 32px;
          }
          .metadata > picture > img {
            display: block;
            max-width: 100%;
            max-height: 100%;
          }
          h3 {
            font-size: 1.4em;
            margin-bottom: 1em;
          }
          p {
            font-size: 1em;
            font-weight: 300;
            margin: 0;
          }
          @media (min-width: 768px) {
            .PaperItem {
              padding: 3em;
            }
          }
        `}</style>
      </a>
    );
  }
}
