module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1330),
  url: "https://4d9a-5-156-54-207.eu.ngrok.io",
  app: {
    keys: env.array("APP_KEYS"),
  },
});
