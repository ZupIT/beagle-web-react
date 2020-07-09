
## Debug beagle-react locally
When debugging beagle-react as a dependency on a local project in your machine, you may experience the error [Invalid Hook Call Warning](https://reactjs.org/warnings/invalid-hook-call-warning.html). This [issue](https://github.com/facebook/react/issues/14257) explains the reason. However, there is a workaround for this problem and it is described below.

```
cd beagle-react
yarn
yarn build
cd dist
yarn link
cd ../node_modules/react
yarn link
cd ../react-dom
yarn link
cd YOUR_PROJECT
yarn link beagle-react react react-dom
```
