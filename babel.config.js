module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          alias: {
            data: "./src/data",
            layouts: "./src/layouts",
            screens: "./src/screens",
            assets: "./src/assets",
            features: "./src/features",
            globalStyles: "./src/globalStyles",
            services: "./src/services",
            components: "./src/components",
          },
        },
      ],
    ],
  };
};
