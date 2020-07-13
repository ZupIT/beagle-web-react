import React from 'react';
import './App.css';
import { BeagleProvider, BeagleRemoteView } from '@zup-it/beagle-react';
import BeagleService from './beagle/beagle-service';

function App() {
const windowUrl = window.location.search;
const queryParams = new URLSearchParams(windowUrl);
  return (
    <BeagleProvider value={BeagleService}>
      <BeagleRemoteView path={queryParams.get("path") || ""} />
    </BeagleProvider>
  );
}

export default App;