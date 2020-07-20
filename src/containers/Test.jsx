import React from 'react';
import { BeagleProvider, BeagleRemoteView } from '@zup-it/beagle-react';
import BeagleService from '../beagle/beagle-service';

function Test() {
  return (
    <BeagleProvider value={BeagleService}>
      <BeagleRemoteView path={'/test.json'} />
    </BeagleProvider>
  );
}

export default Test;