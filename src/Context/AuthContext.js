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
            name
            email
            vehiculos
        }
    }
`

export function AuthProvider({children}){
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const result = useQuery(GET_USER)
    console.log('us',result.data);

    AsyncStorage.getItem('token').then(res=> setToken(res))
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
            console.log('res', result?.data);
          setUser(result?.data?.getUser)
        } catch (error) {
         console.log(error); 
        }
      };
    useEffect(()=>{
        console.log('hola');
        AsyncStorage.getItem('token').then(res=> setToken(res))
         getUser()
         setUser(result?.data?.getUser)
    },[result, token])
    const valueContext={
        user,
        login, logout
    }
    return(
        <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
    )
}