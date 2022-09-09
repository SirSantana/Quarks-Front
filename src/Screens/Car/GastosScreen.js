import AllGastos from "../../Components/Gastos/AllGastos";
import {Text, View} from 'react-native'
import { gql, useLazyQuery } from "@apollo/client";
import { useLayoutEffect } from "react";
import ModalCargando from "../../utils/ModalCargando";
import { Theme } from "../../theme";

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
    const id = route?.params?.id
    
    useLayoutEffect(()=>{
        if(id){
            getAll({variables:{id:id}})
        }
      },[])
    return(
        <View style={{backgroundColor:'#f1f1fb', height:'100%'}}>
        
        {data?.getAllGastos &&
        <View style={{backgroundColor:'#f3f3f3', marginHorizontal:20, padding:10, borderRadius:20,shadowOpacity: 0.3,
        shadowRadius: 5.46,
        shadowOffset: {
          width: 2,
          height: 2,
          shadowColor: "#000",
        }}}>
        <AllGastos data={data?.getAllGastos}/>
        </View>
        }
        {loading &&
        <ModalCargando text={'Cargando...'}/>
        }
        </View>
    )
}