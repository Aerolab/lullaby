const withImages = require("next-images");
const withOffline = require("next-offline");
const { nextI18NextRewrites } = require("next-i18next/rewrites");
const { I18NextHMRPlugin } = require("i18next-hmr/plugin");
const path = require("path");

const localeSubpaths = {
  en: "en",
  es: "es"
};

module.exports = withImages(
  withOffline({
    rewrites: async () => nextI18NextRewrites(localeSubpaths),
    publicRuntimeConfig: {
      BASE_URL: `https://uselullaby.com`,
      localeSubpaths
    },

    target: "serverless",
    // Cache the Homepage
    transformManifest: manifest => ["/"].concat(manifest),
    // For debugging mostly
    generateInDevMode: false,
    workboxOpts: {
      swDest: "static/service-worker.js",
      runtimeCaching: [
        {
          urlPattern: /^https?.*/,
          handler: "NetworkFirst",
          options: {
            cacheName: "https-calls",
            networkTimeoutSeconds: 10,
            expiration: {
              maxEntries: 150,
              maxAgeSeconds: 30 * 24 * 60 * 60 // 1 month
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    },
    webpack(config, options) {
      if (!options.isServer && config.mode === "development") {
        const { I18NextHMRPlugin } = require("i18next-hmr/plugin");
        config.plugins.push(
          new I18NextHMRPlugin({
            localesDir: path.resolve("./public/static/locales")
          })
        );
      }

      return config;
    }
  })
);
