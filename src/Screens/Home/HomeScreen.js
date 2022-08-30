import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, SafeAreaView, Text, Pressable, Image } from "react-native";
import useAuth from "../../hooks/useAuth";
import { Theme } from "../../theme";

export const HomeScreen = () => {
  const [token, setToken] = useState(null)
  const {user} = useAuth()
  console.log('user',user);
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
          <Image style={{width:40, height:40, marginBottom:20}} source={require('../../../assets/LogoQuarks1PNG.png')}/>
      
      <View
        style={{
          width: "80%",
          alignItems: "center",
          padding: 20,
          backgroundColor: Theme.colors.primary,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            fontWeight: "700",
            color: "white",
            fontSize: 30,
            marginBottom: 20,
          }}
        >
          Hola!
        </Text>
        <Text style={Theme.fonts.description}>
          ¡Te presentamos la manera de llevar los gastos de tu vehiculo!
        </Text>
        <Pressable
          style={Theme.buttons.primary}
          onPress={handleContinue}
        >
          <Text style={Theme.fonts.titleWhite}>
            {user ?  "Continuar" : "Registrate"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};
