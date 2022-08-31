import { View, Text, Image, SafeAreaView, Pressable} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Theme } from '../../theme'
import { useNavigation } from '@react-navigation/native'
import { gql, useLazyQuery, useQuery } from '@apollo/client'
import useAuth from '../../hooks/useAuth'


const GET_CAR = gql`
query getCar($id: ID) {
  getCar(id:$id)
  tipo
  referencia
  modelo
  cilindraje
  marca
  imagen
  user {
    name
    email
  }
}
`


export const CarScreen=(props) =>{
    const navigation = useNavigation()
    const [getCar,{data, error}] = useLazyQuery(GET_CAR)
    const {user} = useAuth()
  console.log(user?.id,'userrrr');
  
  useEffect(()=>{
    // getCar({variables:user.id})

  },[user])
  const handleCreate=(tipo)=>{
    if(user){
      navigation.navigate('Creando mi Vehiculo',{tipo:tipo})
    }
    else{
      return navigation.navigate('Profile')
    }
  }

  return (
    <SafeAreaView style={Theme.containers.containerParent}>
          <Image style={{width:40, height:40, marginBottom:20}} source={require('../../../assets/LogoQuarks1PNG.png')}/>
        
     
        {/* <Text>Ya tienen un vehiculo</Text> */}
    <>
    <Text style={[Theme.fonts.titleBlue,{width:'80%'}]}>Crea tu vehiculo y empieza a llevar la contabilidad</Text>
      <View style={{flexDirection:'row', justifyContent:'space-between', width:'60%', marginTop:20}}>
          <Pressable onPress={()=>handleCreate('Carro')} style={{backgroundColor:Theme.colors.primary, width:100, height:100, justifyContent:'center', alignItems:'center', borderRadius:10}}>
          <Image style={{width:80, height:80}} source={require('../../../assets/carroBlanco.png')}/>
            
          </Pressable>
          <Pressable onPress={()=>handleCreate("Moto")}
           style={{backgroundColor:Theme.colors.primary, width:100, height:100, justifyContent:'center', alignItems:'center', borderRadius:10}}>
          <Image style={{width:80, height:80}} source={require('../../../assets/motoBlanca.png')}/>
                
          </Pressable>
      </View>
    </>
    </SafeAreaView>
  )
}