const IS_DEV = process.env.APP_VARIANT === "development";

export default {
  name: IS_DEV ? "Butterfly App (Dev)" : "Butterfly App (Preview)",
  slug: "butterfly-mobile-app-fe",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  plugins: [
    [
      "expo-image-picker",
      {
        photosPermission:
          "The app accesses your photos to let you share them with your friends.",
      },
    ],
    [
      "expo-media-library",
      {
        photosPermission: "Allow $(PRODUCT_NAME) to access your photos.",
        savePhotosPermission: "Allow $(PRODUCT_NAME) to save photos.",
        isAccessMediaLocationEnabled: true,
      },
    ],
    ["sentry-expo"],
  ],
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#FFFFFF",
    },
    package: IS_DEV
      ? "com.butterflymobileappfe.dev"
      : "com.butterflymobileappfe",
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  extra: {
    eas: {
      projectId: "e96e6e4b-e8b5-42ef-842b-302e50e14beb",
    },
  },
  owner: "1bit-frontend",
};
