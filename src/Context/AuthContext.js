import { gql, useLazyQuery, useQuery } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, createContext, useEffect}from 'react';
import { client } from '../../apollo';
import { GET_USER } from '../graphql/querys';


export const AuthContext = createContext({
    user:undefined,
    login:()=>{},
    logout:()=>{}
})


export function AuthProvider({children}){
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const result = useQuery(GET_USER)

    const login=(dataa)=>{
        if(result?.data?.getUser){
            setUser(result?.data?.getUser)
        }
    }
    const logout = ()=>{
    setUser(null)
    
    }
    const getUser = async () => {
        try {
          setUser(result?.data?.getUser)
        } catch (error) {
         console.log(error); 
        }
      };
    useEffect(()=>{
         getUser()
         if(!token){
            client.resetStore()
         }
    },[result, token])
    const valueContext={
        user,
        login, logout
    }
    return(
        <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
    )
}