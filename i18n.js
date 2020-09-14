const NextI18Next = require("next-i18next").default;
const { localeSubpaths } = require("next/config").default().publicRuntimeConfig;
const path = require("path");

const NextI18NextInstance = new NextI18Next({
  defaultLanguage: "en",
  otherLanguages: ["es"],
  localeSubpaths,
  localePath: path.resolve("./public/static/locales")
});

if (process.env.NODE_ENV !== "production") {
  const { applyClientHMR } = require("i18next-hmr");
  applyClientHMR(NextI18NextInstance.i18n);
}

module.exports = NextI18NextInstance;
