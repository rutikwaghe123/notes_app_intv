import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootNavigationProps } from '../AppNavigator'

//getting navigation props from stacknavigation
interface MyProps {
  navigation: NativeStackNavigationProp<RootNavigationProps, 'Splash'>
}

const Splash = ({ navigation }: MyProps) => {

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login')
    }, 1000);
  }, [])

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontWeight: "bold", fontSize: 24 }}>Notes App</Text>
    </View>
  )
}

export default Splash