import { gql, useQuery } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, createContext, useEffect}from 'react';


export const AuthContext = createContext({
    user:undefined,
    login:()=>{},
    logout:()=>{}
})
const GET_USER = gql`
query getUser{
  getUser{
        email
        name
        role
    }
  }
` 

export function AuthProvider({children}){
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    AsyncStorage.getItem('token').then(res=> setToken(res))
  const {loading, data, error} = useQuery(GET_USER)
    console.log('dataaa', data);

    const login=(userData)=>{
        setUser(data?.getUser)
    }
    const logout = ()=>{
    AsyncStorage.removeItem('token').then(res=> setToken(null))
    setUser(null)
    }
    useEffect(()=>{
        if(token!== null){
        setUser(data?.getUser)
            
        }else{
        setUser(null)

        }
    },[data])
    const valueContext={
        user,
        login, logout
    }
    return(
        <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
    )
}