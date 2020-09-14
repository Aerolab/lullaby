import React from "react";
import App from "next/app";
import { appWithTranslation } from "../i18n";
import Head from "next/head";

class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <meta name="viewport" content="width=device-width" />
          <meta name="robots" content="index,follow" />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/icons/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/icons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/icons/favicon-16x16.png"
          />
          <link
            rel="mask-icon"
            href="/static/icons/safari-pinned-tab.svg"
            color="#593cf7"
          />
          <link rel="shortcut icon" href="/static/icons/favicon.ico" />
          <meta name="msapplication-TileColor" content="#2d89ef" />
          <link rel="manifest" href="/static/icons/site.webmanifest" />
          <meta
            name="msapplication-config"
            content="/static/icons/browserconfig.xml"
          />
          <meta name="theme-color" content="#ffffff" />

          <link
            href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800"
            rel="stylesheet"
          />

          {/* Google Tag Manager */}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-PVDJ33M');`
            }}
          />
        </Head>

        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PVDJ33M"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <Component {...pageProps} />

        {/* language=SCSS */}
        <style jsx global>{`
          :root {
            --bg: rgba(244, 244, 244, 1);
            --text: #000000;
            --textLight: #8e8e8e;
            --primary: #593cf7;
            --primaryLight: #d4cdfa;
            --secondary: #c0529d;
            --secondaryLight: #f9cdeb;
            --warning: rgb(247, 60, 101);
            --sans: "Open Sans", system-ui, sans-serif;
            --serif: "Lora", serif;

            --fontSize: 14px;
            --titleSize: 1.9em;
            --largeTitleSize: 2.4em;
          }
          @media (min-width: 768px) {
            :root {
              --fontSize: 16px;
              --titleSize: 2em;
              --largeTitleSize: 2.8em;
            }
          }
          @media (min-width: 1024px) {
            :root {
              --fontSize: 18px;
              --titleSize: 2.3em;
              --largeTitleSize: 3.1em;
            }
          }

          *,
          *::before,
          *::after {
            -webkit-font-smoothing: antialiased;
            text-rendering: optimizeLegibility;
          }
          html {
            margin: 0;
            padding: 0;
          }
          html {
            height: 100%;
          }
          body {
            height: 100%;
            min-height: 100%;
          }
          #__next {
            height: 100%;
          }
          body {
            margin: 0;
            padding: 0;
            line-height: 1.6;
            font-size: var(--fontSize);
            font-family: var(--sans);
            font-weight: 400;
            background: var(--bg);
            color: var(--text);
          }

          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            font-family: var(--serif);
            font-weight: 300;
            margin: 0;
          }
          a {
            color: inherit;
            font-weight: bold;
          }
        `}</style>
      </>
    );
  }
}

export default appWithTranslation(CustomApp);
