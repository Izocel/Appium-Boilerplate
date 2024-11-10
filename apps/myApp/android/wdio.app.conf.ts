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
    const openError = new Error("Could not open Allure report");

    async function tryOpenReport(retries: number, sleepMs: number = 0) {
      await new Promise((resolve) => setTimeout(resolve, sleepMs));

      return new Promise<void>((resolve, reject) => {
        if (retries-- <= 0) {
          return reject(openError);
        }

        const open = allure(["open"]);

        open.on("exit", async function (openExitCode: number) {
          if (openExitCode === 0) {
            console.info("Allure report opened successfully");
            return resolve();
          }

          try {
            console.warn("Retrying to open Allure report...");
            return await tryOpenReport(retries, 2000);
          } catch (error) {
            return reject(openError);
          }
        });
      });
    }

    return new Promise<void>((resolve, reject) => {
      const generationTimeout = setTimeout(() => reject(reportError), 5000);
      const reportError = new Error("Could not generate Allure report");
      const generation = allure([
        "generate",
        "--clean",
        "--single-file",
        reportDir,
      ]);

      generation.on("exit", async function (exitCode: number) {
        clearTimeout(generationTimeout);

        if (exitCode === 0) {
          console.info("Allure report successfully generated");
          return await tryOpenReport(3);
        }

        return reject(reportError);
      });
    });
  },
};
