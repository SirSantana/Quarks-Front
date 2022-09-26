import React, { useEffect } from 'react'
import { Theme } from '../../theme'
import {View, Text, TextInput, Pressable, Image, Alert, Modal, Dimensions} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import * as Yup  from 'yup'
import { useFormik } from 'formik'
import { gql, useMutation } from '@apollo/client'
import AsyncStorage from '@react-native-async-storage/async-storage'
import useAuth from '../../hooks/useAuth'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ModalCargando from '../../utils/ModalCargando'
import { client } from '../../../apollo'
import { SIGN_UP } from '../../graphql/mutations'



const initialForm = {
  name:'',
  lastName:'',
  email:'',
  password:'',
  confirmPassword:'',

}
const validationSchema ={
  name:Yup.string().required('Debes colocar un nombre'),
  lastName:Yup.string().required('Debes colocar un apellido'),
  email: Yup.string().required('Debes colocar un email').email(),
  password: Yup.string().required('Debes colocar una password'),
  confirmPassword:Yup.string()
  .oneOf([Yup.ref('password'), null], 'Passwords must match'),

}

export const SignUpScreen = () => {
  const [signUp, {data, error, loading}] = useMutation(SIGN_UP)

  const {login} = useAuth()
  const navigation = useNavigation()
  const formik = useFormik({
    initialValues:initialForm,
  validateOnChange:false,
  validationSchema:Yup.object(validationSchema),
  onSubmit:(formValue)=>{
    signUp({variables:formValue})
    console.log(formValue);
  },

})
useEffect(()=>{
  if(error){
    Alert.alert('Ha ocurrido un error')
  }
},[error])

useEffect(()=>{
  if(data){
    client.resetStore()
    AsyncStorage.setItem('token',JSON.stringify(data.signUp.token)).then(()=>navigation.navigate('Perfil'))
    login(data?.signUp?.user)
  }
},[data])
const {height, width} = Dimensions.get('window')

    return(
      <KeyboardAwareScrollView 
      contentContainerStyle={{flexGrow: 1}}>
        <View style={[Theme.containers.containerParent]}>
          <Image style={{width:40, height:40}} source={require('../../../assets/LogoQuarks1PNG.png')}/>
          <Text style={{fontSize:30, fontWeight:"700", color:'#f50057' }}>Registrate</Text>

          <View style={{width:'90%', marginTop:20}}>

          {formik.errors.name && <Text style={{color:'red'}}>{formik.errors.name}</Text>}

          <TextInput
          value={formik.values.name}
            placeholder='Nombre'
            style={Theme.input.basic}
            onChangeText={(text)=> formik.setFieldValue('name', text)}
            maxLength='15'

            />
            
          {formik.errors.lastName && <Text style={{color:'red'}}>{formik.errors.lastName}</Text>}
            <TextInput
          value={formik.values.lastName}
            placeholder='Apellido'
            maxLength='15'

            style={Theme.input.basic}
            onChangeText={(text)=> formik.setFieldValue('lastName', text)}
            />
          {formik.errors.email && <Text style={{color:'red'}}>{formik.errors.email}</Text>}
            
            <TextInput
            autoCapitalize='none'
          value={formik.values.email}
            placeholder='Email'
            style={Theme.input.basic}
            onChangeText={(text)=> formik.setFieldValue('email', text)}
            />
          {formik.errors.password && <Text style={{color:'red'}}>{formik.errors.password}</Text>}

            <TextInput
          value={formik.values.password}
            placeholder='Contraseña'
            secureTextEntry
            style={Theme.input.basic}
            onChangeText={(text)=> formik.setFieldValue('password', text)}
            />
          {formik.errors.confirmPassword && <Text style={{color:'red'}}>{formik.errors.confirmPassword}</Text>}
            <TextInput
          value={formik.values.confirmPassword}
            placeholder='Confirmar Contraseña'
            secureTextEntry
            style={Theme.input.basic}
            onChangeText={(text)=> formik.setFieldValue('confirmPassword', text)}
            />
            <Pressable
            onPress={formik.handleSubmit}
            style={{width:'100%',backgroundColor:'#1b333d', height:50, borderRadius:10,justifyContent:'center', alignItems:'center'}}>
                <Text style={{color:'white', fontSize:18, fontWeight:"600"}}>Registrate</Text>
            </Pressable>
            <Pressable
            onPress={()=> navigation.navigate('SignIn')}
            style={{width:'100%', height:50, borderRadius:10,justifyContent:'center', alignItems:'center'}}>
                <Text style={{color:'#1b333d', fontSize:18, fontWeight:"600"}}>Ya tienes una cuenta? Inicia Sesion</Text>
            </Pressable>
          </View>
            
          {loading &&
         <Modal
         animationType="fade"
         visible={loading}
         transparent={true}

       >
          <ModalCargando text='Ingresando...'/>
       </Modal>
         }
        </View>
        </KeyboardAwareScrollView>
    )
}
