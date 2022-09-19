import { View, Text, Pressable, BackHandler, Image, Dimensions } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import { Theme } from '../../theme';



export default function UserInfo({user}){
    const { width,height } = Dimensions.get('window');
    console.log(user);
    return(
        <View style={{width:'90%',marginVertical:20, flexDirection:'row', alignItems:'center'}}>
            <View style={{marginRight:'5%'}}>
            {user?.avatar
           ?<Image style={{
             resizeMode:'cover',
             borderRadius:20,
           width: '100%',
           height: 230}} source={{uri:'data:image/png;base64,'+ user?.avatar}}/>
          :
            <View style={{backgroundColor:'#b1b1b1',borderRadius:'50%', width:60, height:60, alignItems:'center', justifyContent:'center'}}>
          <FontAwesome5  name={'user-alt'} size={30} color={"white"} />
                </View>
           }
            </View>
            <View>
                <Text style={Theme.fonts.titleBlue}>{user?.name}</Text>
                <Text style={Theme.fonts.descriptionGray}>Pais/Ciudad</Text>
                <Text style={Theme.fonts.descriptionGray}>{user?.role}</Text>
            </View>
        </View>
    )
}