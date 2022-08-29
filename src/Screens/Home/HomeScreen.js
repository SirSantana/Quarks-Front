import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, SafeAreaView, Text, Pressable } from "react-native";
import { Theme } from "../../theme";

export const HomeScreen = () => {
  const [token, setToken] = useState(null)
  const navigation = useNavigation()
  useEffect(()=>{
    AsyncStorage.getItem('token').then(res=> setToken(res))
  },[])

  const handleContinue=()=>{
    if(token){
      console.warn('Bien!');
    }else{
      navigation.navigate('SignIn')
    }
  }
  return (
    <SafeAreaView style={Theme.containers.containerParent}>
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
          style={Theme.buttons.secondary}
          onPress={handleContinue}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>
            {token ?  "Continuar" : "Registrate"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};
