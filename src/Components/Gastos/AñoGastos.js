import {View, Text, FlatList, Pressable} from 'react-native'
import { Theme } from '../../theme'
import MesGastos from './MesGastos'
import { useState } from 'react'

export default function AñoGastos({data}){
    let meses =[[],[],[],[],[],[],[],[],[],[],[],[]]
    let totalesGastos = [[],[],[],[],[],[],[],[],[],[],[],[]]
    let [year, setYear] = useState(0)
    data[year]?.filter(el=> {
        let month = new Date(el.fecha).getMonth()
        return meses[month].push(el)
      })
    for(let gasto of meses){
        if(gasto.length>0){
            let total = 0
            let month;
            for(let gas of gasto){
            month = new Date(gas.fecha).getMonth()

                total += parseFloat(gas.dineroGastado.replace(/\./g, ""))
            }
            totalesGastos[month].push(total)
        }
        }
        
    function Render(item){
        let month;
        if(item.length >0){
             month = new Date(item[0]?.fecha).getMonth()
        }
            return(
                item.length >0 &&
                    <MesGastos data={item} month={month}/>
            )
        }
    return(
        <>
        <View style={{backgroundColor:"#f1f1f1",marginBottom:20,paddingHorizontal:10, height:30, width:'100%', flexDirection:'row', justifyContent:'space-between', alignItems:'center', borderRadius:10,shadowRadius: 5.46,
        shadowOpacity: 0.3,
        shadowOffset: {
          width: 2,
          height: 2,
          shadowColor: "#000",
        }}}>
            
            <Pressable onPress={()=> setYear(0)} style={[Theme.containers.containerTiempo, {backgroundColor:year === 0 ? 'white': null}]}>
            <Text style={Theme.fonts.descriptionBlue}>2022</Text>
            </Pressable>
            {/* {data.length >0 &&
             <Pressable onPress={()=> setYear(1)} style={[Theme.containers.containerTiempo, {backgroundColor:year === 1 ?'white': null}]}>
             <Text style={Theme.fonts.descriptionBlue}>2023</Text>
             </Pressable>
            } */}
           
        </View>
        <FlatList
            style={{width:'100%', height:'100%'}}
            renderItem={({ item })=> Render(item) }
            data={meses}
            />
            </>
            
            
            
            
            
    )
}