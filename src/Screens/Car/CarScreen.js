import { View, Text, Image, SafeAreaView, Pressable, FlatList, Dimensions, Alert, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Theme } from '../../theme'
import { useNavigation } from '@react-navigation/native'
import { gql, useLazyQuery, useQuery } from '@apollo/client'
import useAuth from '../../hooks/useAuth'
import { marcasCarros } from '../../Components/CarComponents/marcasCarros'
import Vehiculo from '../../Components/CarComponents/Vehiculo'
import { GET_USER } from '../../Context/AuthContext'
import { GET_VEHICLES } from '../../graphql/querys'



export const CarScreen=({route}) =>{
  
    const navigation = useNavigation()
    const {user} = useAuth()
    const [create, setCreate] = useState(false)
    const {data, error, loading} = useQuery(GET_VEHICLES)
  const handleCreate=(tipo)=>{
    setCreate(false)
    if(user){
      return navigation.navigate('Creando mi Vehiculo',{tipo})
    }
    else{
      return navigation.navigate('Profile')
    }
  }
  
  return (
    <SafeAreaView style={[Theme.containers.containerParent,]}>
        
        {data?.getCars?.length>0 && user && !create?
        <View style={{width:'100%',shadowColor: "#000",
        
        height:"100%",
        paddingTop:'20%',
        justifyContent:'center',
        alignItems:'center',
        elevation: 40,}}>
      <Text style={Theme.fonts.titleBig}>Hola {user.name}! </Text>
      <Text style={[Theme.fonts.titleBig, { lineHeight:20, marginBottom:"5%", fontSize:20, fontWeight:'600'}]}>Selecciona el Vehiculo</Text>

        <FlatList
        style={{marginLeft:20,shadowOpacity: 0.20,
          shadowRadius: 5.46,shadowOffset: {
            width: 4,
            height: 3,
            shadowColor: "#000"
          },}}
        horizontal
        renderItem={({ item })=>
        <TouchableOpacity onPress={() =>  navigation.navigate('Vehiculo', {item:item})} >
         <Vehiculo item={item}/>
        </TouchableOpacity>
          
      }
        data={data?.getCars}
        />
        <Pressable
            onPress={()=> setCreate(true)}
            style={[Theme.buttons.primary,{width:'80%'}]}>
                <Text style={{color:'white', fontSize:18, fontWeight:"600"}}>Crear otro Vehiculo</Text>
        </Pressable>
        </View>

      :
      <>
          <Image style={{width:300, height:300, marginBottom:20}} source={require('../../../assets/CarBack.png')}/>

    <Text style={[Theme.fonts.titleBlue,{width:'90%', textAlign:'center', fontSize:26}]}>Elige el tipo de Vehiculo</Text>
    <Text style={[Theme.fonts.descriptionGray]}>Y empieza a llevar tus gastos!</Text>

      <View style={{  flexDirection:'row', justifyContent:'space-between', width:'60%', marginTop:20}}>
          <Pressable onPress={()=>handleCreate('Carro')} style={Theme.containers.containerBox}>
          <Image style={{width:80, height:80}} source={require('../../../assets/carroBlanco.png')}/>
            
          </Pressable>
          <Pressable onPress={()=>handleCreate("Moto")}
           style={Theme.containers.containerBox}>
          <Image style={{width:80, height:80}} source={require('../../../assets/motoBlanca.png')}/>
                
          </Pressable>
          
      </View>
      {data?.getCars?.length>0 &&
          <Pressable onPress={()=> setCreate(false)} style={[Theme.buttons.primaryOutlined,{width:'50%', marginTop:20}]}>
                <Text style={{color:'#f50057', fontSize:18, fontWeight:"600"}}>Ver mis Vehiculos</Text>
            </Pressable>}
    </>
      }
        
    
    </SafeAreaView>
  )
}