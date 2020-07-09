# [Beagle React](https://docs.usebeagle.io/v/v1.0-en/get-started/installing-beagle/web#react)
Beagle React is a Zup's open source library for using [Beagle](https://docs.usebeagle.io/v/v1.0-en/) in a [React](https://reactjs.org) based project.

# Getting started

## Installing Beagle's library

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

## Usage configurations
After you finished the installation,  you need to make **Beagle's usage configuration for React's framework**. To do so, you just have to follow these steps:


### Step 1: JSON creation to be rendered

On your project, create a file named `payload.json` and copy the code below. For this example, we'll make a local JSON file to be rendered with Beagle's library.

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

### Step 2: File configuration

After you add the JSON on your project, create another file in the path `/src`, but this time with the name **Beagle**. Inside it, name a new file as `beagle-service.ts`. 

Now open the `beagle-service.ts` file and copy this code:
```
import { createBeagleUIService } from '@zup-it/beagle-react'

export default createBeagleUIService({
  baseUrl: "",
  components: {}
})
```

At this point of the configuration, you can add, for example, a path to Beagle's external server. The most indicated is to let the baseUrl propriety without value because we'll use a local file (`payload.json)` for this example. 

Then, open the component file where you want the JSON to be rendered and change it as in the example below:

```
import React from 'react';
import './App.css';
import { BeagleProvider, BeagleRemoteView } from '@zup-it/beagle-react';
import BeagleService from './beagle/beagle-service';

function App() {
  return (
    <BeagleProvider value={BeagleService}>
      <BeagleRemoteView path={'/payload.json'} />
    </BeagleProvider>
  );
}

export default App;
```

When we make this note, we indicate to Beagle that our defined layout will be rendered on `payload.json` file. In this case, two components are provided on the library: 

- **`<BeagleProvider>`**: Responsible to provide a `value` propriety as `beagle-service` created on the previous step and contains the initial configurations; 
- **`<BeagleRemoteView>`**: Responsible to receive a `path` propriety, which is the path to our JSON file.

```
Notice that here we add '/' because this value will be associated to the defined `baseUrl` on the file `beagle-service.ts`
```

## Testing the project
Before we test if our configuration worked, you have to run one of the commands below to initialize the application:

```
yarn start
```

```
npm run start
```

After finished this commands, access the local: `http://localhost:3000` 

You should see the screen with the text present in the text attribute in the json above

`Well done, you created your first screen with Beagle!`

### [If you want to find out how to debug beagle-react locally check this file](/docs/debug_local.md)

# License
Beagle React is [Apache licensed](https://github.com/ZupIT/beagle-web-react/blob/master/LICENSE)
