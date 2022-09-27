import { useState } from "react";
import { Pressable, View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ChatComponent from "../../Components/ChatComponent";
import { Theme } from "../../theme";



export default function ChatScreen(){
    let [visibleChat, setVisibleChat] = useState(false)
    const {height, width} = Dimensions.get('window')

    return(
        <>
        {visibleChat ? 
            <ChatComponent/>
     :
     <>
     <View style={[Theme.containers.containerParent]}>

        <Pressable onPress={()=> setVisibleChat(true)} style={{width:'90%', backgroundColor:'white',borderRadius:20, alignItems:'center', justifyContent:'center'}}>
        <Image  style={{width:50, height:50}} source={require('../../../assets/Mazda.png')}/>
        <Text style={[Theme.fonts.titleBlue,{marginBottom:20}]}>Normas</Text>
        <View style={{marginBottom:20, padding:20}}>
        <Text style={Theme.fonts.descriptionBlue}>▪ Mantén un lenguaje respetuoso con los demás miembros.</Text>
        <Text style={Theme.fonts.descriptionBlue}>▪ Ten cuidado con aquellas personas que están ofreciendo algo.</Text>
        <Text style={Theme.fonts.descriptionBlue}>▪ Ayuda a los demás con sus inquietudes, esto elevara tu status.</Text>
        <Text style={Theme.fonts.descriptionBlue}>▪ Comparte tus conocimientos con los demás.</Text>
        <Text style={Theme.fonts.descriptionBlue}>▪ Evita el spam.</Text>
        </View>

        <TouchableOpacity onPress={()=> setVisibleChat(true)}  style={[Theme.buttons.primary,{width:'90%'}]}>
            <Text style={Theme.fonts.titleWhite}>Ingresar</Text>
            </TouchableOpacity>
    </Pressable>
    </View>

    </>

      }
</>
    )
        
        
}