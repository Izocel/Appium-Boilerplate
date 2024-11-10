import {
  ALLURE_REPORTER,
  handleAllureResults,
  IOS_CAPABILITY,
  SPECS,
} from "./configs.js";
import { config as baseConfig } from "./wdio.shared.appium.conf.js";

export const config: WebdriverIO.Config = {
  ...baseConfig,
  specs: SPECS,
  capabilities: [IOS_CAPABILITY],
  reporters: [ALLURE_REPORTER as any],

  onComplete: async function () {
    return await handleAllureResults();
  },
};
