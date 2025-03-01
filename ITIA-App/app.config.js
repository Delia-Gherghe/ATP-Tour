import "dotenv/config"

export default {
    expo: {
      name: "ITIA-App",
      slug: "ITIA-App",
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
      ios: {
        "supportsTablet": true
      },
      android: {
        adaptiveIcon: {
          foregroundImage: "./assets/adaptive-icon.png",
          backgroundColor: "#ffffff"
        }
      },
      web: {
        "favicon": "./assets/favicon.png"
      },
      extra: {
        apiKey: process.env.API_KEY
      }
    }
  };