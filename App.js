import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {ApolloProvider} from '@apollo/client'
import { client } from './apollo';
import { Navigation } from './src/navigation';
import { AuthProvider } from './src/Context/AuthContext';
import { getToken } from './src/utils/actions';
import {useState, useEffect} from 'react'
export default function App() {

  // const [expoPushToken, setExpoPushToken] = useState('');
  // useEffect(()=>{
  //   getToken().then(token=>setExpoPushToken(token))
  // },[])

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
      <Navigation/>
        </AuthProvider> 
    </ApolloProvider>

  );
}

