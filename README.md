# beagle-react
Project: Produto - Beagle

# Installation
Install `beagle-react` with the following command:

```
yarn add @zup-it/beagle-react
```

Or

```
npm install --save @zup-it/beagle-react
```

# Configuration
Now that you have installed the library, follow the instructions below to set up beagle-react in your project.

1. Create beagle service configuration
```
import { createBeagleUIService } from '@zup-it/beagle-react'

export default createBeagleUIService({
  baseUrl: beagleUrl,
  components: {
    loading: YourLoadingComponent,
    error: YourErrorComponent,
    // your components
  },
})
```

---
**NOTE**: 
Remember to declare in your configuration all the components that beagle will render

---

2. Provide beagle service in your app

```
import { BeagleProvider } from '@zup-it/beagle-react'

const App = () => (
  <BeagleProvider value={beagleService}>
    <YourAppComponent />
  </BeagleProvider>
)

render(<App />, document.getElementById('root'))
```

3. Finally, you can render a beagle view in your project
```
import { BeagleRemoteView } from '@zup-it/beagle-react'

const YourAppComponent = () => (
  <BeagleRemoteView path={pathToYourRemoteView} />
)
```

## Debug beagle-react locally
When debugging beagle-react as a dependency on a local project in your machine, you may experience the error [Invalid Hook Call Warning](https://reactjs.org/warnings/invalid-hook-call-warning.html). This [issue](https://github.com/facebook/react/issues/14257) explains the reason. However, there is a workaround for this problem and it is described below.

```
cd beagle-react
yarn link
yarn
cd node_modules/react
yarn link
cd ../react-dom
yarn link
cd YOUR_PROJECT
yarn link beagle-react react react-dom
```
