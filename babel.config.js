module.exports = function (api) {
  api.cache(true);
  return {
    plugins: [["module:react-native-dotenv", { envName: "APP_ENV" }]],
    presets: ["babel-preset-expo"],
  };
};
