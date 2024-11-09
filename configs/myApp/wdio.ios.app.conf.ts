import allure from "allure-commandline";
import { join } from "node:path";
import { config as baseConfig } from "../wdio.ios.app.conf.ts";

const baseDir = join(process.cwd(), "apps", "myApp", "ios");

export const config: WebdriverIO.Config = {
  ...baseConfig,

  specs: ["../../tests/myApp/specs/**/app*.spec.ts"],

  capabilities: [
    {
      platformName: "iOS",
      "wdio:maxInstances": 1,
      "appium:deviceName": "iPhone 15",
      "appium:platformVersion": "17.2",
      "appium:orientation": "PORTRAIT",
      "appium:automationName": "XCUITest",
      "appium:app": join(baseDir, "ios.simulator.wdio.native.app.v1.0.8.zip"),
      "appium:newCommandTimeout": 240,
      "appium:webviewConnectTimeout": 5000,
    },
  ],

  reporters: [
    "spec",
    [
      "allure",
      {
        outputDir: join(baseDir, "reports"),
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
      },
    ],
  ],

  onComplete: function () {
    const reportError = new Error("Could not generate Allure report");
    const generation = allure([
      "generate",
      join(baseDir, "reports"),
      "--clean",
    ]);

    return new Promise<void>((resolve, reject) => {
      const generationTimeout = setTimeout(() => reject(reportError), 5000);
      generation.on("exit", async function (exitCode: number) {
        clearTimeout(generationTimeout);

        if (exitCode !== 0) {
          return reject(reportError);
        }

        console.log("Allure report successfully generated");
        await allure(["open"]);
        resolve();
      });
    });
  },
};
