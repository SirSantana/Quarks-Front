import {View, Text, FlatList} from 'react-native'
import { Theme } from '../../theme'
import MesGastos from './MesGastos'
export default function AñoGastos({data}){
    let meses =[[],[],[],[],[],[],[],[],[],[],[],[]]
    let totalesGastos = [[],[],[],[],[],[],[],[],[],[],[],[]]
    data?.filter(el=> {
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
            <FlatList
            style={{width:'100%', height:'100%'}}
            renderItem={({ item })=> Render(item) }
            data={meses}
            />
    )
}