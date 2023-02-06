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
            assets: "./src/assets",
            components: "./src/components",
            data: "./src/data",
            features: "./src/features",
            globalStyles: "./src/globalStyles",
            hooks: "./src/hooks",
            i18n: "./src/i18n",
            layouts: "./src/layouts",
            lib: "./src/lib",
            redux: "./src/redux",
            screens: "./src/screens",
            services: "./src/services",
            theme: "./src/theme",
            utils: "./src/utils",
          },
        },
      ],
    ],
  };
};
