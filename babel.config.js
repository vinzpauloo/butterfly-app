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
            global: "./src/global",
            hooks: "./src/hooks",
            i18n: "./src/i18n",
            layouts: "./src/layouts",
            lib: "./src/lib",
            redux: "./src/redux",
            screens: "./src/screens",
            services: "./src/services",
            theme: "./src/theme",
            utils: "./src/utils",
            i18n: "./src/i18n",
          },
        },
      ],
      [
        "module:react-native-dotenv",
        {
          moduleName: "react-native-dotenv",
          verbose: true,
        },
      ],
    ],
  };
};
