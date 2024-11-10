import {
  ALLURE_REPORTER,
  ANDROID_CAPABILITY,
  BAIL_COUNT,
  handleAllureResults,
  SPECS,
} from "./configs.ts";
import { config as baseConfig } from "./wdio.shared.appium.conf.ts";

export const config: WebdriverIO.Config = {
  ...baseConfig,
  bail: BAIL_COUNT,

  specs: SPECS,
  capabilities: [ANDROID_CAPABILITY],
  reporters: [ALLURE_REPORTER as any],

  onComplete: async function () {
    return await handleAllureResults();
  },
};
