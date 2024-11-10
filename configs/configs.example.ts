import allure from "allure-commandline";
import { join } from "path";

export const APP_DIR = join(process.cwd(), "apps", "WdioDemoApp");
export const SPECS = [join(APP_DIR, "tests", "**", "app*.spec.ts")];
export const REPORT_DIR = join(APP_DIR, "reports");

export const ANDROID_DEVICE = "R5CW10PPKLL";
export const ANDROID_ACTIVITY = "com.wdiodemoapp.MainActivity";
export const ANDROID_DIR = join(APP_DIR, "android");
export const ANDROID_APP = join(
  ANDROID_DIR,
  "android.wdio.native.app.v1.0.8.apk"
);

export const IOS_DEVICE = "iPhone 15";
export const IOS_DIR = join(APP_DIR, "ios");
export const IOS_APP = join(
  IOS_DIR,
  "ios.simulator.wdio.native.app.v1.0.8.zip"
);

export const ANDROID_CAPABILITY = {
  platformName: "Android",
  browserName: "chrome",
  "wdio:maxInstances": 1,
  "appium:app": ANDROID_APP,
  "appium:deviceName": ANDROID_DEVICE,
  "appium:appWaitActivity": ANDROID_ACTIVITY,
  "appium:automationName": "UiAutomator2",
  "appium:newCommandTimeout": 240,
  disableIdLocatorAutocompletion: true,
};

export const IOS_CAPABILITY = {
  platformName: "iOS",
  browserName: "chrome",
  "wdio:maxInstances": 1,
  "appium:app": IOS_APP,
  "appium:deviceName": IOS_DEVICE,
  "appium:automationName": "XCUITest",
  "appium:newCommandTimeout": 240,
  disableIdLocatorAutocompletion: true,
};

export const ALLURE_REPORTER = [
  "allure",
  {
    outputDir: REPORT_DIR,
    disableWebdriverStepsReporting: true,
    disableWebdriverScreenshotsReporting: false,
  },
];

export async function handleAllureResults() {
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
      REPORT_DIR,
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
}
