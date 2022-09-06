import {View, Text, StyleSheet, Pressable,Image,  TextInput,TouchableHighlight, TouchableOpacity, Button} from 'react-native'
import { Theme } from '../../theme';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
let tiposGastos = [
    {tipo:'Lavada', icon:"local-car-wash"},
    {tipo:'Tanqueada', icon:"fuel"},
    {tipo:'Repuestos', icon:"car-wrench"},
    {tipo:'Parqueadero', icon:"car-brake-parking"},
    {tipo:'Mantenimiento', icon:"car-repair"},

]

export default function ModalCreateGasto({tipoGasto, setModalVisible2}){
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const [image, setImage] = useState(null);
  
    const showDatePicker = () => {
      setDatePickerVisible(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisible(false);
    };
  
    const handleConfirm = (date) => {
      setSelectedDate(date);
      hideDatePicker();
    };
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          quality: 1,
          base64:true
        });
    
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
      };
    return(
            
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:20}}>
            <View>
            <Text style={Theme.fonts.titleBlue}>Añade tu {tiposGastos.map(el=> el.icon === tipoGasto && el.tipo)}</Text>
            <Text style={[Theme.fonts.descriptionGray,{lineHeight:18}]}>Completa los datos</Text>
            </View>
            {tipoGasto === 'fuel' || tipoGasto === 'car-brake-parking' || tipoGasto === "car-wrench"?
           <MaterialCommunityIcons name={tipoGasto} size={40} color='#1b333d' />
          : <MaterialIcons name={tipoGasto} size={40} color='#1b333d' />}
            
            </View>
            
            <View style={{flexDirection:'row', alignItems:'center',marginBottom:10, justifyContent:'space-between'}}>
                <Text style={Theme.fonts.descriptionBlue}>
                    {selectedDate ? selectedDate.toLocaleDateString() : 'No date selected'}
                </Text>
                <Text onPress={showDatePicker} style={Theme.fonts.descriptionBlue}>{selectedDate ? 'Cambia la fecha' : 'Agrega una fecha'}</Text>
                </View>
                    <DateTimePickerModal
                    date={selectedDate}
                    isVisible={datePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    />
            <Text style={Theme.fonts.descriptionGray}>Dinero Gastado</Text>
                <TextInput
                placeholder='80.000'
                style={Theme.input.basic}
                />
                {/* <Text style={Theme.fonts.descriptionGray}>Nombre Establecimiento(Opcional)</Text>

                <TextInput
                placeholder=''
                style={Theme.input.basic}
                /> */}
                
                {/* <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between',marginBottom:10}}>
                {image && <Image source={{ uri: image }} style={{ width: 50, height: 50, marginRight:20 }} />}
            <Pressable onPress={pickImage}>
                <Text style={Theme.fonts.descriptionBlue}>{image? "Cambiar":"Agregar Recibo/Factura" }</Text>
            </Pressable>
            
                {image && <AntDesign name="close" size={24} color={Theme.colors.primary} onPress={()=> setImage(null)} />}
                </View> */}
                
                    <View style={{marginBottom:10, flexDirection:'row'}}>
                    <Text style={[Theme.fonts.descriptionGray, { fontSize:18}]}>Mas opciones</Text>
                        <AntDesign name="caretdown" size={20} color="black" />
                    </View>
                
            <Pressable
              style={Theme.buttons.primary}
              onPress={() => setModalVisible2(false)}
            >
              <Text style={Theme.fonts.titleWhite}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      backgroundColor:'rgba(0,0,0,0.5)'
    },
    modalView: {
        width:'90%',
      margin: 20,
      backgroundColor: "#f3f3f3",
      borderRadius: 20,
      padding: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      // shadowOpacity: 0.25,
      // shadowRadius: 4,
      // elevation: 5
      // position: "absolute",
      // bottom: 0,
      // height: 250,
      // width:'100%',
      // borderTopLeftRadius: 20,
      // justifyContent: "center",
      // alignItems: "center",
      // borderTopRightRadius: 20,
      // backgroundColor: "white"
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "red",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
        color:'red',
      marginBottom: 15,
      textAlign: "center"
    }
  });