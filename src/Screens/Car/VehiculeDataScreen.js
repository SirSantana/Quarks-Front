import { View, Text, Image, Button, TouchableOpacity, Pressable,StyleSheet, Modal, Alert, Dimensions, } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { marcasCarros } from '../../Components/CarComponents/marcasCarros';
import { Theme } from '../../theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ModalCreateGasto from '../../Components/CarComponents/ModalCreateGasto';
import FormCreateVehicule from '../../Components/CarComponents/FormCreateVehicule';
import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { MaterialIcons } from '@expo/vector-icons';
import { marcasMotos } from '../../Components/CarComponents/marcasMotos';
import ModalCargando from '../../utils/ModalCargando';

export const GET_GASTOS = gql`
  query getPrevGastos($id:ID){
    getPrevGastos(id:$id){
      tipo
      dineroGastado
      fecha
      id
      vehiculo
    }
  }
`

export default function VehiculeDataScreen({route}) {
  const navigation = useNavigation()
    const item = route?.params?.item
  const marca = marcasCarros.find(el=> el.marca === item?.marca)
  const marcaMoto = marcasMotos.find(el=> el.marca === item?.marca)

const [modalVisible2, setModalVisible2] = useState(false);

const  result = useQuery(GET_GASTOS,{variables:{id:item.id}})
const {height, width} = Dimensions.get('window')
console.log(item.id);

  useLayoutEffect(()=>{
    if(item){
      navigation.setOptions({
        headerRight:()=>(
          <Button
          onPress={()=> navigation.navigate('Creando mi Vehiculo',{tipo:item?.tipo, itemData:item})}
          title='Editar'
          />
        ),
        title:item.marca +" "+ item.referencia
      })

    }
  },[])

  
  return (
    <KeyboardAwareScrollView 
    resetScrollToCoords={{ x: 0, y: 0 }}
        keyboardShouldPersistTaps= 'always'
        style= {{ flex:1, height:'100%' }}>
        <View style={{backgroundColor:'#f1f1fb',height:height,marginBottom:'10%'}}>
         
          {item?.imagen
           ?<Image   style={{
           width: '100%',
           height: '40%', borderBottomLeftRadius:20, borderBottomRightRadius:20,}} source={{uri:'data:image/png;base64,'+ item.imagen}}/>
          :
          <Image resizeMode='contain'  style={{position: 'absolute',opacity:.8, tintColor:'rgba(242,241,239,0.8)',
            top: 30,
            right:-50,
            width: width,
            height: 200}} source={require('../../../assets/carroBlanco.png')}/>}
          
          
          <View style={{margin:20, flexDirection:'row', alignItems:'center',}}>
          <Image  style={{height: 50, width:50, marginRight:20}} source={item.tipo === 'Carro' ?  marca?.src : marcaMoto.src}/>
          <View>
          <Text style={Theme.fonts.titleBlue}>{item?.marca} {item?.referencia}</Text>
          <Text style={Theme.fonts.descriptionGray}>{item?.modelo}</Text>
          </View>
          </View>
          <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
          <View style={{padding:10}}>
            <View style={{borderRadius:10,marginBottom:5, height:50, padding:5, justifyContent:'center'}}>
              <View style={{justifyContent:'space-between', flexDirection:'row'}}>
              <Text style={[Theme.fonts.titleBig,{fontSize:18}]}>Gastos Recientes</Text>
              <Text onPress={()=> navigation.navigate('Gastos', {id:item.id})} style={Theme.fonts.descriptionBlue}>Ver Todo</Text>
              </View>

              
            </View>
            
              {result.loading&&
              <View style={styles.containerGasto}>
            <Text style={Theme.fonts.descriptionBlue}>Cargando...</Text>
              </View>
              }
            { result?.data?.getPrevGastos?.map(el=>{
          let fecha = new Date(el.fecha) 
          let tipoGasto;
          if(el.tipo === 'Tanqueada'){tipoGasto = 'fuel'}
          if(el.tipo === 'Parqueadero'){tipoGasto = 'car-brake-parking'}
          if(el.tipo === 'Lavada'){tipoGasto = 'local-car-wash'}
          if(el.tipo === 'Repuestos'){tipoGasto = 'car-wrench'}
          if(el.tipo === 'Mantenimiento'){tipoGasto = 'car-repair'}
              return(
        <View key={el.id} style={styles.containerGasto}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
            {tipoGasto === 'fuel' || tipoGasto === 'car-brake-parking' || tipoGasto === "car-wrench"?
           <MaterialCommunityIcons name={tipoGasto} size={32} color={Theme.colors.secondary}  />
          : <MaterialIcons name={tipoGasto} size={32} color={Theme.colors.secondary} />}
            <View style={{marginLeft:10}}>
            <Text style={Theme.fonts.descriptionBlue}>{el.tipo}</Text>
            <Text style={[Theme.fonts.descriptionGray,{lineHeight:20}]}>{fecha.toLocaleDateString()}</Text>
            </View>
            </View>
            <View>
            <Text style={[Theme.fonts.descriptionRed]}>$ {el.dineroGastado}</Text>
              </View> 
      
          </View>
              )
            }) 
            
            }
            
            
            
            <TouchableOpacity style={[Theme.buttons.primary,{width:'100%'}]} onPress={()=> setModalVisible2(true)}>
            <Text style={{color:'white', fontSize:18, fontWeight:"600"}}>Agregar Gasto</Text>

            </TouchableOpacity>

          </View>

            
            
          
            
      {modalVisible2 &&
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible2}
      >
          <ModalCreateGasto setModalVisible2={setModalVisible2} id={item.id} />
      </Modal>}

    </View>
    
    </KeyboardAwareScrollView>
  )
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "center",
    backgroundColor:'rgba(0,0,0,0.5)',
    
  },
  modalView: {
   
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: "absolute",
    bottom: 0,
    height: 180,
    width:'100%',
    borderTopLeftRadius: 20,
    alignItems: "center",
    borderTopRightRadius: 20,
    backgroundColor: "#464646",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  containerGasto:{
    backgroundColor:'white', width:'100%', flexDirection:'row',justifyContent:'space-between', borderRadius:10, height:50, padding:5, marginBottom:5, alignItems:'center'
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});