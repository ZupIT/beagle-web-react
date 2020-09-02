/*
  * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *  http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
*/

import React, { FC } from 'react'
import { BeagleTabBarInterface, ItemTitle } from 'common/models'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { removeInvalidCssProperties } from '../../components/utils'
import BeagleImage from '../../components/BeagleImage'


const BeagleTabBar: FC<BeagleTabBarInterface> = props => {
  const { style, onTabSelection, currentTab, items } = props
  const parsedStyles = removeInvalidCssProperties(style ? style : {})

  const changeSelectedTab = (index: number) => {
    if (!onTabSelection) return
    onTabSelection(index)
  }

  const styleSheet = StyleSheet.create({
    fromBffStyles: {
      ...parsedStyles,
    },
    defaultStyles: {
      flex: style && style.flex ? Number(style.flex) : 1,
    },
    tabContainer: {
      width: "100%",
      flexDirection: "row",
      alignContent: "center",
      justifyContent: "flex-start",
      paddingHorizontal: 10,
      height: "12%",
      alignItems: "center",
    },
    tab: {
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center",
      margin: 5
    },
    selectedTab: {
      backgroundColor: "#125285",
      width: "100%",
      height: 3,
      marginTop: 3
    }
  })

  return (
    <View style={styleSheet.tabContainer}>
      {
        items.map((item: ItemTitle, index) => {
          return (
            <TouchableOpacity key={index} onPress={() => changeSelectedTab(index)}>
              <View style={styleSheet.tab}>
                {item.icon && <BeagleImage path={item.icon} style={{ height: "40", width: "40" }}></BeagleImage>}
                <Text>{item.title}</Text>
                {index === currentTab && <View style={styleSheet.selectedTab}></View>}
              </View>
            </TouchableOpacity>
          )
        })
      }
    </View>
  )
}

export default BeagleTabBar
