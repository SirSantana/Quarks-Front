import AllGastos from "../../Components/Gastos/AllGastos";
import {Text, View, Pressable, Modal, StyleSheet, ScrollView} from 'react-native'
import { gql, useLazyQuery } from "@apollo/client";
import { useLayoutEffect, useState } from "react";
import ModalCargando from "../../utils/ModalCargando";
import { Theme } from "../../theme";
import MesGastos from "../../Components/Gastos/MesGastos";
import AñoGastos from "../../Components/Gastos/AñoGastos";
import { GET_ALL_GASTOS } from "../../graphql/querys";



export default function GastosScreen({route}){
    const [getAll, {loading,data, error}] = useLazyQuery(GET_ALL_GASTOS)
    const [tiempo, setTiempo] = useState('Todo')
    const id = route?.params?.id
    let yearsData = [[],[],[],[],[]]
    
    let monthActual = new Date().getMonth()
    let yearActual = new Date().getFullYear()
    

    let dataMonthActual
    if(data?.getAllGastos){
      dataMonthActual = data.getAllGastos.filter(el=>{
        let fecha = new Date(el.fecha).getMonth()
        let year = new Date(el.fecha).getFullYear()
        if(year === yearActual){
          yearsData[0].push(el)
        }else if(year === 2023){
          console.log('hodasldlas');
          yearsData[1].push(el)
        }
        return fecha === monthActual && year === yearActual
      })
    }
    console.log(yearsData);
    useLayoutEffect(()=>{
        if(id){
            getAll({variables:{id:id}})
        }
      },[])
    return(
        <View style={{backgroundColor:'#f1f1fb', height:'100%', alignItems:'center'}}>
        <View style={{backgroundColor:"#f1f1f1",marginBottom:20,paddingHorizontal:10, height:'10%', width:'90%', flexDirection:'row', justifyContent:'space-between', alignItems:'center', borderRadius:10,shadowRadius: 5.46,
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
        <View style={styles.viewTime}>
        <AllGastos data={data?.getAllGastos}/>
        </View>
        }

        {data?.getAllGastos && tiempo === 'EsteMes' &&
        <View style={styles.viewTime}>
        <MesGastos data={dataMonthActual}/>
        </View>
        }

        {data?.getAllGastos && tiempo === 'EsteAño' &&
        <View style={styles.viewTime}>
          <AñoGastos data={yearsData} />
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

const styles = StyleSheet.create({
  viewTime:{
    width:'90%', marginHorizontal:20, borderRadius:20,shadowOpacity: 0.3,
    shadowRadius: 5.46,
    shadowOffset: {
      width: 2,
      height: 2,
      shadowColor: "#000",
    }
  }
})