import { View, Text, Pressable, BackHandler, Image, Dimensions } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import { Theme } from '../../theme';



export default function UserInfo({user}){
    const { width,height } = Dimensions.get('window');
    return(
        <View style={{width:'90%',marginVertical:20, flexDirection:'row', alignItems:'center'}}>
            <View style={{marginRight:'5%'}}>
            {user?.avatar
           ?<Image style={{
             resizeMode:'cover',
             borderRadius:50,
           width: 60,
           height: 60}} source={{uri:'data:image/png;base64,'+ user?.avatar}}/>
          :
            <View style={{backgroundColor:'#b1b1b1',width:60,borderRadius:50, height:60, alignItems:'center', justifyContent:'center'}}>
          <FontAwesome5  name={'user-alt'} size={30} color={"white"} />
                </View>
           }
            </View>
            <View>
                <Text style={Theme.fonts.titleBlue}>{user?.name} {user?.apellido}</Text>
                <Text style={Theme.fonts.descriptionGray}>{user?.ciudad ? user?.ciudad: 'Ciudad'}, {user?.pais ? user?.pais: 'Pais'}</Text>
                <Text style={Theme.fonts.descriptionGray}>{user?.role}</Text>
            </View>
        </View>
    )
}