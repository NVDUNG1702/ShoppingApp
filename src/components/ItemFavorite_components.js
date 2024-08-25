import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SIZES } from '../constants/theme'
import { Swipeable } from 'react-native-gesture-handler'
import IconDelete from '../accets/svg_g/delete.svg'
import { formatCurrency } from '../untils/toPrice'
import { getRandomColor } from '../untils/randomColor'
export default function ItemFavorite_components({ data, onPressDelete, onPressShowDetail }) {



    const [colorRandom, setColorRandom] = useState(getRandomColor())

    const right = () => {
        return (
            <TouchableOpacity
                onPress={()=>{
                    onPressDelete(data.id)
                }}
            >
                <View style={{ height: 100, width: 100, justifyContent: 'center', alignItems: 'center' }}>
                    <IconDelete width={SIZES.iconS1} height={SIZES.iconS1} />
                </View>
            </TouchableOpacity>
        )
    }



    return (
        <Swipeable
            renderRightActions={right}
        >
            <TouchableOpacity
                onPress={() => { onPressShowDetail(data.productID)}}
                style={{ overflow: 'visible' }}
            >
                <View style={[st.container, st.shadow, {backgroundColor:colorRandom}]}>
                    <View style={{ width: 100, height: 100, overflow: 'hidden', borderStartStartRadius: 16, borderBottomLeftRadius: 16 }}>
                        <Image source={{ uri: data.image[0] }} width={100} height={100} />
                    </View>
                    <View style={[st.contents]}>
                        <Text style={[st.textName]}>{data.name}</Text>
                        <Text>{formatCurrency(data.price)}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </Swipeable>
    )
}

const st = StyleSheet.create({
    container: {
        width: SIZES.W * 0.9,
        height: 100,
        backgroundColor: 'white',
        borderRadius: 16,
        margin: 'auto',
        marginVertical: 15,
        flexDirection: 'row'
        // overflow: 'hidden'
    },
    shadow: {
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 1 },
        shadowRadius: 7,
        shadowOpacity: 0.2
    },
    contents: {
        marginStart: 30,
        justifyContent: 'center'
    },
    textName: {
        fontSize: SIZES.h3,
        fontWeight: '600',
        marginBottom: 10
    }
})