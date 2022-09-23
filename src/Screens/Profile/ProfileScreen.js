import { gql, useQuery } from '@apollo/client'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { View, Text, Pressable, BackHandler, Modal,TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native'
import { client } from '../../../apollo'
import EditProfile from '../../Components/Profile/EditProfile'
import Recordatorios from '../../Components/Profile/Recordatorios'
import UserInfo from '../../Components/Profile/UserInfo'
import useAuth from '../../hooks/useAuth'
import { Theme } from '../../theme'
import SignInScreen from './SiginScreen'


export const ProfileScreen = () => {
  const navigation = useNavigation()
  const{user, logout} = useAuth()
  const [visibleEdit, setVisibleEdit] = useState(false)
  const handleLogout=()=>{
    AsyncStorage.clear().then(()=> logout())
  }
  const {height, width} = Dimensions.get('window')
  
  useEffect(()=>{
    console.log('hola');
    if(!user){
      navigation.navigate('SignIn')
    }
  },[user])
  return (
    <ScrollView style={{flexGrow:1}}>
      {user ?
      <>
      <View style={[Theme.containers.containerParent]}>

      <UserInfo user={user}/>

      <TouchableOpacity onPress={()=> setVisibleEdit(true)} style={{width:'90%', height:40,borderRadius:10, backgroundColor:"#b1b1b1", alignItems:'center', justifyContent:'center'}}>
        <Text style={Theme.fonts.description}>Editar Perfil</Text>
      </TouchableOpacity>

      <Modal
         animationType="fade"
         visible={visibleEdit}
         transparent={true}
       >
        <EditProfile user={user} setVisibleEdit={setVisibleEdit}/>
       </Modal>

       <Recordatorios name={user?.name}/>

       <Pressable
      onPress={handleLogout}
      style={{width:'90%',backgroundColor:'#1b333d', height:50, borderRadius:10,justifyContent:'center', alignItems:'center',}}>
          <Text style={{color:'white', fontSize:18, fontWeight:"600"}}>Cerrar Sesion</Text>
      </Pressable>
      </View>

      </>
     :
     <View style={{justifyContent:'center', alignItems:'center', height:height, backgroundColor:'#f1f1fb'}}>

     <Image style={{width:300, height:300}} source={require('../../../assets/Citydriver.png')}/>
     <Text style={[Theme.fonts.titleBlue,{width:'90%', textAlign:'center', fontSize:26}]}>Crea tu Perfil Gratis!</Text>
     <Text style={[Theme.fonts.descriptionGray,{width:'90%', marginBottom:20, textAlign:'center'}]}>No te demoraras mas de 2 minutos.</Text>

     <Pressable onPress={()=>navigation.navigate('SignIn')} style={[Theme.buttons.primary,{width:'90%'}]}>
      <Text style={Theme.fonts.titleWhite}>Registrate</Text>
     </Pressable>

     </View>
      
      }
    
      </ScrollView>
  )
}
