import { View, Text,FlatList, TextInput, TouchableOpacity, Image, Pressable, Alert  } from "react-native";
import React, {useEffect, useState} from "react";
import { marcasCarros } from "./marcasCarros";
import { Theme } from "../../theme";
import { Avatar, Divider, Button } from "react-native-paper";
import { TouchableHighlight } from "react-native-gesture-handler";
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from "@react-navigation/native";
import { marcasMotos } from "./marcasMotos";
import { gql, useMutation } from "@apollo/client";

const CREATE_CAR = gql`
mutation createVehicule($marca: String, $referencia:String, $modelo:String, $cilindraje:String, $tipo:String, $imagen:String) {
  createVehicule(input:{marca: $marca, referencia:$referencia, modelo:$modelo, cilindraje:$cilindraje, tipo:$tipo, imagen:$imagen}) {
    tipo
    referencia
    modelo
    cilindraje
    marca
    imagen
    
  }
}
`
const initialForm ={
  marca:'',
  referencia:'',
  modelo:'',
  cilindraje:'',
  imagen:''
}
  
export default function FormCreateVehicule({ route }) {
  const [form, setForm] = useState(initialForm)
    const [image, setImage] = useState(null);
    const navigation = useNavigation()
  const { tipo } = route.params;
  const [marca, setMarca] = useState(null)
  const [createVehicule, {data, error, loading}] = useMutation(CREATE_CAR)


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    if (!result.cancelled) {
      setForm({...form, imagen:result.uri})
      setImage(result.uri);
    }
  };
  console.log(error, loading, data);
  const handleSubmit=()=>{
    setForm({...form, tipo:tipo})
    createVehicule({variables:form})
  }
  const handleChange=(itemMarca)=>{
    setForm({...form, marca:itemMarca})

      setMarca(itemMarca)
  }
 
  const renderItem=(item)=>{
        return(
            <Pressable onPressIn={()=>handleChange(item.marca)} style={{width:70, height:70, margin:10, backgroundColor:marca === item.marca ? '#1b333d': 'white',justifyContent:'center', alignItems:'center', borderRadius:10}}>
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
            navigation.navigate('Mi Vehiculo')
          }
        },[data])
  return (
    <View style={Theme.containers.containerParent}>
        
      <Text style={Theme.fonts.titleBig}>Completa los datos de tu vehiculo</Text>

      <View style={{width:'90%',backgroundColor:'#f1f1f1',marginTop:20, borderRadius:10, padding:20,boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
      <Text style={Theme.fonts.descriptionGray}>Selecciona la marca</Text>

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
            <Pressable onPress={pickImage} style={[Theme.buttons.primaryOutlined,{width:'50%'}]}>
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
      
      
    </View>
  );
}
 