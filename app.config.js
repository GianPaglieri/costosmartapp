import 'dotenv/config';

export default ({ config }) => ({
  ...config,
  extra: {
    ...config.extra,
    API_URL: process.env.API_URL || 'http://localhost:3000/api',
  },
  android: {
    ...config.android,
    package: "com.costosmart.app",
    versionCode: 1,
  },
  ios: {
    ...config.ios,
    bundleIdentifier: "com.costosmart.app",
    buildNumber: "1.0.0",
  },
  name: "CostOSmart",
  slug: "costosmart-app",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff"
  },
  assetBundlePatterns: [
    "**/*"
  ],
  updates: {
    fallbackToCacheTimeout: 0
  },
  runtimeVersion: {
    policy: "appVersion"
  },
  plugins: [
    "expo-secure-store",
    "expo-image-picker"
  ]
}); 