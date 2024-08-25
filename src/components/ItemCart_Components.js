import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useState } from 'react'
import { COLORS, SIZES } from '../constants/theme'
import { formatCurrency } from '../untils/toPrice'
import { Swipeable } from 'react-native-gesture-handler'
import IconAdd from '../accets/svg_g/add.svg';
import IconRemove from '../accets/svg_g/remove.svg';
import IconDelete from '../accets/svg_g/delete.svg'
import { getRandomColor } from '../untils/randomColor'



export default memo(function ItemCart_Components({ data, onPressShowDetail, update, funDelete }) {

    const { productID, orderID, sizeID } = data;

    const [quantity, setQuantity] = useState(data.quantity)

    const [rColor, setRColor] = useState(getRandomColor())

    const showRight = () => {
        return (
            <TouchableOpacity

            >
                <View style={{ width: 100, height: '100%', justifyContent: 'center' }}>
                    <IconDelete width={SIZES.iconS1} height={SIZES.iconS1} />
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <Swipeable
            renderRightActions={showRight}
        >
            <TouchableOpacity
                onPress={() => { onPressShowDetail(data.productID) }}
                style={{ overflow: 'visible' }}
            >
                <View style={[st.container, st.shadow, { backgroundColor: rColor }]}>
                    <View style={{ width: 100, height: 100, overflow: 'hidden', borderStartStartRadius: 16, borderBottomLeftRadius: 16 }}>
                        <Image source={{ uri: data.image[0] }} width={100} height={100} />
                    </View>
                    <View style={[st.contents]}>
                        <Text style={[st.textName]}>{data.productName}</Text>
                        <Text>Size: {data.size}</Text>
                        <Text>{formatCurrency(data.totalAmount)}</Text>
                        <Text>kho: {data.totalQuantity}</Text>
                    </View>
                    <View style={[st.editQuantity]}>
                        <TouchableOpacity
                            onPress={() => {

                                if (data.quantity == 1) {
                                    Alert.alert("Delete Product", "Xác nhận xoá sản phẩm !", [
                                        {
                                            text: 'cancel',
                                            style: 'cancel'
                                        },
                                        {
                                            text: 'Yes',
                                            onPress: () => { update(productID, orderID, sizeID, -1) }
                                        }
                                    ])
                                } else {
                                    update(productID, orderID, sizeID, -1)
                                }
                            }}
                        >
                            <IconRemove width={SIZES.iconS1} height={SIZES.iconS1} fill={COLORS.white} stroke={COLORS.black} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: SIZES.h3, fontWeight: '600', marginHorizontal: 10 }}>
                            {data.quantity}
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                update(productID, orderID, sizeID, 1)
                            }}
                        >
                            <IconAdd width={SIZES.iconS1} height={SIZES.iconS1} fill={COLORS.white} stroke={COLORS.black} />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        </Swipeable>
    )
}
)
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
    },
    editQuantity: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 20,
        height: 20,
        top: (100 - 20) / 2
    }
})