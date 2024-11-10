# Appium Boilerplate

Project and documentation based on

- https://webdriver.io/docs/gettingstarted/
- https://appium.io/docs/en/latest/
- https://github.com/webdriverio/appium-boilerplate/
- https://allurereport.org/docs/features-overview/
- https://github.com/appium/appium-inspector (usefull for dev can target specifics device and tests)

Boilerplate project to run Appium tests together with WebdriverIO for:

- iOS/Android Native Apps
- iOS/Android Hybrid Apps
- Android Chrome and iOS Safari browser

> [!NOTE]
> This boilerplate is for Webdriver V8 where the tests are written with `async`/`await` and TypeScript.
>
> This boilerplate only handles local execution on 1 em/simulator at a time, not parallel execution.
>
> For more info about that Google on setting up a grid with Appium.

> [!IMPORTANT]
> This boilerplate uses the WebdriverIO native demo app which can be found [here](https://github.com/webdriverio/native-demo-app).

## Based on

This boilerplate is currently based on:

- **WebdriverIO:** `8.x`
- **Appium:** `2.x`

## Installation

1. Clone this project

```sh
gh repo clone Izocel/Appium-Boilerplate
```

2. Install all dependencies

```sh
npm install
```

> [!TIP]
> When running test in a cloud, you don't need Appium installed on you local machine.
>
> Use the [appium-installer](https://github.com/AppiumTestDistribution/appium-installer) package:
>
> - Setup Appium on your local machine. `install appium server`
> - If you've already a react-native environement setup (recommended) skip next step.
> - Configure Android Emulators/ iOS Simulators. `install environements`

3. Import the application files (`.apk` / `.ipa`) inside `apps/myApp/` respective folders (clone the folder for new app).

4. Adjust the configuration file(s) for (`Android` / `iOS`) regarding the simulator or real device you are using.

5. Running tests locally
   - **Android App:** `npm run test:android`
   - **iOS App:** `npm run test:ios`
