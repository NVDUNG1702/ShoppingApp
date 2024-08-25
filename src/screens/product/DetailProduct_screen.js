import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ProductAPI } from '../../service/api/product/API_Product';
import SliderComponent from '../../components/SliderComponents';
import IconClear from '../../accets/svg_g/clear.svg'
import { COLORS, SIZES } from '../../constants/theme';
import IconHeart from '../../accets/home/svg_home/heart.svg'
import IconHeartOutline from '../../accets/home/svg_home/heart_outline.svg'
import { formatCurrency } from '../../untils/toPrice';
import { FlashList } from '@shopify/flash-list';
import { ScrollView } from 'react-native-gesture-handler';
import Button_customer from '../../components/Button_customer';
import IconAdd from '../../accets/svg_g/add.svg';
import IconRemove from '../../accets/svg_g/remove.svg';
import { useSelector } from 'react-redux';
import { userLoginSelector } from '../../redux/selector';
import { orderAPI } from '../../service/api/order/API_Order';




export default function DetailProduct_screen({ route, navigation }) {

    const { id } = route.params;

    const userLogin = useSelector(userLoginSelector);

    // console.log(id);
    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState({});
    const [heart, setHeart] = useState(false)
    const [size, setSize] = useState();
    const [focusedSize, setFocuseSize] = useState(0)
    const [quantity, setQuantity] = useState(0)

    useEffect(() => {
        setLoading(true)
        try {

            const getDetailProduct = async () => {
                const res = await ProductAPI.getByID(id);
                if (res.resProduct.status == 200 && res.resSize.status == 200) {
                    let data = await res.resProduct.data.results[0]
                    data.image = await data.image
                    await setProduct(data)

                    let listSize = await res.resSize.data.data
                    await setSize(listSize)

                }

                const resFavorite = await ProductAPI.checkFavorite({ uid: userLogin.id, productID: id });
                await setHeart(resFavorite.data.data == 1)

            }
            getDetailProduct()
        } catch (error) {
            console.log(error);

        } finally {



            setLoading(false)
            // setLoading(false)
        }
    }, [])

    const backScreen = () => {
        navigation.goBack()
    }

    const updateFavorite = async () => {

        const data = await ProductAPI.addOrDelete({ uid: userLogin.id, productID: id });

        setHeart(data.data.data == 1)
    }

    const renderSize = () => {
        if (size && size.length != 0) {
            return size?.map((item, i) => {
                return (
                    <TouchableOpacity key={i} onPress={() => { setFocuseSize(i) }}>
                        <Text style={{ marginHorizontal: 10, backgroundColor: focusedSize == i ? COLORS.DeepSkyBlue : 'white', fontSize: SIZES.h4, padding: 5, color: focusedSize == i ? COLORS.white : COLORS.black, fontWeight: '500' }}>
                            {item.sizeName}
                        </Text>
                    </TouchableOpacity>
                )
            })
        }
    }

    const handlePlushQuantity = () => {
        setQuantity(quantity + 1)
    }

    const handleRemoveQuantity = () => {
        if (quantity != 0) {
            setQuantity(quantity - 1)
        }
    }


    const handleAddDetailCart = async () => {
        try {
            const resOrder = await orderAPI.checkOrder(userLogin.id, '');
            console.log(resOrder.data.code);
            if (resOrder.data.code == 1 || resOrder.data.code == 2) {
                const resDetailOrder = await orderAPI.addOrUpdate(product.productId, resOrder.data.data.id, size[focusedSize].id, quantity);
                if (resDetailOrder.data.code == 0) {
                    Alert.alert("Error", "Add Error!");
                } else if (resDetailOrder.data.code == 1) {
                    Alert.alert("Error", "Số lượng sản phẩm không đủ!");
                } else if (resDetailOrder.data.code == 3) {
                    Alert.alert("Error", "Sản phẩm trong kho đã hết sản phẩm sẽ bị xoá khỏi giỏ hàng!")
                }
            }

        } catch (error) {

        }
    }




    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            {loading || product == {} || size == undefined ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size={34} color={'red'} />
                </View>
            ) : (

                <>
                    <SliderComponent listImg={product.image} />
                    <TouchableOpacity
                        style={{ position: 'absolute', top: 45, left: 10 }}
                        onPress={backScreen}
                    >
                        <IconClear width={35} height={35} />
                    </TouchableOpacity>
                    <View style={[st.contents]}>
                        <View style={[st.containerRowTwoItems]}>
                            <Text
                                style={{ backgroundColor: COLORS.DeepSkyBlue, color: COLORS.white, padding: 5 }}
                            >{product.typeName}</Text>
                            <TouchableOpacity
                                onPress={updateFavorite}
                            >
                                {heart ? <IconHeart width={SIZES.iconS1} height={SIZES.iconS1} fill={COLORS.DeepSkyBlue} /> : <IconHeartOutline width={SIZES.iconS1} height={SIZES.iconS1} stroke={COLORS.DeepSkyBlue} />}
                            </TouchableOpacity>
                        </View>
                        <View style={[st.containerRowTwoItems, { marginVertical: 15, }]}>
                            <Text style={[st.title]}>{product.productName}</Text>
                            {
                                size != '' && (
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <TouchableOpacity
                                            onPress={handleRemoveQuantity}
                                            style={{ width: 35, height: 35, backgroundColor: COLORS.DeepSkyBlue, borderRadius: 10 }}
                                        >
                                            <IconRemove width={SIZES.iconS1} height={SIZES.iconS1} fill={COLORS.white} stroke={COLORS.white} />
                                        </TouchableOpacity>
                                        <Text style={[st.title, { marginHorizontal: 10, width: 30, textAlign: 'center' }]}>
                                            {quantity}
                                        </Text>
                                        <TouchableOpacity
                                            onPress={handlePlushQuantity}
                                            style={{ width: 35, height: 35, backgroundColor: COLORS.DeepSkyBlue, borderRadius: 10 }}
                                        >
                                            <IconAdd width={SIZES.iconS1} height={SIZES.iconS1} fill={COLORS.white} stroke={COLORS.white} />
                                        </TouchableOpacity>
                                    </View>
                                )
                            }
                        </View>
                        <View style={{ width: '90%', marginVertical: 20, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[st.title, { backgroundColor: COLORS.DeepSkyBlue, color: COLORS.white, marginRight: 10 }]}>Price: </Text>
                            <Text style={[st.title]}>{formatCurrency(product.price)}</Text>
                            <Text style={[{ textDecorationLine: 'line-through' }]}>{formatCurrency(product.price * 1.25)}</Text>
                        </View>
                        {
                            size != '' && (
                                <>
                                    <View style={{ width: '90%', flexDirection: 'row' }}>
                                        {renderSize()}
                                    </View>
                                    <ScrollView style={{ width: '90%', paddingVertical: 30 }}>
                                        <View style={{ width: '100%', backgroundColor: 'white' }}>

                                            <View style={{ width: '100%', flexDirection: 'row', marginBottom: 20 }}>
                                                <Text style={[st.title, { backgroundColor: COLORS.DeepSkyBlue, color: COLORS.white }]}>Detail: </Text>
                                            </View>
                                            <Text style={[st.textContent]}>{`- ${size[focusedSize].detailSize} số lượng: ${size[focusedSize].quantity}`}</Text>
                                            <Text style={[st.textContent]}>- {product.detail}</Text>
                                        </View>
                                    </ScrollView>
                                </>
                            )
                        }
                        <View style={{ width: '100%', position: 'absolute', bottom: 10, alignItems: 'center' }}>
                            {
                                quantity > 0 && <Button_customer lable={'ADD TO CART'} fun={handleAddDetailCart} />
                            }
                        </View>
                    </View>
                </>
            )
            }
        </View >
    )
}

const st = StyleSheet.create({
    contents: {
        width: '100%',
        height: SIZES.H * 0.7,
        alignItems: 'center',
        paddingVertical: 20
    },
    containerRowTwoItems: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontSize: SIZES.h1,
        fontWeight: '600'

    },
    textContent: {
        fontSize: SIZES.h4,
        marginVertical: 5
    }
})