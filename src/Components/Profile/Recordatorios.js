import {View, Text, Pressable,StyleSheet, Modal,Dimensions,TouchableOpacity,ScrollView} from 'react-native'
import { Theme } from '../../theme'
import FormRecordatorio from './FormRecordatorio'
import {useState} from 'react'
import { gql, useQuery } from '@apollo/client'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ModalDetailsRecordatorio from './ModalDetailsRecordatorio'
import { FontAwesome5 } from '@expo/vector-icons'; 

export const GET_RECORDATORIO =gql`
    query getRecordatorios{
        getRecordatorios{
            titulo
            description
            fecha
            id
        }
    }
`
export default function Recordatorios({name}){
    const [visibleCreate, setVisibleCreate] = useState(false)
    const result = useQuery(GET_RECORDATORIO)
    const [modalVisible, setModalVisible] = useState(false)
    const [details, setDetails] = useState(null)

    const handleDetails=(el)=>{
        setModalVisible(true)
        setDetails(el?.id)
    }
    return(
        
        <ScrollView style={{backgroundColor:'#f3f3f3',width:'90%', marginVertical:20, padding:10, borderRadius:20,shadowOpacity: 0.3,
      shadowRadius: 5.46,
      shadowOffset: {
        width: 2,
        height: 2,
        shadowColor: "#000",
      },}}>
            <View style={{borderRadius:10,marginBottom:5, padding:5, justifyContent:'center'}}>
              <View style={{justifyContent:'space-between', flexDirection:'row'}}>
              <Text style={[Theme.fonts.titleBig,{fontSize:18}]}>Recordatorios</Text>
              <FontAwesome5 name="bell" size={24} color={Theme.colors.primary} />
              {/* <Text onPress={()=> navigation.navigate('Gastos', {id:item.id})} style={Theme.fonts.descriptionBlue}>Ver Todo</Text> */}
              </View>

            { result?.data?.getRecordatorios?.map(el=>{
          let fecha = new Date(el.fecha) 
          const dateActual = new Date()
          let diasFaltantes = fecha.getDate() - dateActual.getDate()
              return(
        <Pressable onPress={()=> handleDetails(el)} key={el.id} style={styles.containerGasto}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
            <View style={{ flexDirection:'row'}}>
              <MaterialCommunityIcons name="file-eye-outline" size={24} color="black" style={{marginRight:5}} />
            <Text style={Theme.fonts.descriptionBlue}>{el.titulo.slice(0,20)}</Text>
            </View>
            </View>
            <View style={{justifyContent:'center', alignItems:'flex-end'}}>
            <Text style={[Theme.fonts.descriptionGray,{lineHeight:20, color:diasFaltantes <5 &&Theme.colors.primary}]}>Faltan {diasFaltantes} dias</Text>
            <Text style={[Theme.fonts.descriptionGray,{lineHeight:20}]}>{fecha.toLocaleDateString()}</Text>

              </View> 
      
          </Pressable>
              )
            }) 
            
            }
            </View>
            
            
            <TouchableOpacity style={[Theme.buttons.primary,{width:'100%'}]} onPress={()=> setVisibleCreate(true)}>
            <Text style={{color:'white', fontSize:16, fontWeight:"600"}}>Crear Recordatorio</Text>

            </TouchableOpacity>
            <Modal
          animationType="fade"
          visible={visibleCreate}
          transparent={true}
        >
        <FormRecordatorio setVisibleCreate={setVisibleCreate} name={name}/> 
        </Modal>

        <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible} 
        
      >
          <ModalDetailsRecordatorio id={details} setModalVisible={setModalVisible}/>
      </Modal>
          </ScrollView>
    )
}

const styles = StyleSheet.create({
    containerGasto:{
        backgroundColor:'white', width:'100%', flexDirection:'row',justifyContent:'space-between', borderRadius:10, height:50, padding:5, marginVertical:5, alignItems:'center'
      },
})