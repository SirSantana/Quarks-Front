import { marcasCarros } from './marcasCarros'
import { View, Text,FlatList, TextInput, TouchableOpacity, Image, Pressable, Alert, SafeAreaView, StatusBar, Dimensions  } from "react-native";
import { Theme } from '../../theme';


export default function Vehiculo(item, setCreate){
  const { width,height } = Dimensions.get('window');

        const marca = marcasCarros.find(el=> el.marca === item.marca)
    return(
        <View style={{backgroundColor:Theme.colors.primary, width:300, borderRadius:10, marginRight:40, height:500}}>
          <View style={{height: '80%',
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          }}>

          <Image resizeMode='contain'  style={{position: 'absolute',opacity:.8, tintColor:'rgba(242,241,239,0.8)',
            top: 30,
            right:-50,
            width: width,
            height: 200}} source={require('../../../assets/carroBlanco.png')}/>
          </View>
          <View style={{width:'100%', padding:20, position:'absolute', top:'45%'}}>
          <Text style={{fontSize:40, color:'white', fontWeight:'700'}}>{item.marca}</Text>
          <Text style={{fontSize:40, color:'white', fontWeight:'700', lineHeight:40}}>{item.referencia}</Text>
          <Text style={Theme.fonts.description}>{item.modelo}</Text>

          {/* <Image style={{width:40, height:40, marginBottom:20}} source={marca.src}/> */}
          <Pressable
            // onPress={()=> navigation.navigate('SignIn')}
            style={{width:'100%',backgroundColor:'#1b333d',marginTop:20, height:50, borderRadius:10,justifyContent:'center', alignItems:'center'}}>
                <Text style={{color:'white', fontSize:18, fontWeight:"600"}}>Ver Auto</Text>
        </Pressable>
        <Pressable
            onPress={()=> setCreate(true)}
            style={Theme.buttons.primaryOutlined}>
                <Text style={{color:'white', fontSize:18, fontWeight:"600"}}>Crear otro Vehiculo</Text>
        </Pressable>
          </View>
          
  
          </View>
            )
            
}