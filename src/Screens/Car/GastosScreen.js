import AllGastos from "../../Components/Gastos/AllGastos";
import {Text, View, Pressable, Modal} from 'react-native'
import { gql, useLazyQuery } from "@apollo/client";
import { useLayoutEffect, useState } from "react";
import ModalCargando from "../../utils/ModalCargando";
import { Theme } from "../../theme";
import MesGastos from "../../Components/Gastos/MesGastos";
import AñoGastos from "../../Components/Gastos/AñoGastos";

export const GET_ALL_GASTOS = gql`
  query getAllGastos($id:ID){
    getAllGastos(id:$id){
      tipo
      dineroGastado
      fecha
      id
    }
  }
`

export default function GastosScreen({route}){
    const [getAll, {loading,data, error}] = useLazyQuery(GET_ALL_GASTOS)
    const [tiempo, setTiempo] = useState('Todo')
    const id = route?.params?.id
    
    let monthActual = new Date().getMonth()
    let dataMonthActual
    if(data?.getAllGastos){
      dataMonthActual = data.getAllGastos.filter(el=>{
        let fecha = new Date(el.fecha).getMonth()
        return fecha === monthActual
      })
    }
    useLayoutEffect(()=>{
        if(id){
            getAll({variables:{id:id}})
        }
      },[])
    return(
        <View style={{backgroundColor:'#f1f1fb', height:'100%', alignItems:'center'}}>
        <View style={{backgroundColor:"#f1f1f1",marginBottom:20,paddingHorizontal:10, height:50, width:'90%', flexDirection:'row', justifyContent:'space-between', alignItems:'center', borderRadius:10,shadowRadius: 5.46,
        shadowOpacity: 0.3,
        shadowOffset: {
          width: 2,
          height: 2,
          shadowColor: "#000",
        }}}>
            <Pressable onPress={()=> setTiempo('Todo')} style={[Theme.containers.containerTiempo, {backgroundColor:tiempo === 'Todo' ? 'white': null}]}>
            <Text style={Theme.fonts.descriptionBlue}>Todo</Text>
            </Pressable>
            <Pressable onPress={()=> setTiempo('EsteMes')} style={[Theme.containers.containerTiempo, {backgroundColor:tiempo === 'EsteMes' ?'white': null}]}>
            <Text style={Theme.fonts.descriptionBlue}>Este Mes</Text>
            </Pressable>
            <Pressable onPress={()=> setTiempo('EsteAño')} style={[Theme.containers.containerTiempo, {backgroundColor:tiempo === 'EsteAño' ? 'white': null}]}>
            <Text style={Theme.fonts.descriptionBlue}>Este Año</Text>
            </Pressable>

        </View>

        {data?.getAllGastos && tiempo === 'Todo' &&
        <View style={{width:'90%', backgroundColor:'#f3f3f3', marginHorizontal:20, padding:10, borderRadius:20,shadowOpacity: 0.3,
        shadowRadius: 5.46,
        shadowOffset: {
          width: 2,
          height: 2,
          shadowColor: "#000",
        }}}>
        <AllGastos data={data?.getAllGastos}/>
        </View>
        }

        {data?.getAllGastos && tiempo === 'EsteMes' &&
        <View style={{width:'90%', marginHorizontal:20, borderRadius:20,shadowOpacity: 0.3,
        shadowRadius: 5.46,
        shadowOffset: {
          width: 2,
          height: 2,
          shadowColor: "#000",
        }}}>
        <MesGastos data={dataMonthActual}/>
        </View>
        }

        {data?.getAllGastos && tiempo === 'EsteAño' &&
        <View style={{width:'90%', marginHorizontal:20, borderRadius:20,shadowOpacity: 0.3,
        shadowRadius: 5.46,
        shadowOffset: {
          width: 2,
          height: 2,
          shadowColor: "#000",
        }}}>
          <AñoGastos data={data?.getAllGastos}/>
        </View>
        }

      {loading &&
         <Modal
         animationType="fade"
         visible={loading}
         transparent={true}

       >
          <ModalCargando text='Cargando Datos...'/>
       </Modal>
         }
        </View>
    )
}