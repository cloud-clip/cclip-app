# Cloud Clip App

> Mobile app, accessing Cloud Clip servers and its resources, written in [React Native](https://reactnative.dev/) and [TypeScript](https://www.typescriptlang.org/).

## Development

First install [Node.js 10 or later](https://nodejs.org/), if needed.

Then, keep sure to have all modules installed:

```bash
npm install
```

### Build and run

#### Android

First execute the following command in a terminal window:

```bash
npm start -- --reset-cache
```

Then execute following command in another terminal window:

```bash
npx react-native run-android
```

#### iOS

Install Pods:

```bash
cd ios
pod install
```

Then execute the following command from root directory:

```bash
npx react-native run-ios
```

#### Environment variables

The app uses [react-native-config](https://github.com/luggit/react-native-config), which makes it possible to add custom build configuration with the help of an `.env` file, which is stored in the root directory of the project.

To use such a file, first set the environment variable `ENVFILE` to `.env` and then start the app as described above.

The following variables are supported:

| Name      | Description |  Example |
|-----------|-------------|----------|
| `SERVERS` | List of hardcoded servers, separated by `;` and stored in format `<NAME>|<BASE-URL>|<PASSWORD>` | `SERVERS=Raspberry #1|http://192.168.0.1:50979/|myPassword1;Raspberry #2|http://192.168.0.22:50979/|myPassword222` |
