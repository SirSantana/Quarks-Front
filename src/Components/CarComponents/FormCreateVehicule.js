import { View, Text,FlatList, TextInput, Modal, Image,StyleSheet, Pressable, Alert, SafeAreaView, StatusBar, Dimensions  } from "react-native";
import React, {useEffect, useLayoutEffect, useState} from "react";
import { marcasCarros } from "./marcasCarros";
import { Theme } from "../../theme";
import { useNavigation } from "@react-navigation/native";
import { marcasMotos } from "./marcasMotos";
import { gql, useMutation, useQuery } from "@apollo/client";
import * as ImagePicker from 'expo-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ModalCargando from "../../utils/ModalCargando";
import { CREATE_CAR, UPDATE_CAR } from "../../graphql/mutations";
import { GET_VEHICLES } from "../../graphql/querys";


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
        createVehicule({variables:form})
      }
  }
 
  console.log(form, initialForm);
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
      setForm({...form, tipo:tipo})
  },[])

  

  useEffect(()=>{
     if(error){
        Alert.alert('Ha ocurrido un error', error)
    }
  },[error])
        
  useEffect(()=>{
     if(result?.data){
            navigation.navigate('Vehiculo', {item: result?.data?.updateCar})
      }
    if(data){
            navigation.navigate('Mi Vehiculo',{data:data.createCar})
      }
   },[result?.data, data])

    const renderItem=(item)=>{
            return(
                <Pressable onPressIn={()=>handleChange(item.marca)} style={{width:60, height:60, margin:10, backgroundColor:marca === item.marca ? '#1b333d': 'white',justifyContent:'center', alignItems:'center', borderRadius:10}}>
            <Image style={{width:40, height:40}} source={item.src}/>
            </Pressable>
    
            )
          }

  return (
    <KeyboardAwareScrollView 
    resetScrollToCoords={{ x: 0, y: 0 }}
        keyboardShouldPersistTaps= 'always'
        style= {{ flex:1 }}>
    <SafeAreaView style={Theme.containers.containerParent}>
      {result?.loading &&
      <Modal
      style={{backgroundColor:'rgba(0,0,0,0.5)'}}
      animationType="slide"
      transparent={true}
      visible={result?.loading}
    >
        <ModalCargando text={'Guardando Cambios...'}/>
      </Modal>
      }
      {loading &&
      <Modal
      style={{backgroundColor:'rgba(0,0,0,0.5)'}}
      animationType="slide"
      transparent={true}
      visible={loading}
    >
        <ModalCargando text={'Creando tu Vehiculo...'}/>
      </Modal>
      }

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
            onChangeText={(text)=> setForm({...form, referencia:text.trim()})}
            style={Theme.input.basic}
            maxLength={15}

            />
            
      <Text style={Theme.fonts.descriptionGray}>Modelo</Text>

            <TextInput
            placeholder={itemData&& itemData?.modelo}
            onChangeText={(text)=> setForm({...form, modelo:text.trim()})}
            maxLength={4}

            style={Theme.input.basic}
            />
      <Text style={Theme.fonts.descriptionGray}>Cilindraje</Text>

            <TextInput
            onChangeText={(text)=> setForm({...form, cilindraje:text.trim()})}
            placeholder={itemData&& itemData?.cilindraje}
            style={Theme.input.basic}
            maxLength={5}
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
            {itemData?
            <Pressable disabled={form !== initialForm ? false: true || result?.loading && true} onPress={handleSubmit} style={[Theme.buttons.primary,{width:'100%', backgroundColor:form !== initialForm ? Theme.colors.primary:'gray' }]}>
            <Text style={{color:'white', fontSize:18, fontWeight:"600"}}>Guardar Cambios</Text>
        </Pressable>
          :
          <Pressable disabled={form.referencia !== initialForm.referencia && form.marca !== initialForm.marca ? false: true || loading && true} onPress={handleSubmit} style={[Theme.buttons.primary,{width:'100%', backgroundColor:form.referencia !== initialForm.referencia && form.marca !== initialForm.marca ? Theme.colors.primary:"gray" }]}>
            <Text style={{color:'white', fontSize:18, fontWeight:"600"}}>Crear Vehiculo</Text>
        </Pressable>
          }
            
           </View>
      </View>
      
      
    </SafeAreaView>
        </KeyboardAwareScrollView>

  );
}
