import { gql, useQuery } from '@apollo/client'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { View, Text, Pressable, BackHandler, Modal } from 'react-native'
import { client } from '../../../apollo'
import EditProfile from '../../Components/Profile/EditProfile'
import UserInfo from '../../Components/Profile/UserInfo'
import useAuth from '../../hooks/useAuth'
import { Theme } from '../../theme'


export const ProfileScreen = () => {
  const navigation = useNavigation()
  const{user, logout} = useAuth()
  const [visibleEdit, setVisibleEdit] = useState(false)
  const handleLogout=()=>{
    AsyncStorage.clear().then(()=> logout())
  }
  return (
    <View style={[Theme.containers.containerParent,{justifyContent:null}]}>

      <UserInfo user={user}/>
      <Pressable onPress={()=> setVisibleEdit(true)} style={{width:'90%', height:40,borderRadius:10, backgroundColor:"#b1b1b1", alignItems:'center', justifyContent:'center'}}>
        <Text style={Theme.fonts.description}>Editar Perfil</Text>
      </Pressable>

      <Modal
         animationType="fade"
         visible={visibleEdit}
         
         transparent={true}
       >
        <EditProfile user={user} setVisibleEdit={setVisibleEdit}/>
       </Modal>
      
      {/* <View style={Theme.containers.containerFlex}>
      <Text>ProfileScre</Text>
      {user && <Text style={Theme.fonts.titleRed}>Bienvenido {user?.name}</Text>}
        {user && <Text style={Theme.fonts.titleRed}>Email {user?.email}</Text>}
        {user && <Text style={Theme.fonts.titleRed}>Status {user?.role}</Text>}

      </View> */}
      {/* <View style={{width:'90%'}}>
      
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
      </View> */}
     
      </View>
  )
}
