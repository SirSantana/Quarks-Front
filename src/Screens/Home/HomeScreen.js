import { gql, useQuery } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, SafeAreaView, Text, Pressable, Image } from "react-native";
import useAuth from "../../hooks/useAuth";
import { Theme } from "../../theme";

const GET_ALL_USERS = gql`
  query getOneUser($id:ID){
    getOneUser(id:$id){
      name
      email
    }

  }
`
const GETBOOK= gql`
  query getBook{
    getBook{
      title
    }
  }  
`

export const HomeScreen = () => {
  const [token, setToken] = useState(null)
  const {user} = useAuth()
  const navigation = useNavigation()
  const result = useQuery(GET_ALL_USERS, {variables:"630fb25c071c802670d63830"})
  const {data} = useQuery(GETBOOK)
  console.log('data',data);
  console.log(result?.data);
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
