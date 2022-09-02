import { View, Text,FlatList, TextInput, TouchableOpacity, Image, Pressable, Alert, SafeAreaView, StatusBar  } from "react-native";
import React, {useEffect, useState} from "react";
import { marcasCarros } from "./marcasCarros";
import { Theme } from "../../theme";
import { Avatar, Divider, Button } from "react-native-paper";
import { TouchableHighlight } from "react-native-gesture-handler";
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from "@react-navigation/native";
import { marcasMotos } from "./marcasMotos";
import { gql, useMutation, useQuery } from "@apollo/client";
import { GET_USER } from "../../Context/AuthContext";
import useAuth from "../../hooks/useAuth";

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
const GET_ALL_USERS = gql`
  query getAllUsers{
     getAllUsers{
      name 
      email
    }
  }
`

const initialForm ={
  marca:'',
  referencia:'',
  modelo:'',
  cilindraje:'',
  imagen:'',
  tipo:'',
  user:''
}
  
export default function FormCreateVehicule({ route }) {
  const [form, setForm] = useState(initialForm)
    const [image, setImage] = useState(null);
    const navigation = useNavigation()
  const { tipo,dataCar } = route.params;
  const [marca, setMarca] = useState(null)
  const [createVehicule, {data, error, loading}] = useMutation(CREATE_CAR)
  const {user} = useAuth()
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    if (!result.cancelled) {
      setForm({...form, imagen:result.uri, user:user.id})
      setImage(result.uri);
    }
  };
  const handleSubmit=()=>{
    setForm({...form, tipo:tipo})
    console.log(form);

    createVehicule({variables:form})
  }
  const handleChange=(itemMarca)=>{
    setForm({...form, marca:itemMarca})

      setMarca(itemMarca)
  }
  if(error){
    Alert.alert('ERROR', error?.message)

  }
  const renderItem=(item)=>{
        return(
            <Pressable onPressIn={()=>handleChange(item.marca)} style={{width:70, height:70, margin:10, backgroundColor:marca === item.marca ? '#1b333d': '#f1f1f1',justifyContent:'center', alignItems:'center', borderRadius:10}}>
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
            navigation.navigate('Mi Vehiculo',{data:data.createVehicule})
          }
        },[data])
  return (
    <SafeAreaView style={Theme.containers.containerParent}>
      

      <View style={{width:'100%', borderRadius:10, padding:20,}}>
      <Text style={Theme.fonts.titleBig}>Completa los datos de tu vehiculo</Text>
      
      <Text style={[Theme.fonts.descriptionGray,{marginTop:10}]}>Selecciona la marca</Text>

            {tipo === 'Carro' 
            ?<FlatList
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
            placeholder={tipo === 'Carro' ? 'Aveo': 'Mt-03'}
            onChangeText={(text)=> setForm({...form, referencia:text})}
            style={Theme.input.basic}
            />
            
      <Text style={Theme.fonts.descriptionGray}>Modelo</Text>

            <TextInput
            placeholder='2008'
            onChangeText={(text)=> setForm({...form, modelo:text})}

            style={Theme.input.basic}
            />
      <Text style={Theme.fonts.descriptionGray}>Cilindraje</Text>

            <TextInput
            onChangeText={(text)=> setForm({...form, cilindraje:text})}
            placeholder={tipo === 'Carro' ? '1400': '300'}
            style={Theme.input.basic}
            />


           <View style={{flexDirection:'row'}}>
           <TouchableHighlight
            onPress={()=> alert('Hola')}
            underlayColor={'rgba(0,0,0,0)'}
            >
                {image && <Image source={{ uri: image }} style={{ width: 50, height: 50 }} />}
            </TouchableHighlight>
            <Pressable onPress={pickImage} style={{width:'50%'}}>
                <Text style={{color:'#f50057', fontSize:18, fontWeight:"600"}}>{image? "Cambiar Imagen":"Agregar Imagen" }</Text>
            </Pressable>
           </View>
           <View style={{flexDirection:'row', marginTop:20, width:'100%', justifyContent:'space-between'}}>
           <Pressable disabled={form== initialForm ? true: false} onPress={handleSubmit} style={[Theme.buttons.primary,{width:'58%', backgroundColor:form== initialForm ? 'gray': Theme.colors.primary}]}>
                <Text style={{color:'white', fontSize:18, fontWeight:"600"}}>Guardar Auto</Text>
            </Pressable>
            <Pressable onPress={()=> navigation.goBack()} style={[Theme.buttons.primaryOutlined,{width:'38%'}]}>
                <Text style={{color:'#f50057', fontSize:18, fontWeight:"600"}}>Regresar</Text>
            </Pressable>
           </View>
      </View>
      
      
    </SafeAreaView>
  );
}
 