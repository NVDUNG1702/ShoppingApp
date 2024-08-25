import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { COLORS, SIZES } from '../constants/theme'

export default memo(function Header_components({ lable, IconLeft, funLeft, funRight, IconRight }) {
    return (
        <View style={[st.container,]}>
            <View style={[st.containerLeftRight]}>
                <TouchableOpacity
                    onPress={funLeft}
                >
                    {IconLeft && <IconLeft width={SIZES.iconS2} height={SIZES.iconS2} fill={COLORS.black} />}
                </TouchableOpacity>
            </View>
            <View style={[st.containerCenter]}>
                <Text style={[st.title]}>
                    {lable}
                </Text>
            </View>
            <View style={[st.containerLeftRight]}>
                <TouchableOpacity
                    onPress={funRight}
                >
                    {IconRight && <IconRight width={SIZES.iconS2} height={SIZES.iconS2} fill={COLORS.black} stroke={COLORS.black} />}
                </TouchableOpacity>
            </View>
        </View>
    )
})

const st = StyleSheet.create({
    containerLeftRight: {
        width: '10%',
        height: '100%',
        // backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',

    },
    containerCenter: {
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',


    },
    container: {
        width: '100%', height: SIZES.H * 0.05,
        // backgroundColor: COLORS.DeepSkyBlue,
        marginTop: SIZES.H * 0.05,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    title: {
        fontSize: SIZES.h1,
        color: COLORS.black,
        fontWeight: '600'
    },

})