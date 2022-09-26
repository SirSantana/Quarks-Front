import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import {Text, View, Pressable, Image, FlatList, Modal} from 'react-native'
import { Theme } from '../../theme'
import GastosIndividuales from './GastosIndividuales';
import ModalDetailsGasto from './ModalDetailsGasto';


export default function MesGastos({data, month}){
    const [modalVisible, setModalVisible] = useState(false)
    const [idItem,setIdItem] = useState(null)
    const [collapse, setCollapse] = useState(month ? true: false)

    let meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    let tipoGastos = ['Mantenimiento', 'Parqueadero', 'Tanqueada', 'Repuestos', 'Lavada']
    let mesActual;
    if(data.length >0){
       mesActual = month || new Date(data[0]?.fecha).getMonth()
    }
    console.log('fecah',data[1]?.fecha);
    let tipos = {
        Mantenimiento:[],
        Parqueadero:[],
        Tanqueada:[],
        Repuestos:[],
        Lavada:[]
    }
    let totalDineroGastado= 0
    for(let i = 0; i <data.length; i++){
        for(let tipo of tipoGastos){
          if(data[i].tipo === tipo){
            tipos[tipo].push(data[i])
          }
        }
        totalDineroGastado += parseFloat(data[i].dineroGastado.replace(/\./g, ""))
      }
    
      
    return(
        
        <View style={{justifyContent:'center', height:month ? null: "100%"}}>
            <Pressable onPress={()=> setCollapse(collapse ? false: true)} style={{backgroundColor:Theme.colors.primary, borderRadius:10,marginBottom:20, padding:10, justifyContent:'center', width:'100%'}}>
                <View>
                <Text style={Theme.fonts.description}>{meses[mesActual]}</Text>
                <View>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <Text style={[Theme.fonts.titleWhite, {fontSize:30}]}>$ {totalDineroGastado.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</Text>
                <Text style={Theme.fonts.description}>{collapse ?"Ver Detalle": "Cerrar Detalle"}</Text>
                </View>
                
                </View>
            </Pressable>
            {collapse 
            ? null
            : <>
            <Text style={Theme.fonts.descriptionBlue}>Detalle</Text>
            <GastosIndividuales tipos={tipos} setIdItem={setIdItem} setModalVisible={setModalVisible}/>
            
            </>}
            

            <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible} 
        onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
      >
          <ModalDetailsGasto id={idItem} setModalVisible={setModalVisible}/>
      </Modal>
        
        </View>
    )
}