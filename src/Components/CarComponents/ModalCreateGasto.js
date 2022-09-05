import {View, Text, StyleSheet, Pressable,Image,  TextInput,TouchableHighlight, TouchableOpacity, Button} from 'react-native'
import { Theme } from '../../theme';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

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
            <Text style={Theme.fonts.titleBlue}>Añade tu Tanqueada</Text>
            <Text style={[Theme.fonts.descriptionGray,{lineHeight:16}]}>Agrega tu tanqueada</Text>
            </View>
            {tipoGasto === 'fuel' || tipoGasto === 'car-brake-parking' || tipoGasto === "car-wrench"?
           <MaterialCommunityIcons name={tipoGasto} size={40} color='#1b333d' />
          : <MaterialIcons name={tipoGasto} size={40} color='#1b333d' />}
            
            </View>
            
            
            <Text style={Theme.fonts.descriptionGray}>Dinero Gastado</Text>
                <TextInput
                placeholder='80.000'
                style={Theme.input.basic}
                />
                <Text style={Theme.fonts.descriptionGray}>Nombre Establecimiento(Opcional)</Text>

                <TextInput
                placeholder=''
                style={Theme.input.basic}
                />
                
                {image && <Image source={{ uri: image }} style={{ width: 50, height: 50 }} />}
            <Pressable onPress={pickImage} style={{width:'50%'}}>
                <Text style={{color:'#f50057', fontSize:18, fontWeight:"600"}}>{image? "Cambiar Imagen":"Agregar Imagen" }</Text>
            </Pressable>
                <Text style={Theme.fonts.descriptionGray}>
                    {selectedDate ? selectedDate.toLocaleDateString() : 'No date selected'}
                </Text>
                    <Button title="Select a date" onPress={showDatePicker} style={{backgroundColor:'red'}}/>
                    <DateTimePickerModal
                    date={selectedDate}
                    isVisible={datePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible2(false)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      marginTop: 22,
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