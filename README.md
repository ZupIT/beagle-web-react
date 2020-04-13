# beagle-react
Project: Produto - Beagle

## Debugar beagle-react localmente
Ao realizar um debug da lib como dependência de um projeto local em sua máquina, você poderá enfrentar o erro [Invalid Hook Call Warning](https://reactjs.org/warnings/invalid-hook-call-warning.html). Essa [issue](https://github.com/facebook/react/issues/14257) explica o motivo. No entanto, existe um workaround para esse problema e está descrito abaixo

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
