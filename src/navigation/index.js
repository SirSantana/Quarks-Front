import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { Foundation } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import {CarScreen} from '../Screens/Car/CarScreen'
import { NavigationContainer } from '@react-navigation/native';
import SignInScreen from '../Screens/Profile/SiginScreen';
import { SignUpScreen } from '../Screens/Profile/SignUpScreen';
import { HomeScreen } from '../Screens/Home/HomeScreen';
import { ProfileScreen } from '../Screens/Profile/ProfileScreen';
import FormCreateVehicule from '../Components/CarComponents/FormCreateVehicule';
import VehiculeDataScreen from '../Screens/Car/VehiculeDataScreen';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabBarIcon=({color, name})=>{
  if(name === 'home'){
    return <Foundation name={name} size={24} color={color} />
  }
  if(name=== 'car'|| name ==='user-alt'){
    return <FontAwesome5 name={name} size={24} color={color} />
  }
}

export const Navigation=()=>{
  return(
    <NavigationContainer>
      <Tab.Navigator
        barStyle={{backgroundColor:'white'}} screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={StackHome} options={{tabBarIcon:({color})=><TabBarIcon color={color} name='home'/>}} />
        <Tab.Screen name="Gastos" component={StackCar} options={{tabBarIcon:({color})=><TabBarIcon color={color} name='car'/>}}/>
        <Tab.Screen name="Profile" component={StackProfile} options={{tabBarIcon:({color})=><TabBarIcon color={color} name='user-alt'/>}}/>
      </Tab.Navigator>
    </NavigationContainer>
  )

}

function StackHome() {
    return (
      <Stack.Navigator >
        <Stack.Screen name="Inicio" component={HomeScreen} options={{headerShown:false}}/>
      </Stack.Navigator>
    );
  }
  
function StackProfile() {
      return (
        <Stack.Navigator 
        
        screenOptions={{
          headerShown: true,
          headerStyle: {
            shadowColor: "#000",
            backgroundColor:'red'
          },
          headerTintColor: 'white'}}>
            
          <Stack.Screen name="Perfil" component={ProfileScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />

        </Stack.Navigator>
      );
    }

    function StackCar() {
      return (
        <Stack.Navigator screenOptions={{
          headerStyle: {
            shadowColor: "#000",
            backgroundColor:'#1b333d'
          },headerTintColor: 'white'
          }}>
        <Stack.Screen name="Mi Vehiculo" component={CarScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Creando mi Vehiculo" component={FormCreateVehicule}  />
        <Stack.Screen name="Vehiculo" component={VehiculeDataScreen}/>
        </Stack.Navigator>
      );
    }
// function StackGastos() {
//       return (
//         <Stack.Navigator>
//         </Stack.Navigator>
//       );
//     }
