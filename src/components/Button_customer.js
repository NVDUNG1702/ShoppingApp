import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { memo } from 'react'
import { COLORS, SIZES } from '../constants/theme'
import LinearGradient from 'react-native-linear-gradient'

export default memo(function Button_customer({ lable, fun }) {
    return (
        <TouchableOpacity
            onPress={fun}
            style={[st.container]}
            
            
        >
            <LinearGradient
                colors={['#696eff', '#f8acff']}
                style={[st.background]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                
            >
                <Text style={[st.lable]}>
                    {lable}
                </Text>
            </LinearGradient>
        </TouchableOpacity>
    )
})

const st = StyleSheet.create({
    container: {
        height: 60,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginVertical: 15,
        backgroundColor: 'white',
        shadowColor: '#737373',
        shadowOffset: {width: -5, height: 3},
        shadowOpacity: 10,
        shadowRadius: 10,
        elevation: 5
    },
    background: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15
    },
    lable: {
        fontSize: SIZES.h0,
        fontWeight: 'bold',
        color: COLORS.royalBlue
    }
})