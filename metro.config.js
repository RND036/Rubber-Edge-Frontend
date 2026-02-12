const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// Add tflite to asset extensions for TensorFlow Lite model
config.resolver.assetExts.push('tflite');

module.exports = withNativeWind(config, { input: './app/global.css' });