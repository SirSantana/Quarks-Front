import { View, Text, Image, SafeAreaView, Pressable, FlatList, Dimensions, Alert, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Theme } from '../../theme'
import { useNavigation } from '@react-navigation/native'
import { gql, useLazyQuery, useQuery } from '@apollo/client'
import useAuth from '../../hooks/useAuth'
import { marcasCarros } from '../../Components/CarComponents/marcasCarros'
import Vehiculo from '../../Components/CarComponents/Vehiculo'
import { GET_USER } from '../../Context/AuthContext'

export const GET_VEHICLES= gql`
  query getCars{
    getCars{
      tipo
      marca
      id
      imagen
      cilindraje
      referencia
      modelo
    }
  }
`

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
  console.log(data);
  return (
    <SafeAreaView style={[Theme.containers.containerParent,{backgroundColor:create || !data?.getCars?.length>0? '#f1f1f1':Theme.colors.primary}]}>
        
     
        {data?.getCars?.length>0 && !create?
        <View style={{width:'100%',marginLeft:20, alignItems:'center', justifyContent:'center',shadowColor: "#000",
        shadowOffset: {
          width: 2,
          height: 4,
        },
        shadowOpacity: 0.50,
        shadowRadius: 5.46,
        
        elevation: 20,}}>

        <FlatList
        horizontal
        renderItem={({ item })=><TouchableOpacity onPress={() =>  navigation.navigate('Vehiculo', {id:item.id})} >
        <Vehiculo item={item}/>
        <Pressable
            onPress={()=> setCreate(true)}
            style={Theme.buttons.primaryOutlined}>
                <Text style={{color:'white', fontSize:18, fontWeight:"600"}}>Crear otro Vehiculo</Text>
        </Pressable>
    </TouchableOpacity>
          
      }
        data={data?.getCars}
        />
        </View>

      :
      <>
          <Image style={{width:300, height:300, marginBottom:20}} source={require('../../../assets/CarBack.png')}/>

    <Text style={[Theme.fonts.titleBlue,{width:'80%'}]}>Elige el tipo de Vehiculo</Text>
    <Text style={[Theme.fonts.descriptionBlue]}>Y empieza a llevar tus gastos!</Text>

      <View style={{  flexDirection:'row', justifyContent:'space-between', width:'60%', marginTop:20}}>
          <Pressable onPress={()=>handleCreate('Carro')} style={{backgroundColor:Theme.colors.primary, width:100, height:100, justifyContent:'center', alignItems:'center', borderRadius:10}}>
          <Image style={{width:80, height:80}} source={require('../../../assets/carroBlanco.png')}/>
            
          </Pressable>
          <Pressable onPress={()=>handleCreate("Moto")}
           style={{backgroundColor:Theme.colors.primary, width:100, height:100, justifyContent:'center', alignItems:'center', borderRadius:10}}>
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