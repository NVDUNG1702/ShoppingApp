import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../constants/theme'

export default function CategoryList_components() {
    return (
        <View style={[st.container]}>
            <View style={[st.header]}>
                <Text style={[st.title]}>T - Shirt</Text>
                <TouchableOpacity>
                    <Text style={[st.link]}>See all</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const st = StyleSheet.create({
    container: {
        width: '90%',
        height: 200,
        // backgroundColor: 'black'
        borderWidth: 1,
        alignItems: 'center',
        padding: 10
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontSize: SIZES.h4,
        fontWeight: '600'
    },
    link: {
        textDecorationLine: 'underline',
        fontSize: SIZES.h5,
        color: COLORS.GrayLight
    }
})