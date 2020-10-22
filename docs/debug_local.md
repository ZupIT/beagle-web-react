
## Debug beagle-react locally
When debugging beagle-react (web) as a dependency on a local project in your machine, you may experience the error [Invalid Hook Call Warning](https://reactjs.org/warnings/invalid-hook-call-warning.html). This [issue](https://github.com/facebook/react/issues/14257) explains the reason. However, there is a workaround for this problem and it is described below.

At the root of this repository, run:

```bash
yarn
cd packages/beagle-react
yarn build
yarn link-beagle
cd YOUR_PROJECT
yarn link beagle-react react react-dom
```

If you need to undo the linking and download the dependencies from npm, at the root of this repository, run:

```bash
cd beagle-react
yarn unlink-beagle
cd YOUR_PROJECT
yarn unlink beagle-react react react-dom
yarn install --force
```
