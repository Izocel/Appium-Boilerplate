import {
  ALLURE_REPORTER,
  BAIL_COUNT,
  handleAllureResults,
  IOS_CAPABILITY,
  SPECS,
} from "./configs.js";
import { config as baseConfig } from "./wdio.shared.appium.conf.js";

export const config: WebdriverIO.Config = {
  ...baseConfig,
  bail: BAIL_COUNT,

  specs: SPECS,
  capabilities: [IOS_CAPABILITY],
  reporters: [ALLURE_REPORTER as any],

  onComplete: async function () {
    return await handleAllureResults();
  },
};
