import { gql, useQuery } from '@apollo/client'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import { Theme } from '../../theme'

const GET_USER = gql`
query getUser{
  getUser{
        email
        name
    }
  }
`  
export const ProfileScreen = () => {
  
  const navigation = useNavigation()
  const [token, setToken] = useState(null)
  const {loading, data, error} = useQuery(GET_USER)
  useEffect(()=>{
    AsyncStorage.getItem('token').then(res=> setToken(res))
  },[])
  console.log('data',data);
  return (
    <View style={Theme.containers.containerParent}>
      <View style={Theme.containers.containerFlex}>
      <Text>ProfileScreen</Text>
        {data && <Text style={Theme.fonts.description}>Bienvenido {data.getUser.name}</Text>}
      </View>
      <View style={{width:'90%'}}>
      {token ?
      <Pressable
      onPress={()=> AsyncStorage.removeItem('token').then(()=>navigation.navigate('SignIn') )}
      style={{width:'100%',backgroundColor:'#1b333d', height:50, borderRadius:10,justifyContent:'center', alignItems:'center'}}>
          <Text style={{color:'white', fontSize:18, fontWeight:"600"}}>Cerrar Sesion</Text>
  </Pressable>
    :
    <Pressable
            onPress={()=> navigation.navigate('SignIn')}
            style={{width:'100%',backgroundColor:'#1b333d', height:50, borderRadius:10,justifyContent:'center', alignItems:'center'}}>
                <Text style={{color:'white', fontSize:18, fontWeight:"600"}}>Iniciar Sesion</Text>
        </Pressable>
    }
      </View>
     
      </View>
  )
}
