import { gql, useQuery } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, SafeAreaView, Text, Pressable, Image, Button } from "react-native";
import useAuth from "../../hooks/useAuth";
import { Theme } from "../../theme";




export const HomeScreen = () => {
  const [token, setToken] = useState(null)
  const {user} = useAuth()
  const navigation = useNavigation()
  const handleContinue=()=>{
    if(token){
      console.warn('Bien!');
    }else{
      navigation.navigate('Profile')
    }
  }
  return (
    <SafeAreaView style={Theme.containers.containerParent}>
          <Image style={{width:'100%', height:'70%', marginBottom:'5%'}} source={require('../../../assets/ComunityImage.png')}/>
          <Text style={[Theme.fonts.titleBlue,{width:'90%', textAlign:'center', fontSize:26}]}>Bienvenido a la Comunidad</Text>
          <Text style={[Theme.fonts.descriptionGray,{width:'90%', marginBottom:20, textAlign:'center'}]}>Aqui podras colocar tus dudas, y compartir con los demas, pasala bien!</Text>

          <Pressable onPress={()=>navigation.navigate('SignIn')} style={[Theme.buttons.primary,{width:'90%'}]}>
            <Text style={Theme.fonts.titleWhite}>Vamos allá!</Text>
          </Pressable>
        
    </SafeAreaView>
  );
};
