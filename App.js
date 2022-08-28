import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {ApolloProvider} from '@apollo/client'
import { client } from './apollo';
import { Navigation } from './src/navigation';
export default function App() {
  return (
    <ApolloProvider client={client}>
      <Navigation/>
    </ApolloProvider>

  );
}

