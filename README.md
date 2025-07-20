# CostOSmart App

This project uses **Expo SDK 53** with React Native 0.79 and Hermes. The
`PlatformConstants` module is provided via TurboModules.

If TurboModules are disabled (for example by setting `"turboModules": false` in
`app.json`) the app will crash on startup with an error similar to:

```
TurboModuleRegistry.getEnforcing(...): 'PlatformConstants' could not be found
```

To avoid this error, keep TurboModules enabled (do not set
`"turboModules": false`). When changing native configuration or upgrading
packages, rebuild the development client so that all TurboModules are bundled:

```bash
npm run build:android
```

This command runs `expo prebuild` and then `expo run:android`.

It is also recommended to keep dependencies up to date. The project includes
recent versions of `react-native-paper` and `react-native-image-picker` which
support Expo's new architecture.

## API configuration

The app expects an `API_URL` value in the Expo config. You can supply it using an
`app.config.js` file that reads from environment variables:

```js
import 'dotenv/config';

export default ({ config }) => ({
  ...config,
  extra: {
    ...config.extra,
    API_URL: process.env.API_URL,
  },
});
```

Create a `.env` file at the project root and define your endpoint:

```env
API_URL=https://example.com/api
```

`src/services/api.js` reads `API_URL` from the Expo config at runtime.
