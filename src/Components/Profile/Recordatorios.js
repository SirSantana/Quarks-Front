import {View, Text, Pressable,StyleSheet, Modal,Dimensions,TouchableOpacity,ScrollView, Alert, ActivityIndicator} from 'react-native'
import { Theme } from '../../theme'
import FormRecordatorio from './FormRecordatorio'
import {useEffect, useState} from 'react'
import { gql, useQuery } from '@apollo/client'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ModalDetailsRecordatorio from './ModalDetailsRecordatorio'
import { FontAwesome5 } from '@expo/vector-icons'; 

export const GET_RECORDATORIOS =gql`
    query getRecordatorios{
        getRecordatorios{
            titulo
            description
            fecha
            id
        }
    }
`
export default function Recordatorios({name}){
    const [visibleCreate, setVisibleCreate] = useState(false)
    const result = useQuery(GET_RECORDATORIOS)
    const [modalVisible, setModalVisible] = useState(false)
    const [details, setDetails] = useState(null)
    const [recordatorios, setRecordatorios] = useState(null)
    const handleDetails=(el)=>{
        setModalVisible(true)
        setDetails(el?.id)
    }
    if(result.error){
        Alert.alert('Ha ocurrido un error')
    }
    useEffect(()=>{
      if(result.data){
        setRecordatorios(result?.data?.getRecordatorios)
      }
    },[result.data])
    return(
        
        <ScrollView style={{backgroundColor:'#f1f1fb', width:'95%'}}>
            <View style={{borderRadius:10,marginBottom:5, padding:10, justifyContent:'center'}}>
              <View style={{justifyContent:'space-between', flexDirection:'row'}}>
              <Text style={[Theme.fonts.titleBig,{fontSize:18}]}>Recordatorios</Text>
              <FontAwesome5 name="bell" size={24} color={Theme.colors.secondary} />
              {/* <Text onPress={()=> navigation.navigate('Gastos', {id:item.id})} style={Theme.fonts.descriptionBlue}>Ver Todo</Text> */}
              </View>
            {result.loading && <ActivityIndicator color={Theme.colors.primary}/>}
            { recordatorios?.map(el=>{
          let fecha = new Date(el.fecha) 
          const dateActual = new Date()
          let diasFaltantes = fecha.getTime() - dateActual.getTime()
          let dias = Math.round(diasFaltantes / (1000*60*60*24))

              return(
        <Pressable onPress={()=> handleDetails(el)} key={el.id} style={styles.containerGasto}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
            <View style={{ flexDirection:'row'}}>
              <MaterialCommunityIcons name="file-eye-outline" size={24} color={Theme.colors.secondary} style={{marginRight:5}} />
            <Text style={Theme.fonts.descriptionBlue}>{el.titulo.slice(0,20)}</Text>
            </View>
            </View>
            <View style={{justifyContent:'center', alignItems:'flex-end'}}>
            <Text style={[Theme.fonts.descriptionGray,{lineHeight:20, color:dias <5 &&Theme.colors.primary}]}>Faltan {dias} dias</Text>
            <Text style={[Theme.fonts.descriptionGray,{lineHeight:20}]}>{fecha.toLocaleDateString()}</Text>

              </View> 
      
          </Pressable>
              )
            }) 
            
            }
            <TouchableOpacity style={[Theme.buttons.primary,{width:'100%'}]} onPress={()=> setVisibleCreate(true)}>
            <Text style={{color:'white', fontSize:16, fontWeight:"600"}}>Crear Recordatorio</Text>

            </TouchableOpacity>
            </View>
            
            
            
            <Modal
          animationType="fade"
          visible={visibleCreate}
          transparent={true}
        >
        <FormRecordatorio setVisibleCreate={setVisibleCreate} name={name}/> 
        </Modal>

        <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible} 
        
      >
          <ModalDetailsRecordatorio id={details} setModalVisible={setModalVisible}/>
      </Modal>
          </ScrollView>
    )
}

const styles = StyleSheet.create({
    containerGasto:{
        backgroundColor:'white', width:'100%', flexDirection:'row',justifyContent:'space-between', borderRadius:10, height:50, padding:5, marginVertical:5, alignItems:'center'
      },
})