import Document, { Html, Head, Main, NextScript } from "next/document";
import { lngFromReq } from "next-i18next/dist/commonjs/utils";

class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const lng = lngFromReq(ctx.req);
    const additionalProps = {
      lng
    };

    return { ...initialProps, ...additionalProps };
  }

  render() {
    const { lng } = this.props;
    return (
      <Html lang={lng} dir="ltr">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
