module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // Reanimated 3+ moved the plugin to react-native-worklets
    plugins: ['react-native-worklets/plugin'],
  };
};
