import { gql, useQuery } from '@apollo/client'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import useAuth from '../../hooks/useAuth'
import { Theme } from '../../theme'


export const ProfileScreen = () => {
  const navigation = useNavigation()
  const{user, logout} = useAuth()

  const handleLogout=()=>{
    AsyncStorage.clear().then(()=> navigation.navigate('SignIn')).then(()=> logout())
  }
  AsyncStorage.getItem('token').then(res=> console.log(res))
  return (
    <View style={Theme.containers.containerParent}>
      <View style={Theme.containers.containerFlex}>
      <Text>ProfileScreen</Text>
      {user && <Text style={Theme.fonts.titleRed}>Bienvenido {user?.name}</Text>}
        {user && <Text style={Theme.fonts.titleRed}>Email {user?.email}</Text>}
        {user && <Text style={Theme.fonts.titleRed}>Status {user?.role}</Text>}

      </View>
      <View style={{width:'90%'}}>
      
      {user?
      <Pressable
      onPress={handleLogout}
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
