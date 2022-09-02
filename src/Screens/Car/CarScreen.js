import { View, Text, Image, SafeAreaView, Pressable, FlatList, Dimensions, Alert} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Theme } from '../../theme'
import { useNavigation } from '@react-navigation/native'
import { gql, useLazyQuery, useQuery } from '@apollo/client'
import useAuth from '../../hooks/useAuth'
import { marcasCarros } from '../../Components/CarComponents/marcasCarros'
import Vehiculo from '../../Components/CarComponents/Vehiculo'



export const CarScreen=(props) =>{
    const navigation = useNavigation()
    const {user} = useAuth()
    const [create, setCreate] = useState(false)

  console.log('user', user);

  const handleCreate=(tipo)=>{
    if(user){
      navigation.navigate('Creando mi Vehiculo',{tipo:tipo})
    }
    else{
      return navigation.navigate('Profile')
    }
  }
  
  return (
    <SafeAreaView style={Theme.containers.containerParent}>
        
     
        {user?.vehiculos?.length>0 && !create?
        <View style={{width:'90%', alignItems:'center', justifyContent:'center'}}>

        <FlatList
        horizontal
        renderItem={({item})=>Vehiculo(item, setCreate)}
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