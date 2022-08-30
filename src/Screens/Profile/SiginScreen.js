
import {View, Text, TextInput, Pressable, Image, Alert} from 'react-native'
import {useEffect, useState} from 'react'
import { useMutation, gql } from '@apollo/client'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFormik } from 'formik'
import * as Yup  from 'yup'
import { Theme } from '../../theme'
import { useNavigation } from '@react-navigation/native'
import useAuth from '../../hooks/useAuth';

const SIGN_IN_MUTATION = gql`
mutation signIn($email: String!, $password:String!) {
    signIn(input:{email: $email, password:$password}) {
      user {
        email
        id
        name
      }
      token
    }
  }
`  
const initialForm = {
  email:'',
  password:''
}
const validationSchema ={
  email: Yup.string().required('Debes colocar un email'),
  password: Yup.string().required('Debes colocar una password')

}
export default function SignInScreen(){
  const navigation = useNavigation()
  const {login} = useAuth()

    const formik = useFormik({
        initialValues:initialForm,
      validateOnChange:false,
      validationSchema:Yup.object(validationSchema),
      onSubmit:(formValue)=>{
        signIn({variables:formValue})
      },

    })
    const [signIn, {data, error, loading}] = useMutation(SIGN_IN_MUTATION)
    console.log(data, error);
    useEffect(()=>{
      if(error){
        Alert.alert('Ha ocurrido un error')
      }
    },[error])

    useEffect(()=>{
      if(data){
        AsyncStorage.clear().then(()=>{
          AsyncStorage.setItem('token',data?.signIn?.token)
        })
        login(data?.signIn)
        navigation.navigate('Perfil')
      }
    },[data])
    return(
        <View style={Theme.containers.containerParent}>
          <Image style={{width:40, height:40}} source={require('../../../assets/LogoQuarks1PNG.png')}/>
          <Text style={{fontSize:30, fontWeight:"700", color:'#f50057' }}>Inicia Sesion</Text>

          <View style={{width:'90%', marginTop:20}}>

          {formik.errors.email && <Text style={{color:'red'}}>{formik.errors.email}</Text>}
            <TextInput
            placeholder='Email'
            value={formik.values.email}
            onChangeText={(text)=> formik.setFieldValue('email', text)}
            style={Theme.input.basic}
            

            />
          {formik.errors.password && <Text style={{color:'red'}}>{formik.errors.password}</Text>}
            <TextInput
            placeholder='Password'
            value={formik.values.password}
            onChangeText={(text)=> formik.setFieldValue('password', text)}
            secureTextEntry
            style={Theme.input.basic}
           
            />
            <Pressable
            onPress={formik.handleSubmit}
            disabled={loading}
            style={{width:'100%',backgroundColor:'#1b333d', height:50, borderRadius:10,justifyContent:'center', alignItems:'center'}}>
                <Text style={{color:'white', fontSize:18, fontWeight:"600"}}>Sign In</Text>
            </Pressable>
            <Pressable
            disabled={loading}
            onPress={()=> navigation.navigate('SignUp')}
            style={{width:'100%', height:50, borderRadius:10,justifyContent:'center', alignItems:'center'}}>
                <Text style={{color:'#1b333d', fontSize:18, fontWeight:"600"}}>No tienes una cuenta? Registrate</Text>
            </Pressable>
          </View>
            
           
        </View>
    )
}