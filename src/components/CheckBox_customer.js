import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../constants/theme';
import IconSuccess from '../accets/auth/success.svg';
export default function CheckBox_customer({ size, check, setCheck}) {
    // const [check, setCheck] = useState(false);


    return (
        <TouchableOpacity style={[{ width: size, height: size }]}
            onPress={() => {
                setCheck(!check)
            }}
        >
            <View style={[st.container]}>
                {
                    check && (
                        <IconSuccess width={size - 3} height={size - 3} fill={COLORS.DeepSkyBlue} />
                    )
                }
            </View>
        </TouchableOpacity>
    )
}

const st = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderRadius: 5,
        borderColor: COLORS.DeepSkyBlue,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})