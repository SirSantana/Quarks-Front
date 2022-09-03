import { View, Text } from 'react-native'
import React from 'react'

export default function VehiculeDataScreen({route}) {
    const {id} = route.params
    console.log('id',id);
  return (
    <View>
      <Text>VehiculeDataScreen</Text>
    </View>
  )
}