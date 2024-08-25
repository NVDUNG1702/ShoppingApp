import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header_components from '../../components/Header_components'
import IconBack from '../../accets/svg_g/arrow-left.svg'


export default function EditPassword_screen({ navigation }) {
    const funBack = () => [
        navigation.goBack()
    ]
    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <Header_components
                lable='Đổi mật khẩu'
                IconLeft={IconBack}
                funLeft={funBack}
            />

            <View style={[st.containerContents]}>

            </View>
        </View>
    )
}

const st = StyleSheet.create({
    containerContents: {
        width: '100%',
        height: '90%',
        backgroundColor: 'black'
    }
})