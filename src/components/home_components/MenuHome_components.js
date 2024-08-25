import { FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useState } from 'react'
import IconShoes from '../../accets/home/svg_home/shoes.svg';
import IconShirt from '../../accets/home/svg_home/shirt.svg';
import IconAll from '../../accets/home/svg_home/all.svg'
import IconPants from '../../accets/home/svg_home/pants.svg'
import IconHat from '../../accets/home/svg_home/hat.svg'
import IconSandal from '../../accets/home/svg_home/sandals.svg'
import IconDress from '../../accets/home/svg_home/dress.svg'


import { COLORS, SHADOW } from '../../constants/theme';
export default memo(function MenuHome_components({focused, setFocused}) {
    // const [focused, setFocused] = useState(0);
    const data = [
        {
            id: 8,
            title: 'All',
            icon: IconAll
        },
        {
            id: 0,
            title: 'Pants',
            icon: IconPants
        },
        {
            id: 1,
            title: 'Shirt',
            icon: IconShirt
        },
        {
            id: 2,
            title: 'Hat',
            icon: IconHat
        },
        {
            id: 3,
            title: 'Shoes',
            icon: IconShoes
        },
        {
            id: 4,
            title: 'Sandals',
            icon: IconSandal
        },
        {
            id: 5,
            title: 'Dress',
            icon: IconDress
        },

    ];

    const sizeIcon = 40;

    const renderItem = (item) => {
        const checkFocused = item.title == focused;
        return (
            <TouchableOpacity
                onPress={() => { setFocused(item.title) }}
                activeOpacity={Platform.OS == 'ios' ? 0 : 1}
            >
                <View style={[st.itemContainer, focused == item.title ? SHADOW.shadow('black', 2, 4, 5, 0.3, 5) : SHADOW.shadow('black', 2, 1, 2, 0.1, 1)]}>
                    <item.icon width={sizeIcon} height={sizeIcon} fill={COLORS.DeepSkyBlue} />
                    {checkFocused && <Text style={[st.text]}>{item.title}</Text>}
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={[st.container]}>
            <FlatList
                data={data}
                renderItem={({ item }) => renderItem(item)}
                horizontal
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
})

const st = StyleSheet.create({
    container: {
        width: '90%',
        height: 100,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemContainer: {
        width: 70,
        height: 75,
        // backgroundColor: 'grba(0, 0, 0, 1)',
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },
    text: {
        fontWeight: '700',
        color: COLORS.DeepSkyBlue
    }
})