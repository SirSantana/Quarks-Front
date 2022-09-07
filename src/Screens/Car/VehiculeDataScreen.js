import { View, Text, Image, Button, FlatList, Pressable,StyleSheet, Modal, Alert, Dimensions, } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { marcasCarros } from '../../Components/CarComponents/marcasCarros';
import { Theme } from '../../theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ModalCreateGasto from '../../Components/CarComponents/ModalCreateGasto';
import FormCreateVehicule from '../../Components/CarComponents/FormCreateVehicule';
export default function VehiculeDataScreen({route}) {
  const navigation = useNavigation()
    const item = route?.params?.item
  const marca = marcasCarros.find(el=> el.marca === item?.marca)

const [modalVisible2, setModalVisible2] = useState(false);
const {height, width} = Dimensions.get('window')


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
        <View style={{backgroundColor:'white',height:height,}}>
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
          <Image  style={{height: 50, width:50, marginRight:20}} source={marca?.src}/>
          <View>
          <Text style={Theme.fonts.titleBlue}>{item?.marca} {item?.referencia}</Text>
          <Text style={Theme.fonts.descriptionGray}>{item?.modelo}</Text>
          </View>
          </View>
          <View style={{backgroundColor:'#f3f3f3', marginHorizontal:20, padding:10, borderRadius:20,shadowOpacity: 0.3,
      shadowRadius: 5.46,
      shadowOffset: {
        width: 2,
        height: 2,
        shadowColor: "#000",
      },}}>
            <View style={{borderRadius:10,marginBottom:5, height:50, padding:5, justifyContent:'center'}}>
              <View style={{justifyContent:'space-between', flexDirection:'row'}}>
              <Text style={[Theme.fonts.titleBig,{fontSize:20}]}>Gastos </Text>
              <Text style={Theme.fonts.descriptionBlue}>Ver Todo</Text>
              </View>

              <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
            </View>
            
           
            <View style={{backgroundColor:'white', flexDirection:'row',justifyContent:'space-between', borderRadius:10, height:50, padding:5, marginBottom:5, alignItems:'center'}}>
              <View style={{flexDirection:'row', alignItems:'center'}}>
              <MaterialCommunityIcons name={'fuel'} size={32} color="black" />
              <View style={{marginLeft:10}}>
              <Text style={Theme.fonts.descriptionBlue}>Tanqueada</Text>
              <Text style={[Theme.fonts.descriptionGray,{lineHeight:20}]}>13-jul-2022</Text>
              </View>
              </View>

              <View>
              <Text style={[Theme.fonts.titleRed]}>$ 80.000</Text>
                </View> 

            </View>
            <View style={{backgroundColor:'white', flexDirection:'row',justifyContent:'space-between', borderRadius:10, height:50, padding:5, marginBottom:5, alignItems:'center'}}>
              <View style={{flexDirection:'row', alignItems:'center'}}>
              <MaterialCommunityIcons name={'fuel'} size={32} color="black" />
              <View style={{marginLeft:10}}>
              <Text style={Theme.fonts.descriptionBlue}>Tanqueada</Text>
              <Text style={[Theme.fonts.descriptionGray,{lineHeight:20}]}>13-jul-2022</Text>
              </View>
              </View>

              <View>
              <Text style={[Theme.fonts.titleRed]}>$ 80.000</Text>
                </View> 

            </View>
            <Pressable style={Theme.buttons.primary} onPress={()=> setModalVisible2(true)}>
            <Text style={{color:'white', fontSize:18, fontWeight:"600"}}>Agregar Gasto</Text>

            </Pressable>

          </View>

            
            
          
            
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible2}
      >
          <ModalCreateGasto setModalVisible2={setModalVisible2}/>
      </Modal>

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