import React from 'react';
import { BeagleProvider, BeagleRemoteView } from '@zup-it/beagle-react';
import BeagleService from '../beagle/beagle-service';

function Home() {
  return (
    <BeagleProvider value={BeagleService}>
      <BeagleRemoteView path={'/payload.json'} />
    </BeagleProvider>
  );
}

export default Home;