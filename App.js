import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {ApolloProvider} from '@apollo/client'
import { client } from './apollo';
import { Navigation } from './src/navigation';
import { AuthProvider } from './src/Context/AuthContext';
export default function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
      <Navigation/>
        </AuthProvider> 
    </ApolloProvider>

  );
}

