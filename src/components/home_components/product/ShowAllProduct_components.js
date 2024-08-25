import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SIZES } from '../../../constants/theme'
import { FlashList } from '@shopify/flash-list'
import { products } from '../../../datas/dataProduct'
import HeartIcon from '../../../accets/home/svg_home/heart_item.svg';
import HeartIconOutline from '../../../accets/home/svg_home/heart_outline_item.svg';
import { FlatList } from 'react-native-gesture-handler'

export default function ShowAllProduct_components({ data }) {
    const ItemProduct = (item) => {
        return (
            <View style={[st.itemContainer]}>
                <TouchableOpacity>
                    <Image source={{ uri: item.images[0] }} style={[st.image]} />

                    <View
                        style={{ width: '80%', justifyContent: 'space-between', flexDirection: 'row' }}
                    >
                        <Text
                            style={{ width: '80%' }}
                        >{item.name}</Text>
                        <TouchableOpacity>
                            <HeartIconOutline width={20} height={20} fill={'red'} />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={[st.container]}>
            <Text style={[st.title]}>All product</Text>
            <FlatList
                data={products}
                renderItem={({ item }) => ItemProduct(item)}
                estimatedItemSize={200}
                horizontal
                contentContainerStyle={st.listContainer}
                showsHorizontalScrollIndicator={false}
            // numColumns={2}
            // style={{ height: '90%' }}
            />
        </View>
    )
}

const st = StyleSheet.create({
    container: {
        width: '90%',
        height: '25%',
        // backgroundColor: 'black',
        position: 'relative',
        justifyContent: 'space-around',
        // marginVertical: '5%'
    },
    title: {
        fontSize: SIZES.h3,
        fontWeight: '500'
    },
    itemContainer: {
        width: 160,
        height: '90%',
        backgroundColor: 'white',
        marginHorizontal: 15,
        borderRadius: 20,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 7,
        shadowOffset: { width: 2, height: 3 },
        // justifyContent: 'center',
        alignItems: 'center',
        // overflow: 'hidden'
    },
    listContainer: {
        paddingVertical: 20,
        // paddingHorizontal: 15
        // overflow: 'visible'
    },
    image: {
        width: 120,
        height: '80%',
        objectFit: 'cover'
    }
})