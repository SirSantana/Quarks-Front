import React from 'react'
import { Theme } from '../../theme'
import {View, Text, TextInput, Pressable, Image} from 'react-native'
import { useNavigation } from '@react-navigation/native'

export const SignUpScreen = () => {
  const navigation = useNavigation()
    

    return(
        <View style={Theme.containers.containerParent}>
          <Image style={{width:40, height:40}} source={require('../../../assets/LogoQuarks1PNG.png')}/>
          <Text style={{fontSize:30, fontWeight:"700", color:'#f50057' }}>Registrate</Text>

          <View style={{width:'90%', marginTop:20}}>


          <TextInput
            placeholder='Nombre'
            style={Theme.input.basic}
            />
            <TextInput
            placeholder='Email'
            style={Theme.input.basic}

            />
            <TextInput
            placeholder='Password'
            secureTextEntry
            style={Theme.input.basic}
            
            />
            <Pressable
            style={{width:'100%',backgroundColor:'#1b333d', height:50, borderRadius:10,justifyContent:'center', alignItems:'center'}}>
                <Text style={{color:'white', fontSize:18, fontWeight:"600"}}>Registrate</Text>
            </Pressable>
            <Pressable
            onPress={()=> navigation.navigate('SignIn')}
            style={{width:'100%', height:50, borderRadius:10,justifyContent:'center', alignItems:'center'}}>
                <Text style={{color:'#1b333d', fontSize:18, fontWeight:"600"}}>Ya tienes una cuenta? Inicia Sesion</Text>
            </Pressable>
          </View>
            
           
        </View>
    )
}
