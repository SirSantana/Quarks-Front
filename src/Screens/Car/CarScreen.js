import { View, Text, Image, SafeAreaView, Pressable, FlatList, Dimensions, Alert} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Theme } from '../../theme'
import { useNavigation } from '@react-navigation/native'
import { gql, useLazyQuery, useQuery } from '@apollo/client'
import useAuth from '../../hooks/useAuth'
import { marcasCarros } from '../../Components/CarComponents/marcasCarros'


const GET_CAR = gql`
query getCar($id: ID) {
  getCar(id:$id){
    tipo
    referencia
    modelo
    cilindraje
    marca
    imagen
    user {
      name
      email
    }
  }
  
}
`
const GET_ONE_USER = gql`
query getOneUser($id: ID) {
  getOneUser(id:$id){
    name
    email
    vehiculos {
      modelo
      cilindraje
      marca
    }
  }
  }
  
`

export const CarScreen=(props) =>{
    const navigation = useNavigation()
    const {user} = useAuth()
  const handleCreate=(tipo)=>{
    if(user){
      navigation.navigate('Creando mi Vehiculo',{tipo:tipo})
    }
    else{
      return navigation.navigate('Profile')
    }
  }
  const { width,height } = Dimensions.get('window');
  const [create, setCreate] = useState(false)
  const renderItem=(item)=>{
    
    const marca = marcasCarros.find(el=> el.marca === item.marca)
    return(
        <View style={{backgroundColor:Theme.colors.primary, width:300, borderRadius:10, marginRight:40, height:500}}>
          <View style={{height: '80%',
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          }}>

          <Image resizeMode='contain'  style={{position: 'absolute',opacity:.8, tintColor:'rgba(242,241,239,0.8)',
            top: 30,
            right:-50,
            width: width,
            height: 200}} source={require('../../../assets/carroBlanco.png')}/>
          </View>
          <View style={{width:'100%', padding:20, position:'absolute', top:'45%'}}>
          <Text style={{fontSize:40, color:'white', fontWeight:'700'}}>{item.marca}</Text>
          <Text style={{fontSize:40, color:'white', fontWeight:'700', lineHeight:40}}>{item.referencia}</Text>
          <Text style={Theme.fonts.description}>{item.modelo}</Text>

          {/* <Image style={{width:40, height:40, marginBottom:20}} source={marca.src}/> */}
          <Pressable
            // onPress={()=> navigation.navigate('SignIn')}
            style={{width:'100%',backgroundColor:'#1b333d',marginTop:20, height:50, borderRadius:10,justifyContent:'center', alignItems:'center'}}>
                <Text style={{color:'white', fontSize:18, fontWeight:"600"}}>Ver Auto</Text>
        </Pressable>
        <Pressable
            onPress={()=> setCreate(true)}
            style={Theme.buttons.primaryOutlined}>
                <Text style={{color:'white', fontSize:18, fontWeight:"600"}}>Crear otro Vehiculo</Text>
        </Pressable>
          </View>
          
  
          </View>
            )
    }
  return (
    <SafeAreaView style={Theme.containers.containerParent}>
        
     
        {user?.vehiculos.length>0 && !create?
        <View style={{width:'90%', alignItems:'center', justifyContent:'center'}}>

        <FlatList
        horizontal
        renderItem={({item})=>renderItem(item)}
        data={user?.vehiculos}
        />
        </View>

      :
      <>
          <Image style={{width:40, height:40, marginBottom:20}} source={require('../../../assets/LogoQuarks1PNG.png')}/>

    <Text style={[Theme.fonts.titleBlue,{width:'80%'}]}>Crea tu vehiculo y empieza a llevar la contabilidad</Text>
      <View style={{  flexDirection:'row', justifyContent:'space-between', width:'60%', marginTop:20}}>
          <Pressable onPress={()=>handleCreate('Carro')} style={{backgroundColor:Theme.colors.primary, width:100, height:100, justifyContent:'center', alignItems:'center', borderRadius:10}}>
          <Image style={{width:80, height:80}} source={require('../../../assets/carroBlanco.png')}/>
            
          </Pressable>
          <Pressable onPress={()=>handleCreate("Moto")}
           style={{backgroundColor:Theme.colors.primary, width:100, height:100, justifyContent:'center', alignItems:'center', borderRadius:10}}>
          <Image style={{width:80, height:80}} source={require('../../../assets/motoBlanca.png')}/>
                
          </Pressable>
      </View>
    </>
      }
        
    
    </SafeAreaView>
  )
}