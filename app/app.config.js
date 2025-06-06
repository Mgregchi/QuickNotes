import config from "./.idea/config";

export default {
  expo: {
    name: "Quick Note",
    slug: "quicknote",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.mgregchi.quicknote",
    },
    android: {
      package: "com.mgregchi.quicknote",
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    plugins: [
      [
        "expo-build-properties",
        {
          android: {
            minSdkVersion: 21,
          },
        },
      ],
    ],
    extra: config,
    updates: {
      enabled: false,
    },
  },
};
