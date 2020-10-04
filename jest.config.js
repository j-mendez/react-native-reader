const { defaults: tsjPreset } = require("ts-jest/presets");
require("dotenv").config();

module.exports = {
  ...tsjPreset,
  preset: "react-native",
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  transform: {
    ...tsjPreset.transform,
    "\\.js$": "<rootDir>/node_modules/react-native/jest/preprocessor.js",
  },
};
