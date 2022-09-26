import {Modal, View, Text, StyleSheet, Pressable, TextInput, Image, Alert,TouchableOpacity} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, {useEffect, useLayoutEffect, useState} from "react";
import { gql, useLazyQuery } from '@apollo/client';
import { Theme } from '../../theme';
import { FontAwesome5 } from '@expo/vector-icons'; 
import ModalConfirmDelete from '../../utils/ModalConfirmDelete';
import { GET_RECORDATORIO } from '../../graphql/querys';


export default function ModalDetailsRecordatorio({id, setModalVisible}){
    const [getOne, {data, loading, error}] = useLazyQuery(GET_RECORDATORIO)
    let fecha = new Date(data?.getOneRecordatorio?.fecha)
    const [visibleDelete, setVisibleDelete] = useState(false)

    const getOneRecordatorio = data?.getOneRecordatorio
    useLayoutEffect(()=>{
        if(id){
            getOne({variables:{id:id}})
        }
      },[])
      
    return(
        <>
        <Pressable onPress={()=> setModalVisible(false)}  style={styles.centeredView}>
              <View style={styles.modalView}>
               {getOneRecordatorio &&
               <>
               <View style={{width:'100%', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
               <MaterialIcons onPress={()=> setVisibleDelete(true)}  name="delete-outline" size={30} color={Theme.colors.primary} />
               <Text style={Theme.fonts.titleBlue}>Recordatorio</Text>

               {/* <Feather onPress={handleEdit} name="edit" size={25} color={Theme.colors.primary} /> */}
               <FontAwesome5 name="bell" size={24} color={Theme.colors.primary} />
          
               </View>
               <View style={{marginTop:20}}>

               <View style={styles.viewDetail}>
               <Text style={Theme.fonts.descriptionGray}>Titulo</Text>
               <Text style={Theme.fonts.descriptionBlue}>{getOneRecordatorio.titulo}</Text>
                </View>

                <View style={styles.viewDetail}>
               <Text style={Theme.fonts.descriptionGray}>Fecha</Text>
               <Text style={Theme.fonts.descriptionBlue}>{fecha.toDateString()}</Text>
                </View>
                

                {getOneRecordatorio?.description &&
                <View style={[styles.viewDetail,{width:'100%', alignItems:'center',justifyContent:'space-between' }]}>
                <Text style={Theme.fonts.descriptionGray}>Descripcion</Text>
                <Text style={[Theme.fonts.descriptionBlue,{width:'60%'}]}> {getOneRecordatorio.description}</Text>
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
           visible={visibleDelete}
         >
             <ModalConfirmDelete setVisibleDelete={setVisibleDelete} id={id}  setModalVisible={setModalVisible}/>
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