import {
  ALLURE_REPORTER,
  ANDROID_CAPABILITY,
  handleAllureResults,
  SPECS,
} from "./configs.js";
import { config as baseConfig } from "./wdio.shared.appium.conf.js";

export const config: WebdriverIO.Config = {
  ...baseConfig,
  specs: SPECS,
  capabilities: [ANDROID_CAPABILITY],
  reporters: [ALLURE_REPORTER as any],

  onComplete: async function () {
    return await handleAllureResults();
  },
};
