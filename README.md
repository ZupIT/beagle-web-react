# React + Typescript boilerplate

## About the project
This project is an application to start a new react project

## Getting Started

```sh
yarn
```

### Environments
We have 2 environments to run:
* `production` access the real API
* `mock` servers a mock data to test the flow and develop faster

To start the project you can use one of the commands above

```sh
yarn start
yarn start:mock
```

### Folder structure
* `public` (is a folder to public files)
* `src` (is the source path of the application)
  * `containers` components that hold some logic and state control
  * `components` (dumb components to visual concepts)
  * `core` (here we have api definition, utils and general configuration)
  * `hooks` (custom hooks)
  * `routes` (application routes)
  * `store` (store configuration)
* `stub` (mock server configuration)
* `unit-test` (tests config using jest and enzyme)

## Important dependencies

* [Jest](https://jestjs.io/) e [Enzyme](https://airbnb.io/enzyme/) to unit tests
* [Lodash](https://lodash.com/) a great lib for common javascript functions
* [React Router Dom](https://reactnavigation.org/) to application routes
* [Styled Components](https://www.styled-components.com/) a great lib to style the application

## About `Tests`
There are two types of tests:

* `unit-tests` for unit tests. Its configuration file is locate at `src/core/unit-test`.
