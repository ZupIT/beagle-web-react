# Beagle React

## **Table of Contents**

### 1. [**About**](#about)
### 2. [**Usage**](#-usage)
>#### 2.1. [**Installation**](#installation)
>#### 2.1. [**Configuration**](#configuration)
>#### 2.1. [**Running**](#running)
>#### 2.1. [**Debugging**](#debugging)
### 3. [**Documentation**](#documentation)
### 4. [**Contributing**](#contributing)
### 5. [**Code of Conduct**](#code-of-conduct)
### 6. [**License**](#license)
### 7. [**Community**](#community)

## About
[![CII Best Practices](https://bestpractices.coreinfrastructure.org/projects/5389/badge)](https://bestpractices.coreinfrastructure.org/projects/5389)

[Beagle React](https://docs.usebeagle.io/v1.10/web/react/react-installing/) is a Zup's open source library for using [Beagle](https://docs.usebeagle.io/v/v1.0-en/) in a [React](https://reactjs.org) based project.

## Usage

### Installation

To follow the installation process, navigate to the root of your react project and run one of the commands below according to the package manager of your preference.

If you use Yarn:

```
yarn add @zup-it/beagle-react
```

If you use npm:

```
npm install --save @zup-it/beagle-react
```

```Well done! Your library was installed. Now, you can keep following to find out more of how to use Beagle on React.```

### Configuration
After you finished the installation,  you need to make **Beagle's usage configuration for React's framework**. To do so, you just have to follow these steps:

#### Step 1: Automatic configuration

Run one of the commands below to generate the files that will be used by the Beagle library. You can run the command according to your package manager (yarn or npm):

For yarn

```
yarn beagle init
```

For npm

```
npx beagle init
```

#### Step 2: JSON creation to be rendered

For the sake of this getting started you can use this URL to request a sample JSON: http://usebeagle.io.s3-website-sa-east-1.amazonaws.com/start/welcome

The response should be something like the following:
```json
{
    "_beagleComponent_": "beagle:container",
    "children": [
        {
            "_beagleComponent_":"beagle:text",
            "text":"Hello Beagle"
        },
       {
            "_beagleComponent_":"beagle:text",
            "style":{
              "padding":{
                "top":{
                  "value":10,
                  "type": "REAL"
                }
              }
            },
            "text":"Beagle is a cross-platform framework which provides usage of the server Driven UI concept,natively in iOS, Android and Web applications. By using Beagle, your team could easily change application's layout and data by just changing backend code"
        }
    ]
}
```

```
The Beagle's library comes with many pre-defined components ready to be used in their project. 
The code above creates a JSON with two os these components: container e text.
```

#### Step 3: Beagle service configuration

Now open the `beagle-service.ts` file that was generated in step 1 and copy this code if it is not already there:

```
import { createBeagleUIService } from '@zup-it/beagle-react'

export default createBeagleUIService({
  baseUrl: "http://usebeagle.io.s3-website-sa-east-1.amazonaws.com/start/",
  components: {}
})
```

Note here that we are using the same URL from step 2 but we removed the endpoint name '/welcome'

#### Step 4: Using the Beagle Remote View

Open the component file where you want the JSON to be rendered and change it as in the example below:

```
import React from 'react';
import './App.css';
import { BeagleProvider, BeagleRemoteView } from '@zup-it/beagle-react';
import BeagleService from './beagle/beagle-service';

function App() {
  return (
    <BeagleProvider value={BeagleService}>
      <BeagleRemoteView route={'/welcome'} />
    </BeagleProvider>
  );
}

export default App;
```
The beagle remove view component sets where the requested screens should be rendered within our application. In this case, the components coming from '/welcome' 

- **`<BeagleProvider>`**: Responsible to provide a `value` propriety as `beagle-service` created on the previous step and contains the initial configurations; 
- **`<BeagleRemoteView>`**: Responsible to receive a `route` propriety, which is the route to our JSON file.

```
Notice that here we add '/' because this value will be associated to the defined `baseUrl` on the file `beagle-service.ts`
```

### Running
Before we test if our configuration worked, you have to run one of the commands below to initialize the application:

```
yarn start
```

```
npm run start
```

After finished this commands, access the local: `http://localhost:3000` 

You should see the screen represented by the JSON above


### Debugging
[If you want to find out how to debug beagle-react locally check this file](/docs/debug_local.md)

## **Documentation**

You can find Beagle's documentation on our [**website**][site].

Beagle's documentation discusses components, APIs, and topics that are specific to [**Beagle documentation**][b-docs].

[site]: https://usebeagle.io/
[b-docs]: https://docs.usebeagle.io/

## **Contributing**

If you want to contribute to this module, access our [**Contributing Guide**][contribute] to learn about our development process, how to propose bug fixes and improvements, and how to build and test your changes to Beagle.

[contribute]: https://github.com/ZupIT/beagle-ios/blob/main/CONTRIBUTING.md

### **Developer Certificate of Origin - DCO**

 This is a security layer for the project and for the developers. It is mandatory.
 
 Follow one of these two methods to add DCO to your commits:
 
**1. Command line**
 Follow the steps: 
 **Step 1:** Configure your local git environment adding the same name and e-mail configured at your GitHub account. It helps to sign commits manually during reviews and suggestions.

 ```
git config --global user.name “Name”
git config --global user.email “email@domain.com.br”
```

**Step 2:** Add the Signed-off-by line with the `'-s'` flag in the git commit command:

```
$ git commit -s -m "This is my commit message"
```

**2. GitHub website**
You can also manually sign your commits during GitHub reviews and suggestions, follow the steps below: 

**Step 1:** When the commit changes box opens, manually type or paste your signature in the comment box, see the example:

```
Signed-off-by: Name < e-mail address >
```

For this method, your name and e-mail must be the same registered on your GitHub account.

## **Code of Conduct**

Please read the [**code of conduct**](https://github.com/ZupIT/beagle/blob/main/CODE_OF_CONDUCT.md).

## **License**

[**Apache License 2.0**](https://github.com/ZupIT/beagle-web-react/blob/main/LICENSE).


## **Community**
Do you have any question about Beagle? Let's chat in our [**forum**](https://forum.zup.com.br/). 
