import { View, Text,FlatList, TextInput, Modal, Image,StyleSheet, Pressable, Alert, SafeAreaView, StatusBar, Dimensions  } from "react-native";
import React, {useEffect, useLayoutEffect, useState} from "react";
import { marcasCarros } from "./marcasCarros";
import { Theme } from "../../theme";
import { Avatar, Divider, Button } from "react-native-paper";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { marcasMotos } from "./marcasMotos";
import { gql, useMutation, useQuery } from "@apollo/client";
import { GET_USER } from "../../Context/AuthContext";
import useAuth from "../../hooks/useAuth";
import { GET_VEHICLES } from "../../Screens/Car/CarScreen";
import * as ImagePicker from 'expo-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const CREATE_CAR = gql`
mutation createCar($marca:String, $tipo:String, $referencia:String, $modelo:String, $cilindraje:String, $user:ID, $imagen:String) {
  createCar(input: {marca:$marca, tipo:$tipo, referencia:$referencia,modelo:$modelo, cilindraje:$cilindraje, user:$user, imagen:$imagen}) {
    tipo
    referencia
    modelo
    cilindraje
    marca
    imagen
    id
  }
}
`
const UPDATE_CAR = gql`
mutation updateCar($marca:String, $tipo:String, $referencia:String, $modelo:String, $cilindraje:String, $user:ID, $imagen:String, $id:ID) {
  updateCar(input: {marca:$marca, tipo:$tipo, referencia:$referencia,modelo:$modelo, cilindraje:$cilindraje, user:$user, imagen:$imagen, id:$id}) {
    tipo
    referencia
    modelo
    cilindraje
    marca
    imagen
    id
  }
}
`

const initialForm ={
  marca:'',
  referencia:'',
  modelo:'',
  tipo:'',
  cilindraje:'',
  imagen:'',
  user:'',
  id:''
}
  
export default function FormCreateVehicule({ route }) {
  const [form, setForm] = useState(initialForm)
    const [image, setImage] = useState(null);
    const navigation = useNavigation()
  const { tipo, itemData } = route.params;
  const [marca, setMarca] = useState(null)
  const { width,height } = Dimensions.get('window');
  const [createVehicule, {data, error, loading}] = useMutation(CREATE_CAR, {refetchQueries:[{query:GET_VEHICLES}]})
  const [updateCar, result] = useMutation(UPDATE_CAR)

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
      setForm({...form, imagen:result.base64})
    }
  };
  const handleSubmit=()=>{
      if(itemData){
        setForm({...form, id:itemData.id})
        for (let property in form) {
     
          if(form[property].length === 0 && property !== "id"){
              delete form[property]
        }
      }
      updateCar({variables:{...form, id:itemData.id}})
      setForm(initialForm)
      }else{
        // createVehicule({variables:form})
      }
  }
  useEffect(()=>{
    if(result?.data){
      navigation.navigate('Vehiculo', {item: result?.data?.updateCar})
    }
  },[result?.data])
  
  const handleChange=(itemMarca)=>{
    setForm({...form, marca:itemMarca})

      setMarca(itemMarca)
  }
  if(error){
    Alert.alert('ERROR', error?.message)

  }
  useLayoutEffect(()=>{
      navigation.setOptions({
        title:itemData ? 'Editar mi Vehiculo': 'Crear Vehiculo'
      })
  },[])

  const renderItem=(item)=>{
        return(
            <Pressable onPressIn={()=>handleChange(item.marca)} style={{width:60, height:60, margin:10, backgroundColor:marca === item.marca ? '#1b333d': 'white',justifyContent:'center', alignItems:'center', borderRadius:10}}>
        <Image style={{width:40, height:40}} source={item.src}/>
        </Pressable>

        )
        }

        useEffect(()=>{
          if(error){
            Alert.alert('Ha ocurrido un error', error)
          }
        },[error])
        
        useEffect(()=>{
          if(data){
            console.log('te',data);
            navigation.navigate('Mi Vehiculo',{data:data.createCar})
          }
        },[data])
        useEffect(()=>{
          setForm({...form, tipo:tipo})

        },[])
  return (
    <KeyboardAwareScrollView 
    resetScrollToCoords={{ x: 0, y: 0 }}
        keyboardShouldPersistTaps= 'always'
        style= {{ flex:1 }}>
    <SafeAreaView style={Theme.containers.containerParent}>
         {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal> */}

      {/* <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable> */}

      <View style={{width:'100%', padding:20,}}>
      <Text style={Theme.fonts.titleBig}>{itemData ? "Edita tu vehiculo":'Completa los datos'}</Text>
      
      <Text style={[Theme.fonts.descriptionGray,{marginTop:10}]}>Selecciona la marca</Text>

            {tipo === 'Carro' 
            ?<FlatList
            style={{width:width}}
            horizontal
            renderItem={({item})=>renderItem(item)}
            data={marcasCarros}
            />
            :<FlatList
            horizontal
            renderItem={({item})=>renderItem(item)}
            data={marcasMotos}
            />
            }
            
      <Text style={Theme.fonts.descriptionGray}>Referencia</Text>
      
      <TextInput
            placeholder={itemData ?  itemData?.marca : tipo === 'Carro' ? 'Aveo': 'Mt-03' }
            onChangeText={(text)=> setForm({...form, referencia:text})}
            style={Theme.input.basic}
            />
            
      <Text style={Theme.fonts.descriptionGray}>Modelo</Text>

            <TextInput
            placeholder={itemData&& itemData?.modelo}
            onChangeText={(text)=> setForm({...form, modelo:text})}

            style={Theme.input.basic}
            />
      <Text style={Theme.fonts.descriptionGray}>Cilindraje</Text>

            <TextInput
            onChangeText={(text)=> setForm({...form, cilindraje:text})}
            placeholder={itemData&& itemData?.cilindraje}
            style={Theme.input.basic}
            />


           <View style={{flexDirection:'row', alignItems:'center'}}>
           {itemData?.imagen &&!image && <Image source={{uri:'data:image/png;base64,'+ itemData?.imagen}} style={{ width: 50, height: 50 }} />}

           <Pressable
            onPress={()=> alert('Hola')}
            underlayColor={'rgba(0,0,0,0)'}
            >
                {image && <Image source={{ uri: image }} style={{ width: 50, height: 50 }} />}

            </Pressable>
            <Pressable onPress={pickImage} style={{width:'50%'}}>
                <Text style={{color:'#f50057', fontSize:18, fontWeight:"600", marginLeft:10}}>{image || itemData?.imagen? "Cambiar Imagen":"Agregar Imagen" }</Text>
            </Pressable>
           </View>

           <View style={{flexDirection:'row', marginTop:20, width:'100%', justifyContent:'space-between'}}>
            <Pressable disabled={form== initialForm ? true: false || result?.loading || loading} onPress={handleSubmit} style={[Theme.buttons.primary,{width:'100%', backgroundColor:form== initialForm ? 'gray': Theme.colors.primary}]}>
            <Text style={{color:'white', fontSize:18, fontWeight:"600"}}>{itemData ? 'Guardar Cambios':'Guardar Auto'}</Text>
        </Pressable>
           </View>
      </View>
      
      
    </SafeAreaView>
        </KeyboardAwareScrollView>

  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
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
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});