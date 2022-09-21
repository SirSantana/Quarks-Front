import {Modal, View, Text, StyleSheet, Pressable, TextInput, Image, Alert, Dimensions,TouchableOpacity} from 'react-native'
import { Theme } from '../../theme';
import {useState, useEffect} from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Fontisto } from '@expo/vector-icons';
import { gql, useMutation, useQuery } from '@apollo/client'
import ModalCargando from '../../utils/ModalCargando';
import { GET_RECORDATORIO, GET_RECORDATORIOS } from './Recordatorios';


const CREATE_RECORDATORIO = gql`
    mutation createRecordatorio($titulo:String, $description:String, $fecha:Date){
        createRecordatorio(input:{titulo:$titulo, description:$description, fecha:$fecha}){
            titulo
            description
            fecha
            id
        }
    }
`

const initialForm={
    titulo:"",
    description:"",
    fecha:"",
}

export default function FormRecordatorio({setVisibleCreate, name}){
    const { width,height } = Dimensions.get('window');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const [form, setForm] = useState(initialForm)
    const [createRecordatorio, {loading, data, error}] = useMutation(CREATE_RECORDATORIO, {refetchQueries:[{query:GET_RECORDATORIOS}]})
    const showDatePicker = () => {
        setDatePickerVisible(true);
      };
    
      const hideDatePicker = () => {
        setDatePickerVisible(false);
      };
    
      const handleConfirm = (date) => {
        setSelectedDate(date);
        setForm({...form, fecha:date})
        hideDatePicker();
      };
    
      const handleCreate= ()=>{
        createRecordatorio({variables:form})
      }
      if(error){
        Alert.alert(error)
      }
      useEffect(()=>{
        if(data){
          return setVisibleCreate(false)
        }
      },[data])
    return(
        <KeyboardAwareScrollView 
    resetScrollToCoords={{ x: 0, y: 0 }}
        keyboardShouldPersistTaps= 'always'
        >

        <Pressable onPress={()=> setVisibleCreate(false)} style={[styles.centeredView,{height:height, justifyContent:'center'}]}>

          <View style={styles.modalView}>
          <View style={{flexDirection:'column', justifyContent:'space-between', marginBottom:20}}>
            <Text style={Theme.fonts.titleBlue}>Hola {name}!</Text>
            <Text style={[Theme.fonts.descriptionGray,{lineHeight:18}]}>Crea tu Recordatorio, nosotros de avisaremos con 5 dias de anticipacion</Text>
            </View>

           
            <Text style={[Theme.fonts.descriptionGray,{textAlign:'left'}]}>Titulo</Text>
            <Pressable style={{backgroundColor:'white', width:'100%', height:50, paddingHorizontal:5, alignItems:'center', flexDirection:'row', marginBottom:10}}>
            {/* <FontAwesome5 name="store" size={20} color="#1b333d" style={{marginLeft:5}}/> */}
            <TextInput onChangeText={(text)=> setForm({...form, titulo:text})} placeholder={"Bogotá"} multiline style={[Theme.fonts.descriptionGray,{width:'80%', marginHorizontal:10}]}  />
            </Pressable>

            <Text style={[Theme.fonts.descriptionGray,{textAlign:'left'}]}>Descripcion</Text>
            <Pressable style={{backgroundColor:'white', width:'100%', height:50, paddingHorizontal:5, alignItems:'center', flexDirection:'row', marginBottom:10}}>
            {/* <FontAwesome5 name="store" size={20} color="#1b333d" style={{marginLeft:5}}/> */}
            <TextInput onChangeText={(text)=> setForm({...form, description:text})} placeholder={"Colombia"} multiline style={[Theme.fonts.descriptionGray,{width:'80%', marginHorizontal:10}]}  />
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
                    minimumDate={new Date()}
                    /> 
            </Pressable>
            

            <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:20}}>
            <TouchableOpacity onPress={()=> handleCreate()} disabled={form.titulo == initialForm.titulo || form.fecha == initialForm.fecha ? true: false} style={[Theme.buttons.primary,{backgroundColor:form.titulo == initialForm.titulo || form.fecha == initialForm.fecha ? 'gray': Theme.colors.primary}]}>
                <Text style={Theme.fonts.description}>Crear</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={()=> setVisibleCreate(false)} style={Theme.buttons.primaryOutlined}>
                <Text style={Theme.fonts.descriptionRed}>Cancelar</Text>
            </TouchableOpacity>
            </View>
          </View>
          {loading &&
         <Modal
         animationType="fade"
         visible={loading}
         transparent={true}

       >
          <ModalCargando text='Guardando...'/>
       </Modal>
         }

        </Pressable>

        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex:1,
      backgroundColor:'rgba(0,0,0,0.5)',
    },
    modalView: {
      margin: 20,
      backgroundColor: '#f3f3f3',
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
  
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });