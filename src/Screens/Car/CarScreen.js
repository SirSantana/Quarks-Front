import { View, Text, Image, SafeAreaView, Pressable} from 'react-native'
import React from 'react'
import { Theme } from '../../theme'
import { useNavigation } from '@react-navigation/native'

export const CarScreen=() =>{
    const navigation = useNavigation()
  return (
    <SafeAreaView style={Theme.containers.containerParent}>
          <Image style={{width:40, height:40, marginBottom:20}} source={require('../../../assets/LogoQuarks1PNG.png')}/>
        
      <Text style={Theme.fonts.titleBlue}>Crea tu vehiculo y empieza a llevar la contabilidad</Text>
      <View style={{flexDirection:'row', justifyContent:'space-between', width:'60%', marginTop:20}}>
          <Pressable onPress={()=>navigation.navigate('Creando mi Vehiculo',{tipo:'Carro'})} style={{backgroundColor:Theme.colors.primary, width:100, height:100, justifyContent:'center', alignItems:'center', borderRadius:10}}>
          <Image style={{width:80, height:80}} source={require('../../../assets/carroBlanco.png')}/>
            
          </Pressable>
          <Pressable onPress={()=>navigation.navigate('Creando mi Vehiculo',{tipo:'Moto'})}
           style={{backgroundColor:Theme.colors.primary, width:100, height:100, justifyContent:'center', alignItems:'center', borderRadius:10}}>
          <Image style={{width:80, height:80}} source={require('../../../assets/motoBlanca.png')}/>
                
          </Pressable>
      </View>
    </SafeAreaView>
  )
}