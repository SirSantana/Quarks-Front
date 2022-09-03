import { marcasCarros } from './marcasCarros'
import { View, Text,FlatList, TextInput, TouchableOpacity, Image, Pressable, Alert, SafeAreaView, StatusBar, Dimensions  } from "react-native";
import { Theme } from '../../theme';


export default function Vehiculo({item}){
  const { width,height } = Dimensions.get('window');
  const marca = marcasCarros.find(el=> el.marca === item.marca)
  console.log(item.modelo);
    return(
        <View style={{backgroundColor:"white", width:300, borderRadius:20, marginRight:20, height:500, }}>
          <View style={{height: '80%',
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          
          }}>

          {item?.imagen
           ?<Image   style={{
             resizeMode:'cover',
             borderRadius:20,
           width: '100%',
           height: 230}} source={{uri:item.imagen}}/>
          :
          <Image resizeMode='contain'  style={{position: 'absolute',opacity:.8, tintColor:'rgba(242,241,239,0.8)',
            top: 30,
            right:-50,
            width: width,
            height: 200}} source={require('../../../assets/carroBlanco.png')}/>}
          </View>
          <View style={{width:'100%', padding:20, position:'absolute', top:'45%'}}>
            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <View>
            <Text style={{fontSize:30, color:Theme.colors.secondary, fontWeight:'700'}}>{item.marca} {item.referencia}</Text>
            {/* <Text style={{fontSize:24, color:Theme.colors.secondary, fontWeight:'500', lineHeight:28}}>{item.referencia}</Text> */}
            </View>
            
            <Image  style={{height: 50, width:50}} source={marca.src}/>

            </View>
            {/* <Text style={Theme.fonts.descriptionBlue}>{item.modelo}</Text> */}


          <View style={{justifyContent:'space-between'}}>
            <View  style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={[Theme.fonts.descriptionBlue,{fontWeight:"600"}]}>Balance</Text>
          <Text style={[Theme.fonts.descriptionBlue,{fontWeight:"600"}]}>$ 100.000</Text>
            </View>
          
          <View style={{backgroundColor:'#f1f1f1'}}>
            
          </View>

          </View>
          </View>
          
  
          </View>

            )
            
}