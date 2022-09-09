import { useLazyQuery, useQuery } from '@apollo/client';
import { useState } from 'react';
import { View, Text ,StyleSheet,FlatList, Modal, TouchableOpacity, Pressable } from 'react-native'
import { GET_GASTOS } from '../../Screens/Car/VehiculeDataScreen';
import { Theme } from '../../theme';
import ModalDetailsGasto from './ModalDetailsGasto';
import { MaterialIcons } from '@expo/vector-icons';

import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function AllGastos({data}){
    const [modalVisible, setModalVisible] = useState(false)
    const [details, setDetails] = useState(null)

    const handleDetails=(item)=>{
        console.log('oi',item);
        setModalVisible(false)
        setDetails(item?.id)
        setModalVisible(true)
    }
// console.log(data);
// useLayoutEffect(()=>{
//     getGastos({variables:{id:item.id}})
//   },[])

    const Render =({item})=>{
        let fecha = new Date(item.fecha)
        let tipoGasto;
          if(item.tipo === 'Tanqueada'){tipoGasto = 'fuel'}
          if(item.tipo === 'Parqueadero'){tipoGasto = 'car-brake-parking'}
          if(item.tipo === 'Lavada'){tipoGasto = 'local-car-wash'}
          if(item.tipo === 'Repuestos'){tipoGasto = 'car-wrench'}
          if(item.tipo === 'Mantenimiento'){tipoGasto = 'car-repair'}
        return(
            <View key={item?.id} style={{backgroundColor:'white', width:'100%', flexDirection:'row',justifyContent:'space-between', borderRadius:10, height:50, padding:5, marginBottom:5, alignItems:'center'}}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
            {tipoGasto === 'fuel' || tipoGasto === 'car-brake-parking' || tipoGasto === "car-wrench"?
           <MaterialCommunityIcons name={tipoGasto} size={32} color={Theme.colors.secondary}  />
          : <MaterialIcons name={tipoGasto} size={32} color={Theme.colors.secondary} />}
            <View style={{marginLeft:10}}>
            <Text style={Theme.fonts.descriptionBlue}>{item.tipo}</Text>
            <Text style={[Theme.fonts.descriptionGray,{lineHeight:20}]}>{fecha.toLocaleDateString()}</Text>
            </View>
            </View>
            <View>
            <Text style={[Theme.fonts.descriptionRed]}>$ {item.dineroGastado}</Text>
              </View> 
      
          </View>
        )
    }

    return(
        <>
        <View style={{justifyContent:'center', alignItems:'center'}}>

        <View style={{borderRadius:10,marginBottom:5, height:50, padding:5, justifyContent:'center', width:'100%'}}>
              <View style={{justifyContent:'space-between', flexDirection:'row'}}>
              <Text style={[Theme.fonts.titleBig,{fontSize:20}]}>Gastos </Text>
              </View>

              <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
            </View>
            <FlatList
             style={{width:'100%'}}
             renderItem={({ item })=>
             <TouchableOpacity onPress={() =>  handleDetails(item)} >
                 <Render item={item}/>
             </TouchableOpacity>  }
             data={data}
            />

            <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
      >
          <ModalDetailsGasto id={details} setModalVisible={setModalVisible}/>
      </Modal>
        </View>

        </>
    )
}