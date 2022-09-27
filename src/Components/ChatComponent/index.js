import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { View, Text, ScrollView, SafeAreaView, Dimensions, FlatList, Image } from "react-native";
import { Theme } from "../../theme";
import { Ionicons } from '@expo/vector-icons'; 
import { TextInput } from "react-native-paper";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { FontAwesome5 } from '@expo/vector-icons';
import { timeSince } from "../../utils/actions";

let mensajes = [
    {titulo:'Hola buenas, alguien sabe por que sale humo blanco?',
    nombre:'Harry Potter',
    fecha:new Date()
    },{
        titulo:'Hola Buen dia, eso se puede deber por varias razones',
        nombre:'James Rodriguez',
        fecha:new Date() 
    },
    {
    titulo:'Si, James tiene razon',
    nombre:'Miguel Salazar',
    fecha:new Date()
    }
]

export default function ChatComponent(){
  const navigation = useNavigation()
    const {height, width} = Dimensions.get('window')
    useLayoutEffect(()=>{
          navigation.setOptions({
            // headerRight:()=>(
            //   <Button
            //   onPress={()=> navigation.navigate('Creando mi Vehiculo',{tipo:item?.tipo, itemData:item})}
            //   title='Editar'
            //   />
            // ),
            title:'Grupo Mazda'
          })
      },[])
      const renderItem=(item)=>{
        console.log(item);
        const interval = timeSince(item?.fecha)
        return(
            <View style={{flexDirection:'row', width:width, padding:10, justifyContent:'center', alignItems:'center'}}>
              {item.nombre === 'Miguel Salazar' ?
              <>
                    <View style={{backgroundColor:'#f1f1fb',borderRadius:20,padding:10, width:'85%', marginRight:10}}>
                      <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                      <Text style={Theme.fonts.descriptionBlue}>Tú</Text>
                      <Text style={Theme.fonts.descriptionGray}>{interval}</Text>
                      </View>
                      <Text>{item.titulo}</Text>
                    </View>
                    <View style={{backgroundColor:'#b1b1b1',width:40,borderRadius:50, height:40, alignItems:'center', justifyContent:'center'}}>
              <FontAwesome5  name={'user-alt'} size={15} color={"white"} />
                    </View></>
            :
            <>
            <View style={{backgroundColor:'#b1b1b1',width:40,borderRadius:50, height:40, alignItems:'center', justifyContent:'center'}}>
          <FontAwesome5  name={'user-alt'} size={15} color={"white"} />
                </View>
                <View style={{backgroundColor:'#f1f1fb',borderRadius:20,padding:10, width:'85%', marginLeft:10}}>
                  <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <Text style={Theme.fonts.descriptionBlue}>{item.nombre}</Text>
                  <Text style={Theme.fonts.descriptionGray}>{interval}</Text>
                  </View>
                  <Text>{item.titulo}</Text>
                </View>
                </>}
            </View>

        )
      }
    return(
        
            <View style={[Theme.containers.containerParent,{height:'100%', backgroundColor:'white'}]}>
            <Text>Bienvenido a la comunidad</Text>
            <FlatList
            style={{ flexDirection:'column'}}
            renderItem={({item})=>renderItem(item)}
            data={mensajes}
            /> 
            <View style={{position:'absolute',paddingHorizontal:10, borderRadius:20,flexDirection:'row',justifyContent:'space-between', alignItems:'center', bottom:0,height:50, width:'100%',backgroundColor:'#f1f1fb'}}>
            <TextInput
            placeholder={"Escribe algo..."}
            style={{width:'80%', backgroundColor:'#f1f1fb', height:50, textDecorationLine:'none', lineHeight:'none'}}
            />
            <Ionicons name="send" size={24} color={Theme.colors.secondary} />
            </View>
            </View>
            
    )
}