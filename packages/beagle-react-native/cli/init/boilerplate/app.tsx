import React from 'react'
import { SafeAreaView } from 'react-native'
import { BeagleProvider, BeagleRemoteView } from '@zup-it/beagle-react-native'
import BeagleService from './beagle/beagle-service'

function App() {
  return (
    <BeagleProvider value={BeagleService}>
      <SafeAreaView style={{ height: '100%' }}>
        <BeagleRemoteView route={'/welcome'} />
      </SafeAreaView>
    </BeagleProvider>
  )
}

export default App
