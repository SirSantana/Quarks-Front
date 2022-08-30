import { View, Text } from 'react-native'
import React from 'react'

export default function FormCreateVehicule({route}) {
    const {tipo} = route.params
    console.log(tipo);
  return (
    <View>
      <Text>FormCreateVehicule</Text>
      
    </View>
  )
}