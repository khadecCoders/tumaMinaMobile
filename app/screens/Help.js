import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Card, Divider, Text } from 'react-native-paper'
import myTheme from '../utils/theme';
import { useLogin } from '../utils/LoginProvider';
import Header from '../Components/Header';
import {
    MaterialIcons,
    AntDesign,
    MaterialCommunityIcons
  } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

const Help = ({ navigation }) => {
    const {navigate} = useNavigation();
    const { COLORS, screenHeight, screenWidth, STYLES } = myTheme();

    const BackHandler = () => (
        <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', borderRadius: 60, paddingRight: 0}} onPress={() => {
                navigate('More')
            }}>
                <AntDesign color={COLORS.outline} name='left' size={18}/>
            </TouchableOpacity>
        </View>
       )

  return (
    <View style={[styles.container,  {backgroundColor: COLORS.surface}]}>
            <Header title='Help' titleColor={COLORS.outline} leftView={<BackHandler />}/>

            <View style={{width: '95%', padding: 10, marginTop: 8}}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5, paddingVertical: 8}}>
                    <Text style={STYLES.textNormal}>tumamina2024@gmail.com</Text>
                    <MaterialIcons name="email" size={25} color={COLORS.outline} />
                </View>
                <Divider />
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5, paddingVertical: 8}}>
                    <Text style={STYLES.textNormal}>+263 77 163 1412</Text>
                    <MaterialIcons name="phone" size={25} color={COLORS.outline} />
                </View>
                <Divider />
                {/* <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5, paddingVertical: 8}}>
                    <Text style={STYLES.textNormal}>www.tumaminaweb.com</Text>
                    <MaterialCommunityIcons name="web" size={25} color={COLORS.outline} />
                </View> */}
                <Divider />
            </View>
    </View>
  )
}

export default Help

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: 15
    },
})