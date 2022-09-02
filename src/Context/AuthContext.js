import { gql, useLazyQuery, useQuery } from '@apollo/client';
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
            name
            email
            vehiculos{
                tipo
                referencia
                modelo
                marca
                cilindraje
                imagen
            }
        }
    }
`

export function AuthProvider({children}){
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const result = useQuery(GET_USER)
    const login=(dataa)=>{
        setUser(result?.data?.getUser)
    }
    const logout = ()=>{
    setUser(null)
    }
    const getUser = async () => {
        try {
            console.log('res', result?.data);
          setUser(result?.data?.getUser)
        } catch (error) {
         console.log(error); 
        }
      };
    useEffect(()=>{
         getUser()
    },[result])
    const valueContext={
        user,
        login, logout
    }
    return(
        <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
    )
}