import { gql, useMutation } from '@apollo/client';
import {Modal, View, Text, StyleSheet, Pressable, Image} from 'react-native'
import { GET_ALL_GASTOS } from '../Screens/Car/GastosScreen';
import { GET_GASTOS } from '../Screens/Car/VehiculeDataScreen';
import { Theme } from '../theme';

const DELETE_GASTO = gql`
  mutation deleteGasto($id:ID!, $idVehiculo:ID!){
    deleteGasto(id:$id, idVehiculo:$idVehiculo)
    
  }
`

export default function ModalConfirmDelete({setVisibleDelete, id, idVehiculo, setModalVisible}){
  const [deleteGasto, {data, loading, error}] = useMutation(DELETE_GASTO,{
    update(cache, {data}){
      setVisibleDelete(false)
      setModalVisible(false)
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

    return(
        
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Image  style={{width:30, height:30}} source={require('../../assets/LogoQuarks1PNG.png')}/>
              <Text style={[Theme.fonts.descriptionRed,{marginVertical:20}]}>¿Estas seguro de eliminarlo?</Text>
              <View style={{flexDirection:'row', justifyContent:'space-between', width:250}}>
              <Pressable disabled={loading} onPress={()=>deleteGasto({variables:{id:id, idVehiculo:idVehiculo}})}  style={Theme.buttons.primary}><Text style={Theme.fonts.description}>Eliminar</Text></Pressable>
              <Pressable onPress={()=> setVisibleDelete(false)} style={Theme.buttons.primaryOutlined}><Text style={Theme.fonts.descriptionRed}>Cancelar</Text></Pressable>
              </View>
          </View>
        </View>
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