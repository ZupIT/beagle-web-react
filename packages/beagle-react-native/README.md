# Beagle React Native
Beagle is available for React Native, but it's not stable yet. The development is incomplete and we
still have some work to do before moving from beta versions. Unfortunately, our team is not big
enough to make React Native a priority and because of this, the development is relatively slow. We
decided to release a beta version anyway because we figured out if it's in interest of the
community, it can help us finalize it. At the end of this document you can find a list of everything
that should be working properly and everything that still needs work. Help is very welcomed here!

## Versioning
All versions of Beagle RN (Beagle React Native) to be launched before the final stable version
follows the pattern "0.x.y", where "x" represents the version of Beagle Web Core it uses. Since we
are currently in version "1.7.0" of Beagle Web Core, the current version of Beagle RN is 0.7.0. "y"
will be used to launch new versions that uses the same version of Beagle Web Core.

## Compatibility
Beagle RN Beta is guaranteed to work only with latest releases of React Native, i.e.
version 0.64.1 or above. It is probably possible to support older versions, but it is not a priority
right now.

## Installation
Install it with npm or yarn.

Yarn:
```bash
yarn add @zup-it/beagle-react-native
```

NPM:
```bash
npm install @zup-it/beagle-react-native
```

## Usage
To make it easier, you can use the script "beagle" to create the boilerplate for using Beagle.

Yarn:
```bash
yarn beagle
```

NPM:
```bash
npx beagle
```

Two files are created after running this command: `src/app.tsx` and
`src/beagle/beagle-service.ts`. The first is the entry point for your app, while the second is
the beagle configuration.

>Attention: we highly recommend the use of Typescript, that's why both files are generated using
this language. If you want to use plain javascript, rename the files to `app.jsx` and
`beagle-service.js`. Also remove all typing information.

>Attention: if you're using prettier and/or eslint, you'll probably have to format the generated
files according to the project rules. You can also ignore the rules if you don't want to change
the code.

To view the beagle application in action, make sure that your app renders the component `App` at
`src/app.tsx`. If you created your project via `react-native init`, change your `index.js` file to
the following:

```javascript
import {AppRegistry} from 'react-native';
import App from './src/app';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
```

Your application is ready to be executed! Once run, the app should show a welcome message loaded
remotely from `https://usebeagle.io/start/welcome`.

## Cache
By default, Beagle RN will only cache files temporally, i.e. as soon the app is closed, the cache
will be lost. To make a persistent cache, you must provide an implementation of the interface
`BeagleStorage`. Both `react-native/AsyncStorage` and `@react-native-async-storage/async-storage`
implement this interface. We don't use React Native's default implementation because it's
deprecated.

If you need to persist the cache, we recommend using `@react-native-async-storage/async-storage`. To
install it, follow the instructions
[here](https://react-native-async-storage.github.io/async-storage/docs/install/).

To use it with beagle, just add the following configuration to `src/beagle/beagle-service.ts`:

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage'
// ...

export default createBeagleUIService({
  // ...
  customStorage: AsyncStorage,
})
```

## WebView
Beagle RN has an implementation of the webview default component, but since web views are not
native to React Native, we need an additional library: `react-native-webview`.

Since the lib `react-native-webview` needs to be natively linked to iOS and Android, we decided to
add it as a peer-dependency, meaning, if you do need the WebView component, you also need to add
this dependency to your `package.json`.

Yarn:
```bash
yarn add react-native-webview
```

NPM:
```bash
npm install react-native-webview
```

>react-native-webview must be at version 11.6.2 or higher.

## Running a backend in the localhost
By default, after running `beagle init`, the remote views will be loaded from
`https://usebeagle.io/start`. This is just a preview and you will need to replace this address by
your own backend.

### Making HTTP requests
The first problem is making HTTP requests. By default, both Android and iOS will make only HTTPS
(secured) requests. To change this, follow the steps below.

#### Android
Open `android/app/src/main/AndroidManifest.xml` and place the rule `android:usesCleartextTraffic="true"` in `<application>`:

```xml
<application
  android:name=".MainApplication"
  android:label="@string/app_name"
  android:icon="@mipmap/ic_launcher"
  android:roundIcon="@mipmap/ic_launcher_round"
  android:allowBackup="false"
  android:theme="@style/AppTheme"
  android:usesCleartextTraffic="true">
```

#### iOS
Open `ios/{project_name}/info.plist` and make sure the configuration for `NSAppTransportSecurity` is
the following:

```xml
<key>NSAppTransportSecurity</key>
<dict>
  <key>NSExceptionDomains</key>
  <dict>
    <key>localhost</key>
    <dict>
      <key>NSTemporaryExceptionAllowsInsecureHTTPLoads</key>
      <true/>
    </dict>
  </dict>
</dict>
```

>Attention: we don't recommend this configuration for production builds. HTTP requests should be
blocked while not in development.

### localhost vs 10.0.2.2
Another problem of running your backend in the localhost is that while iOS does work with the
address `localhost`, Android doesn't. On Android, to access the localhost, you need to use the ip
`10.0.2.2`. To solve this problem, you can use react native's `Platform` to decide what address
to use. See the example below:

```typescript
import { Platform } from 'react-native'
// ...

export default createBeagleUIService({
  baseUrl: `http://${Platform.OS === 'android' ? '10.0.2.2' : 'localhost'}:8080`,
  // ...
})
```

## Local images
Beagle components normally refer to images by an id, see the example below:

```json
{
  "_beagleComponent_": "beagle:image",
  "path": {
    "_beagleImagePath_": "local",
    "mobileId": "zup-logo"
  }
}
```

Above, the image component refers to `zup-logo`. For this to work, this id must be registered in
Beagle. To register images that can be used for beagle, you must provide a map in the configuration
at `beagle-service.ts`. See the example below:

```typescript
import zupLogo from '../assets/zup-logo.png'
// ...

export default createBeagleUIService({
  // ...
  localAssetsPath: {
    'zup-logo': zupLogo,
  },
})
```

The image must exist in your assets folder, in this case, located at `src/assets`. If Typescript
complains, you can create a `src/globals.d.ts` file with the following content:

```typescript
declare module '*.png'
```

## Documentation
Everything else is just like Beagle React, use our
[documentation on Beagle Web](https://docs.usebeagle.io/) to proceed.

## Current development status
This is our current development status. Please help us get to a stable version!

To contribute to this project, please use
[this repository](https://github.com/ZupIT/beagle-web-react).

### Core features
Fully implemented. Renderization, context, custom components and custom actions all work! In truth,
if you don't intend on using the default components and default actions, Beagle React Native is
ready for production.

### Components
| Component      | Status          | Description                                                                                     |
|----------------|-----------------|-------------------------------------------------------------------------------------------------|
| Container      | done            |                                                                                                 |
| Screen         | not implemented | Working as a container                                                                          |
| Button         | done            |                                                                                                 |
| Image          | incomplete      | There might be some problems with the image size. Placeholder is not implemented.               |
| TextInput      | done            |                                                                                                 |
| Lazy component | done            |                                                                                                 |
| ListView       | incomplete      | Extremely buggy and slow. Mainly on Android.                                                    |
| GridView       | not implemented |                                                                                                 |
| PageView       | incomplete      | Doesn't render the children properly. Can't navigate between pages.                             |
| SimpleForm     | not implemented | Working as a container                                                                          |
| TabBar         | incomplete      | The tabbar doesn't scroll There seems to be a bug where a second tab bar in a page won't render |
| Text           | done            |                                                                                                 |
| Touchable      | done            |                                                                                                 |
| WebView        | done            |                                                                                                 |

We also need to check the styling here. Some of the components, even the ones marked as done, have
way to many styles, which might create some undesired behavior.

### Actions
| Actions         | Status          | Description                                                      |
|-----------------|-----------------|------------------------------------------------------------------|
| PushStack       | incomplete      | It works exactly like in web, i.e. the back button does nothing. |
| PopStack        | incomplete      | It works exactly like in web, i.e. the back button does nothing. |
| PushView        | incomplete      | It works exactly like in web, i.e. the back button does nothing. |
| PopView         | incomplete      | It works exactly like in web, i.e. the back button does nothing. |
| PopToView       | incomplete      | It works exactly like in web, i.e. the back button does nothing. |
| ResetStack      | incomplete      | It works exactly like in web, i.e. the back button does nothing. |
| OpenNativeRoute | not implemented | will try to use the browsers location, which doesn't exist.      |
| OpenExternalUrl | not implemented | will try to use the browsers location, which doesn't exist.      |
| AddChildren     | done            |                                                                  |
| Condition       | done            |                                                                  |
| Confirm         | not implemented |                                                                  |
| SendRequest     | done            |                                                                  |
| SetContext      | done            |                                                                  |
| SubmitForm      | not implemented |                                                                  |
