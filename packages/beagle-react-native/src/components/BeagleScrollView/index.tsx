import React, { FC } from 'react'
import { BeagleScrollViewInterface } from 'common/models'
import { ScrollView } from 'react-native'

const BeagleScrollView: FC<BeagleScrollViewInterface> = ({
  scrollBarEnabled = true,
  scrollDirection = 'VERTICAL',
  children,
}) => (
  <ScrollView
    showsVerticalScrollIndicator={scrollBarEnabled && scrollDirection === 'VERTICAL'}
    showsHorizontalScrollIndicator={scrollBarEnabled && scrollDirection === 'HORIZONTAL'}
  >
    {children}
  </ScrollView>
)

export default BeagleScrollView
