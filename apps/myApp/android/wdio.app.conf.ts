import allure from "allure-commandline";
import { join } from "node:path";
import { config as baseConfig } from "../../../configs/wdio.ios.app.conf.ts";

const appDir = join(process.cwd(), "apps", "myApp");
const baseDir = join(appDir, "android");
const reportDir = join(baseDir, "reports");

const app = join(baseDir, "android.wdio.native.app.v1.0.8.apk");
const specs = [join(appDir, "tests", "**", "app*.spec.ts")];

export const config: WebdriverIO.Config = {
  ...baseConfig,
  specs,
  capabilities: [
    {
      platformName: "Android",
      "appium:app": app,
      "wdio:maxInstances": 1,
      "appium:deviceName": "R5CW10PPKLL",
      "appium:automationName": "UiAutomator2",
      "appium:appWaitActivity": "com.wdiodemoapp.MainActivity",
      "appium:newCommandTimeout": 240,
    },
  ],

  reporters: [
    [
      "allure",
      {
        outputDir: reportDir,
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
      },
    ],
  ],

  onComplete: function () {
    const reportError = new Error("Could not generate Allure report");
    const generation = allure(["generate", reportDir, "--clean"]);

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
