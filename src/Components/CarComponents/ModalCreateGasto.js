import {View, Text, StyleSheet, Pressable,Image,Modal,FlatList,  TextInput, TouchableOpacity, } from 'react-native'
import { Theme } from '../../theme';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

let tiposGastos = [
    {tipo:'Lavada', icon:"local-car-wash"},
    {tipo:'Tanqueada', icon:"fuel"},
    {tipo:'Repuestos', icon:"car-wrench"},
    {tipo:'Parqueadero', icon:"car-brake-parking"},
    {tipo:'Mantenimiento', icon:"car-repair"},

]
let initialForm ={
    dineroGastado:'',
    fecha:'',
    tipo:'',
    lugar:'',
    foto:'',
    description:''
}
export default function ModalCreateGasto({ setModalVisible2}){
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const [form, setForm] = useState(initialForm)
    const [image, setImage] = useState(null);
    const [moreOptions, setMoreOptions] = useState(false)
const [modalVisible, setModalVisible] = useState(false);
const [tipoGasto,setTipoGasto] = useState("fuel")
  
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

    function Render(item){
        const press=()=>{
          setTipoGasto(item.icon)
          setModalVisible(false)
        }
       
        return(
          <TouchableOpacity onPress={()=>press()} style={{ height:100, margin:10,justifyContent:'center', alignItems:'center', borderRadius:10}}>
              {/* <Image style={{width:40, height:40}} source={item.src}/> */}
              
              {item.icon === 'fuel' || item.icon === 'car-brake-parking' || item.icon === "car-wrench"?
               <MaterialCommunityIcons name={item.icon} size={40} color={Theme.colors.secondary} />
              : <MaterialIcons name={item.icon} size={40} color={Theme.colors.secondary} />}
              
              <Text style={Theme.fonts.descriptionGray}>{item.tipo}</Text>
              </TouchableOpacity>
        )
      }
    return(
        
        <View style={styles.centeredView}>
            <KeyboardAwareScrollView 
    resetScrollToCoords={{ x: 0, y: 0 }}
        keyboardShouldPersistTaps= 'always'
        style= {{marginTop:'20%'}}>
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

            <Text style={Theme.fonts.descriptionGray}>Tipo</Text>
            <Pressable onPress={()=> setModalVisible(true)} style={{backgroundColor:'white', width:'100%', height:50, paddingHorizontal:5, alignItems:'center', flexDirection:'row', justifyContent:'space-between', marginBottom:10}}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
            {tipoGasto === 'fuel' || tipoGasto === 'car-brake-parking' || tipoGasto === "car-wrench"?
           <MaterialCommunityIcons name={tipoGasto} size={30} color='#1b333d' />
          : <MaterialIcons name={tipoGasto} size={30} color='#1b333d' />}
          
            <Text style={[Theme.fonts.descriptionGray,{marginLeft:10}]}>{tiposGastos.map(el=> el.icon === tipoGasto && el.tipo)}</Text>
            </View>
          <Image    style={{width:25, height:25,transform: [{rotate: modalVisible ? '0deg': '180deg'}]}} source={require('../../../assets/iconTriangule.png')}/>
            
            </Pressable>


            <Text style={Theme.fonts.descriptionGray}>Fecha</Text>
            <Pressable onPress={showDatePicker} style={{backgroundColor:'white', width:'100%', height:50, paddingHorizontal:10, alignItems:'center', flexDirection:'row', marginBottom:10}}>
            <Fontisto name="date" size={24} color="#1b333d" />
            <Text style={[Theme.fonts.descriptionGray,{marginLeft:10}]}>{selectedDate ? selectedDate.toLocaleDateString() : 'No date selected'}</Text>
            <DateTimePickerModal
                    date={selectedDate}
                    isVisible={datePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    /> 
            </Pressable>


            <Text style={Theme.fonts.descriptionGray}>Dinero Gastado</Text>
            <Pressable style={{backgroundColor:'white', width:'100%', height:50, paddingHorizontal:5, alignItems:'center', flexDirection:'row', marginBottom:10}}>
            <MaterialIcons name="attach-money" size={30} color="black" />
            <TextInput style={[Theme.fonts.descriptionGray,{width:'90%'}]} onChangeText={(text)=> setForm({...form, dineroGastado:text})} />
            </Pressable>

                
                
                    <Pressable onPress={()=> setMoreOptions(!moreOptions)} style={{marginBottom:10, flexDirection:'row', alignItems:'center'}}>
                    <Text style={[Theme.fonts.descriptionGray, { fontSize:18}]}>Mas opciones</Text>
                    <Image    style={{width:20,marginLeft:10, height:20,transform: [{rotate: moreOptions ? '0deg': '180deg'}]}} source={require('../../../assets/iconTriangule.png')}/>

                    </Pressable>

            {moreOptions &&
            <>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between',marginBottom:10}}>
            {image ? <Image source={{ uri: image }} style={{ width: 50, height: 50, marginRight:20 }} />
            : <MaterialIcons name="photo-camera" size={24} color="#1b333d" style={{marginLeft:10}} />}
        <Pressable onPress={pickImage}>
            <Text style={Theme.fonts.descriptionBlue}>{image? "Cambiar":"Agregar Recibo/Factura" }</Text>
        </Pressable>
        
            {image && <AntDesign name="close" size={24} color={Theme.colors.primary} onPress={()=> setImage(null)} />}
            </View>

            <Text style={Theme.fonts.descriptionGray}>Tienda</Text>
            <Pressable style={{backgroundColor:'white', width:'100%', height:50, paddingHorizontal:5, alignItems:'center', flexDirection:'row', marginBottom:10}}>
            <FontAwesome5 name="store" size={20} color="#1b333d" style={{marginLeft:5}}/>
            <TextInput multiline style={[Theme.fonts.descriptionGray,{width:'80%', marginHorizontal:10}]} onChangeText={(text)=> setForm({...form, description:text})} />
            </Pressable>

            <Text style={Theme.fonts.descriptionGray}>Descripcion</Text>
            <Pressable style={{backgroundColor:'white', width:'100%', height:80, paddingHorizontal:5, alignItems:'center', flexDirection:'row', marginBottom:20}}>
            <AntDesign name="filetext1" size={24} color="#1b333d" style={{marginLeft:5}}/>
            <TextInput multiline style={[Theme.fonts.descriptionGray,{width:'80%', marginHorizontal:10}]} onChangeText={(text)=> setForm({...form, description:text})} />
            </Pressable>
            </>

            }
            
            

            <Pressable
              style={Theme.buttons.primary}
              onPress={() => setModalVisible2(false)}
            >
              <Text style={{color:'white', fontSize:18, fontWeight:"600"}}>Hide Modal</Text>
            </Pressable>

            <Modal
        animationType="fade"
        transparent={true}
            style={{backgroundColor:'rgba(0,0,0,0.5)'}}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
          
        <Pressable onPress={()=> setModalVisible(false)} style={styles.centeredView}>
        
          <View style={styles.modalView2}>
          <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
          <Image  style={{width:50, height:50}} source={require('../../../assets/QuarksSpeak1.png')}/>
          <Text style={[Theme.fonts.descriptionGray,{marginTop:20}]}>Selecciona el tipo de gasto</Text>
          </View>
          <FlatList
            horizontal
            style={{width:'100%'}}
            renderItem={({ item })=> Render(item) }
            data={tiposGastos}
            />
          </View>
          </Pressable>
        
      </Modal>
          </View>
        </KeyboardAwareScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
      justifyContent: "center",
      backgroundColor:'rgba(0,0,0,0.5)',
      height:'100%',
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
    modalView2: {
   
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        position: "absolute",
        bottom: 0,
        height: 150,
        paddingHorizontal:10,
        width:'100%',
        borderTopLeftRadius: 20,
        alignItems: "center",
        borderTopRightRadius: 20,
        backgroundColor: "#f3f3f3",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
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