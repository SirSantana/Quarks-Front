import {Modal, View, Text, StyleSheet, Pressable, TextInput, Image, Alert} from 'react-native'
import { Theme } from '../../theme';
import {useState} from 'react'
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import { gql, useMutation } from '@apollo/client';
import { GET_USER } from '../../Context/AuthContext';

const EDIT_USER = gql`
    mutation editUser($name:String, $apellido:String, $avatar:String, $ciudad:String, $pais:String){
        editUser(input:{name:$name, apellido:$apellido, avatar:$avatar, ciudad:$ciudad, pais:$pais}){
                name
                apellido
                avatar
                ciudad
                id
        }
    }
`
const initialForm={
    nombre:"",
    apellido:"",
    avatar:"",
    ciudad:"",
    pais:"",
}

export default function EditProfile({user, setVisibleEdit}){
    const [image, setImage] = useState(null);
    const [form, setForm] = useState(initialForm)
    const [editUser, {loading, data, error}] = useMutation(EDIT_USER, {refetchQueries:[{query:GET_USER}]})

    const handleEdit=()=>{
        for (let property in form) {
            if(form[property].length === 0 ){
                delete form[property]
          }
        }
        editUser({variables:form})
        setVisibleEdit(false)
    }
   
    if(error){
        Alert.alert(error)
      }
      if(data){
        return setVisibleEdit(false)
      }

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
          setForm({...form, avatar:result.base64})
        }
      };

    return(
        <>
        <Pressable onPress={()=> setVisibleEdit(false)} style={styles.centeredView}>
          <View style={styles.modalView}>
          <View style={{flexDirection:'column', justifyContent:'space-between', marginBottom:20}}>
            <Text style={Theme.fonts.titleBlue}>Hola Miguel</Text>
            <Text style={[Theme.fonts.descriptionGray,{lineHeight:18}]}>Edita tu perfil</Text>
            </View>

            <Text style={[Theme.fonts.descriptionGray,{textAlign:'left'}]}>Nombre</Text>
            <Pressable style={{backgroundColor:'white', width:'100%', height:50, paddingHorizontal:5, alignItems:'center', flexDirection:'row', marginBottom:10}}>
            {/* <FontAwesome5 name="store" size={20} color="#1b333d" style={{marginLeft:5}}/> */}
            <TextInput onChangeText={(text)=> setForm({...form, name:text})} placeholder={user.name} multiline style={[Theme.fonts.descriptionGray,{width:'80%', marginHorizontal:10}]}  />
            </Pressable>

            <Text style={[Theme.fonts.descriptionGray,{textAlign:'left'}]}>Apellido</Text>
            <Pressable style={{backgroundColor:'white', width:'100%', height:50, paddingHorizontal:5, alignItems:'center', flexDirection:'row', marginBottom:10}}>
            {/* <FontAwesome5 name="store" size={20} color="#1b333d" style={{marginLeft:5}}/> */}
            <TextInput onChangeText={(text)=> setForm({...form, apellido:text})} placeholder={user.apellido} multiline style={[Theme.fonts.descriptionGray,{width:'80%', marginHorizontal:10}]}  />
            </Pressable>

            <Text style={[Theme.fonts.descriptionGray,{textAlign:'left'}]}>Ciudad</Text>
            <Pressable style={{backgroundColor:'white', width:'100%', height:50, paddingHorizontal:5, alignItems:'center', flexDirection:'row', marginBottom:10}}>
            {/* <FontAwesome5 name="store" size={20} color="#1b333d" style={{marginLeft:5}}/> */}
            <TextInput onChangeText={(text)=> setForm({...form, ciudad:text})} placeholder={"Bogotá"} multiline style={[Theme.fonts.descriptionGray,{width:'80%', marginHorizontal:10}]}  />
            </Pressable>

            <Text style={[Theme.fonts.descriptionGray,{textAlign:'left'}]}>Pais</Text>
            <Pressable style={{backgroundColor:'white', width:'100%', height:50, paddingHorizontal:5, alignItems:'center', flexDirection:'row', marginBottom:10}}>
            {/* <FontAwesome5 name="store" size={20} color="#1b333d" style={{marginLeft:5}}/> */}
            <TextInput onChangeText={(text)=> setForm({...form, pais:text})} placeholder={"Colombia"} multiline style={[Theme.fonts.descriptionGray,{width:'80%', marginHorizontal:10}]}  />
            </Pressable>

            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
           {user?.avatar &&!image && <Image source={{uri:'data:image/png;base64,'+ user.avatar}} style={{ width: 50, height: 50 }} />}

           <Pressable
            onPress={()=> alert('Hola')}
            underlayColor={'rgba(0,0,0,0)'}
            >
                {image && <Image source={{ uri: image }} style={{ width: 50, height: 50 }} />}

            </Pressable>
            <Pressable onPress={pickImage} >
                <Text style={Theme.fonts.descriptionRed}>{image || user?.avatar? "Cambiar Imagen":"Agregar Foto de Perfil" }</Text>

            </Pressable>
            {image && <AntDesign name="close" size={24} color={Theme.colors.primary} onPress={()=> setImage(null)} />}

           </View>
            <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:20}}>
            <Pressable onPress={()=> handleEdit()} disabled={form == initialForm ? true: false || loading && true} style={[Theme.buttons.primary, {backgroundColor: form == initialForm ? 'gray': Theme.colors.primary}]}>
                <Text style={Theme.fonts.description}>Editar</Text>
            </Pressable>
            <Pressable disabled={loading && true} onPress={()=> setVisibleEdit(false)} style={Theme.buttons.primaryOutlined}>
                <Text style={Theme.fonts.descriptionRed}>Cancelar</Text>
            </Pressable>
            </View>
          </View>
        </Pressable>
        </>
    )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
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