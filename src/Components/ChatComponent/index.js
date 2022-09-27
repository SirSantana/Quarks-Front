import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { View, Text, ScrollView, SafeAreaView, Dimensions, FlatList, Image, KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import { Theme } from "../../theme";
import { Ionicons } from '@expo/vector-icons'; 
import { TextInput } from "react-native-paper";
import { KeyboardAwareFlatList, KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { FontAwesome5 } from '@expo/vector-icons';
import { timeSince } from "../../utils/actions";

let mensajes = [
    {titulo:'Hola buenas, alguien sabe por que sale humo blanco?',
    nombre:'Harry Potter',
    fecha:new Date(),
    status:'Pro'
    },{
        titulo:'Hola Buen dia, eso se puede deber por varias razones',
        nombre:'James Rodriguez',
        fecha:new Date(),
        
    },
    {
    titulo:'Si, James tiene razon',
    nombre:'Miguel Salazar',
    fecha:new Date(),
    status:'Pro'

    },
    {titulo:'Hola buenas, alguien sabe por que sale humo blanco?',
    nombre:'Harry Potter',
    fecha:new Date(),
    status:'Contribuidor'

    },{
        titulo:'Hola Buen dia, eso se puede deber por varias razones',
        nombre:'James Rodriguez',
        fecha:new Date(),
    status:'Vendedor'

    },
    {
    titulo:'Si, James tiene razon',
    nombre:'Miguel Salazar',
    fecha:new Date(),
    status:'Maestro'

    },
    {titulo:'Hola buenas, alguien sabe por que sale humo blanco?',
    nombre:'Harry Potter',
    fecha:new Date(),
    status:'Maestro'

    },{
        titulo:'Hola Buen dia, eso se puede deber por varias razones',
        nombre:'James Rodriguez',
        fecha:new Date() 
    },
    {
    titulo:'Si, James tiene razon',
    nombre:'Miguel Salazar',
    fecha:new Date()
    },
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
    },
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
    },
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
    const scrollView = useRef()
    const {height, width} = Dimensions.get('window')
    const [keyboardHeight, setKeyboardHeight] = useState(null)
    const [buttonHeight, setButtonHeight] = useState(50)
    const onKeyboardWillShow = e => {
      setKeyboardHeight(e.endCoordinates.height);
      setButtonHeight(0)
    };
  
    const onKeyboardWillHide = () => {
      setKeyboardHeight(0);
      setButtonHeight(50)

    };
  
    useEffect(() => {
      // These listeners on ios are a little more snappy but not available on Android
      // If you want to use this on Android use keyboardDidShow/Hide
      if (Platform.OS === 'ios') {
        Keyboard.addListener('keyboardWillShow', onKeyboardWillShow);
        Keyboard.addListener('keyboardWillHide', onKeyboardWillHide);
      }
  
      return () => {
        if (Platform.OS === 'ios') {
          Keyboard.removeAllListeners('keyboardWillShow', onKeyboardWillShow);
          Keyboard.removeAllListeners('keyboardWillHide', onKeyboardWillHide);
        }
      };
    }, []);
  

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
            <View  style={{flexDirection:'row', width:width, padding:10, justifyContent:'center', alignItems:'center'}}>
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
            <View  style={{backgroundColor:'#b1b1b1',width:40,borderRadius:50, height:40, alignItems:'center', justifyContent:'center'}}>
          <FontAwesome5  name={'user-alt'} size={15} color={"white"} />
                </View>
                <View style={{backgroundColor:'#f1f1fb',borderRadius:20,padding:10, width:'85%', marginLeft:10}}>
                  <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <View style={{flexDirection:'row'}}>
                  <Text style={Theme.fonts.descriptionBlue}>{item.nombre} - </Text>
                  <Text style={Theme.fonts.descriptionRed}>{item?.status}</Text>
                  </View>
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
            <KeyboardAwareFlatList
            onContentSizeChange={() => scrollView.current.scrollToEnd({ animated: true })}
            ref={scrollView}
            style={{ flexDirection:'column', marginBottom:'15%'}}
            renderItem={({item})=>renderItem(item)}
            data={mensajes}
            /> 

            <View style={{height: Platform.OS === 'ios' 
          ? keyboardHeight + buttonHeight : buttonHeight, 
        position: 'absolute',
        bottom: 0,paddingHorizontal:10,flexDirection:'row',justifyContent:'space-between',alignItems:Platform.OS === 'android' ? 'center': buttonHeight === 50 ? 'center':'flex-start' , width:'100%',backgroundColor:'#ebebeb'}}>
            
            <TextInput
            underlineColor="transparent"
            placeholder={"Escribe algo..."}
            style={{width:'90%',
            height: 40,
            backgroundColor: '#fff',
            paddingHorizontal: 15,
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: 15, 
            fontSize: 16, backgroundColor:'white',}}
            />
            <Ionicons name="send" size={24} color={Theme.colors.secondary} />

            </View>

            </View>
    )
}