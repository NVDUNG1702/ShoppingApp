import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { SIZES } from '../../../constants/theme'
import { FlashList } from '@shopify/flash-list'
import HeartIconOutline from '../../../accets/home/svg_home/heart_outline_item.svg';
import { products } from '../../../datas/dataProduct';
import { getRandomColor } from '../../../untils/randomColor';




const showProduct = (id, nav) => {
    nav.navigate('detailProduct', { id });
};

const ItemProduct = React.memo(({ item, nav }) => {
    const [color, setColor] = useState(getRandomColor())

    return (
        <View style={[st.itemContainer, { backgroundColor: color }]}>
            <TouchableOpacity onPress={() => showProduct(item.productId, nav)}>
                <Image source={{ uri: item.image[0] }} style={st.image} resizeMode="cover" />
                <View style={st.textContainer}>
                    <Text style={st.itemText}>{item.productName}</Text>
                    <TouchableOpacity>
                        <HeartIconOutline width={20} height={20} fill={'red'} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </View>
    );
});

const ShowProductsByType = ({ data, nav, type, search }) => {

    const [list, setList] = useState([])
    useEffect(() => {
        if (Array.isArray(data?.data)) {
            const filteredData = data.data.filter(item => {
                const matchType = type === 'All' || item.typeName === type;
                const matchSearch = item.productName.toLowerCase().includes(search.toLowerCase());
                return matchType && matchSearch;
            });

            setList(filteredData);
        }
    }, [type, data, search])

    const renderItem = useCallback(({ item }) => {
        if (type == 'All') {
            return <ItemProduct item={item} nav={nav} />;
        } else if (type == item.typeName) {
            return <ItemProduct item={item} nav={nav} />;
        }
    }, [nav]);

    return (
        <View style={[st.container, {}]}>

            <View style={{ width: '100%', height: SIZES.H * 0.7, flexDirection: 'row', flexWrap: 'wrap', paddingBottom: SIZES.H * 0.14 }}>
                <FlashList
                    data={list}
                    renderItem={renderItem}
                    // horizontal
                    numColumns={2}
                    keyExtractor={item => item.productId.toString()}
                    estimatedItemSize={200}
                />
            </View>
        </View>
    );
};

export default ShowProductsByType;


const st = StyleSheet.create({
    container: {
        width: '90%',
        // height: 400,
        justifyContent: 'space-around',
        // marginBottom: 20
        // paddingBottom: 200
        // backgroundColor: 'black'
    },
    title: {
        fontSize: SIZES.h3,
        fontWeight: '500'
    },
    itemContainer: {
        width: 160,
        height: 200,
        backgroundColor: 'white',
        marginHorizontal: 15,
        borderRadius: 20,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 7,
        shadowOffset: { width: 2, height: 3 },
        alignItems: 'center',
        marginVertical: 15,
        paddingTop: 10
    },
    image: {
        width: 120,
        height: '80%',
    },
    textContainer: {
        width: '80%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 10
    },
    itemText: {

    }
})
