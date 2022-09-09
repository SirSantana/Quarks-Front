import { View, StyleSheet, Text, Pressable, Image, Button} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from "../../theme";
import { gql, useLazyQuery } from "@apollo/client";
import { useLayoutEffect, useState } from "react";
import { Feather } from '@expo/vector-icons';
import { Modal } from "react-native-paper";
import ModalCreateGasto from "../CarComponents/ModalCreateGasto";
export const GET_ONE_GASTO = gql`
  query getOneGasto($id:ID){
    getOneGasto(id:$id){
      tipo
      dineroGastado
      fecha
      id
      imagen
      description
      lugar
    }
  }
`

export default function ModalDetailsGasto({id, setModalVisible}){

    const [getOne, {loading, data, error}] = useLazyQuery(GET_ONE_GASTO)
    const [modalVisible2, setModalVisible2] = useState(false)
    useLayoutEffect(()=>{
      if(id){
          getOne({variables:{id:id}})
      }
    },[])
    const getOneGasto = data?.getOneGasto

    let fecha = new Date(getOneGasto?.fecha)
    let tipoGasto;

    if(getOneGasto){
    if(getOneGasto.tipo === 'Tanqueada'){tipoGasto = 'fuel'}
    if(getOneGasto.tipo === 'Parqueadero'){tipoGasto = 'car-brake-parking'}
    if(getOneGasto.tipo === 'Lavada'){tipoGasto = 'local-car-wash'}
    if(getOneGasto.tipo === 'Repuestos'){tipoGasto = 'car-wrench'}
    if(getOneGasto.tipo === 'Mantenimiento'){tipoGasto = 'car-repair'}
    }
    const handleEdit=()=>{
      setModalVisible2(true)
    }
  

    return(
      <>
        <Pressable onPress={()=> setModalVisible(false)}  style={styles.centeredView}>
              <View style={styles.modalView}>
               {getOneGasto &&
               <>
               <View style={{width:'100%', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
          <Image    style={{width:30, height:30,transform: [{rotate:'180deg'}]}} source={require('../../../assets/iconTriangule.png')}/>
               
               {tipoGasto === 'fuel' || tipoGasto === 'car-brake-parking' || tipoGasto === "car-wrench"?
           <MaterialCommunityIcons  name={tipoGasto} size={50} color={Theme.colors.primary}  />
          : <MaterialIcons  name={tipoGasto} size={50} color={Theme.colors.primary} />}
               <Feather onPress={handleEdit} name="edit" size={25} color={Theme.colors.primary} />
          
               </View>
               <View style={{marginTop:20}}>
                <View style={styles.viewDetail}>
               <Text style={Theme.fonts.descriptionGray}>Tipo</Text>
               <Text style={Theme.fonts.descriptionBlue}>{getOneGasto.tipo}</Text>
                </View>
                <View style={styles.viewDetail}>
               <Text style={Theme.fonts.descriptionGray}>Fecha</Text>
               <Text style={Theme.fonts.descriptionBlue}>{fecha.toDateString()}</Text>
                </View>
                <View style={styles.viewDetail}>
               <Text style={Theme.fonts.descriptionGray}>Dinero Gastado</Text>
               <Text style={Theme.fonts.descriptionBlue}>$ {getOneGasto.dineroGastado}</Text>
                </View>

                {getOneGasto?.description &&
                <View style={styles.viewDetail}>
                <Text style={Theme.fonts.descriptionGray}>Descripcion</Text>
                <Text style={Theme.fonts.descriptionBlue}> {getOneGasto.description}</Text>
                 </View>
                }
                {getOneGasto?.lugar &&
                <View style={styles.viewDetail}>
                <Text style={Theme.fonts.descriptionGray}>Lugar</Text>
                <Text style={Theme.fonts.descriptionBlue}>{getOneGasto.lugar}</Text>
                 </View>
                }
                {getOneGasto?.imagen &&
                <View style={{flexDirection:'column'}}>
                <Text style={Theme.fonts.descriptionGray}>Factura</Text>
                    <Image   style={{
                    width: '100%',
                    height: 300, borderBottomLeftRadius:20, borderBottomRightRadius:20,}} source={{uri:'data:image/png;base64,'+ getOneGasto.imagen}}/>
                </View>
                }
                
                

               </View>
               </>
               }
             
              </View>

          </Pressable>
           <Modal
           animationType="fade"
           transparent={true}
           visible={modalVisible2}
         >
             <ModalCreateGasto setModalVisible2={setModalVisible2} id={id} item={getOneGasto}/>
         </Modal>
         </>
    )
}

const styles = StyleSheet.create({
    centeredView: {
      justifyContent: "center",
      backgroundColor:'rgba(0,0,0,0.5)',
      height: '100%',
      width:'100%',

    },
    modalView: {
    //   margin: 20,
    //   backgroundColor: "#f3f3f3",
    //   borderRadius: 20,
      padding: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      position: "absolute",
      bottom: 0,
      width:'100%',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      backgroundColor:'white',

    },
    modalView2: {
   
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        position: "absolute",
        bottom: 0,
        height: 150,
        paddingHorizontal:10,
        width:'100%',
        borderTopLeftRadius: 20,
        alignItems: "center",
        borderTopRightRadius: 20,
        backgroundColor: "#f3f3f3",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
      },
      viewDetail:{
        marginTop:20, flexDirection:'row', justifyContent:'space-between',width:'100%'
      }
  });