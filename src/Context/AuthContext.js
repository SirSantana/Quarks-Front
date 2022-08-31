import { gql, useLazyQuery, useQuery } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, createContext, useEffect}from 'react';


export const AuthContext = createContext({
    user:undefined,
    login:()=>{},
    logout:()=>{}
})
export const GET_USER = gql`
query getUser{
  getUser{
        email
        name
        role
        id
        vehiculos

    }
  }
` 

export function AuthProvider({children}){
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
  const {loading, data, error} = useQuery(GET_USER)
    const login=(data)=>{
        setUser(data)
    }
    
    const logout = ()=>{
    setUser(null)
    }
    const getUser = async () => {
        try {
          const userData = JSON.parse(await AsyncStorage.getItem("token"))
          setUser(userData)
        } catch (error) {
         console.log(error); 
        }
      };
    useEffect(()=>{
         getUser()
    },[])
    const valueContext={
        user,
        login, logout
    }
    return(
        <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
    )
}