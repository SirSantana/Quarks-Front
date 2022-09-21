import { gql, useMutation } from '@apollo/client';
import {Modal, View, Text, StyleSheet, Pressable, Image} from 'react-native'
import { GET_RECORDATORIOS } from '../Components/Profile/Recordatorios';
import { GET_ALL_GASTOS } from '../Screens/Car/GastosScreen';
import { GET_GASTOS } from '../Screens/Car/VehiculeDataScreen';
import { Theme } from '../theme';
import ModalCargando from './ModalCargando';
import { useEffect } from 'react';

const DELETE_GASTO = gql`
  mutation deleteGasto($id:ID!, $idVehiculo:ID!){
    deleteGasto(id:$id, idVehiculo:$idVehiculo)
    
  }
`
const DELETE_RECORDATORIO =gql`
  mutation deleteRecordatorio($id:ID!){
    deleteRecordatorio(id:$id)
  }
`

export default function ModalConfirmDelete({setVisibleDelete, id, idVehiculo, setModalVisible}){
  const [deleteGasto, {data, loading, error}] = useMutation(DELETE_GASTO,{
    update(cache, {data}){
  const {getAllGastos} = cache.readQuery({
    query:GET_ALL_GASTOS,
    variables:{id:idVehiculo},
  })
  const {getPrevGastos} = cache.readQuery({
    query:GET_GASTOS,
    variables:{id:idVehiculo}
  })
   cache.writeQuery({
    query:GET_ALL_GASTOS,
    variables:{id:idVehiculo},
    data:{
      getAllGastos:getAllGastos.filter(el=> el.id !== data.deleteGasto)
    }
  })
  cache.writeQuery({
    query:GET_GASTOS,
    variables:{id:idVehiculo},
    data:{
      getPrevGastos:getPrevGastos.filter(el=> el.id !== data.deleteGasto)
    }
  })
}})
  const [deleteRecordatorio, result] = useMutation(DELETE_RECORDATORIO, {refetchQueries:[{query:GET_RECORDATORIOS}]})

  const Delete=()=>{
    if(!idVehiculo){
      deleteRecordatorio({variables:{id:id}})

    }else{

      deleteGasto({variables:{id:id, idVehiculo:idVehiculo}})
    }
  }
  useEffect(() => {
    if(data || result?.data){
      setModalVisible(false)
      setVisibleDelete(false)
    }
  }, [data,result?.data])
  
    return(
        
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Image  style={{width:30, height:30}} source={require('../../assets/LogoQuarks1PNG.png')}/>
              <Text style={[Theme.fonts.descriptionRed,{marginVertical:20}]}>¿Estas seguro de eliminarlo?</Text>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <Pressable disabled={loading} onPress={()=>Delete()}  style={Theme.buttons.primary}><Text style={Theme.fonts.description}>Eliminar</Text></Pressable>
              <Pressable onPress={()=> setVisibleDelete(false)} style={Theme.buttons.primaryOutlined}><Text style={Theme.fonts.descriptionRed}>Cancelar</Text></Pressable>
              </View>
          </View>
          {loading || result?.loading &&
          <Modal
          style={{backgroundColor:'rgba(0,0,0,0.5)'}}
          animationType="slide"
          transparent={true}
          visible={result?.loading || loading}
        >
            <ModalCargando text={'Eliminando Recordatorio...'}/>
          </Modal>
          }
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      backgroundColor:'rgba(0,0,0,0.5)',
      width:'100%'
    },
    modalView: {
      margin: 20,
      backgroundColor: '#f3f3f3',
      borderRadius: 20,
      padding: 20,
      alignItems: "center",
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