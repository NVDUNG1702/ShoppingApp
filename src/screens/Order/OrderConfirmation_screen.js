import { Alert, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Header_components from '../../components/Header_components'
import IconBack from '../../accets/svg_g/arrow-left.svg'
import { useSelector } from 'react-redux';
import { userLoginSelector } from '../../redux/selector';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import { Defs, LinearGradient, Path, Pattern, Polygon, Rect, Stop, Svg } from 'react-native-svg';
import { SIZES } from '../../constants/theme';
import { deliveryInfoAPI } from '../../service/api/deliveryInfo/deliveryInfo';
import { orderAPI } from '../../service/api/order/API_Order';
import { formatCurrency } from '../../untils/toPrice';
import Button_customer from '../../components/Button_customer';



export default function OrderConfirmation_screen({ navigation }) {
    const userLogin = useSelector(userLoginSelector);

    const [deliveryInfos, setDeliveryInfos] = useState();

    const [deliveryFocused, setDeliveryFocused] = useState(0)

    const [cart, setCart] = useState();
    const [sumPrice, setSumPrice] = useState(0);


    const pay = async () => {
        const res = await orderAPI.pay(cart[0].orderID, deliveryInfos[deliveryFocused].id)
        // console.log(res);

        if (res.status == 200) {
            Alert.alert("Success", "Đặt hàng thành công", [
                {
                    text: 'Ok',
                    onPress: () => {
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [
                                    { name: 'bottom' }, // Thay 'Home' bằng tên của màn hình chính của bạn
                                ],
                            })
                        );
                    }
                }
            ]);

        }
    }


    useFocusEffect(
        useCallback(() => {
            const getData = async () => {
                try {
                    const res = await deliveryInfoAPI.getAll(userLogin.id);
                    setDeliveryInfos(res.data)
                    const data = await orderAPI.getCartByID(userLogin.id, '')
                    setCart(data)
                    const sum = data.reduce((accumulator, item) => accumulator + item.totalAmount, 0);
                    setSumPrice(sum);
                } catch (error) {

                }

            }

            getData()
            setTimeout(() => {
                // console.log(deliveryInfos);
                // console.log(cart);
                // console.log(sumPrice);



            }, 3000)

        }, [])
    )
    // useEffect(() => {
    //     console.log("open");

    // }, [])

    const renderDelivery = () => {
        return deliveryInfos.map((item, i) => {
            return (
                <View style={{ backgroundColor: i == deliveryFocused ? 'black' : 'white', width: 100, height: 30, justifyContent: 'center', alignItems: 'center', marginHorizontal: 10, }} key={i}>
                    <TouchableOpacity
                        onPress={() => setDeliveryFocused(i)}
                    >
                        <Text style={{ color: i != deliveryFocused ? 'black' : 'white' }}>Thông tin: {i + 1}</Text>
                    </TouchableOpacity>
                </View>
            )
        })
    }

    const renderDetail = (item) => {
        return (
            <View style={{ width: '100%', padding: 20, borderWidth: 1, borderStyle: 'dashed', marginVertical: 20, flexDirection: 'row', justifyContent: 'space-around' }}>
                <Image source={{ uri: item.image[0] }} width={100} height={100} />
                <View>
                    <Text style={[st.textTitle]}>Tên sản phẩm: <Text style={[st.textContents]}></Text>{item.productName}</Text>
                    <Text style={[st.textTitle]}>SIZE: <Text style={[st.textContents]}></Text>{item.size}</Text>
                    <Text style={[st.textTitle]}>Số lượng: <Text style={[st.textContents]}></Text>{item.quantity}</Text>
                    <Text style={[st.textTitle]}>Tổng: <Text style={[st.textContents]}></Text>{formatCurrency(item.totalAmount)}</Text>

                </View>
            </View>
        )
    }


    const goBack = () => {
        navigation.goBack()
    }

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <Header_components lable={'Xác nhận đơn hàng'} IconLeft={IconBack} funLeft={goBack} />
            {/* <ScrollView style={{ width: '100%' }}>
                <View style={{ width: '90%', marginTop: 30, margin: 'auto' }}>
                    <Text style={[st.title]}>Thông tin giao hàng:</Text>
                    <View style={{ width: '100%', flexDirection: 'row', marginVertical: 20 }}>
                        {deliveryInfos != '' && deliveryInfos != undefined ? renderDelivery() : <></>}
                    </View>
                    <View style={{ width: '100%', padding: 20, borderWidth: 1, borderStyle: 'dashed' }}>
                        {deliveryInfos != '' && deliveryInfos != undefined ? (
                            <>
                                <Text style={[st.textTitle]}><Text style={[st.textContents]}>Tên người nhận:</Text> {deliveryInfos[deliveryFocused].recipientName}</Text>
                                <Text style={[st.textTitle]}><Text style={[st.textContents]}>Địa chỉ:</Text> {deliveryInfos[deliveryFocused].address}</Text>
                                <Text style={[st.textTitle]}><Text style={[st.textContents]}>Số điện thoại:</Text> {deliveryInfos[deliveryFocused].phoneNumber}</Text>
                                <Text style={[st.textTitle]}><Text style={[st.textContents]}>Ghi chú:</Text> {deliveryInfos[deliveryFocused].note}</Text>
                            </>
                        ) : <></>}
                    </View>

                    <View style={{ width: '100%', marginTop: 30 }}>
                        <Text style={[st.title]}>Thông tin sản phẩm</Text>
                        {
                            cart != '' && cart != undefined ? (
                                <>
                                    <FlatList
                                        data={cart}
                                        renderItem={({ item }) => renderDetail(item)}
                                        keyExtractor={item => item.detailID}
                                    />
                                </>
                            ) : <></>
                        }
                    </View>

                </View>
            </ScrollView> */}
            <FlatList
                data={cart}
                renderItem={({ item }) => renderDetail(item)}
                keyExtractor={item => item.detailID}
                ListHeaderComponent={
                    <View style={{ width: '100%', marginTop: 30, margin: 'auto' }}>
                        <Text style={[st.title]}>Thông tin giao hàng:</Text>
                        <View style={{ width: '100%', flexDirection: 'row', marginVertical: 20 }}>
                            {deliveryInfos != '' && deliveryInfos != undefined ? renderDelivery() : null}
                        </View>
                        <View style={{ width: '100%', padding: 20, borderWidth: 1, borderStyle: 'dashed' }}>
                            {deliveryInfos != '' && deliveryInfos != undefined ? (
                                <>
                                    <Text style={[st.textTitle]}><Text style={[st.textContents]}>Tên người nhận:</Text> {deliveryInfos[deliveryFocused].recipientName}</Text>
                                    <Text style={[st.textTitle]}><Text style={[st.textContents]}>Địa chỉ:</Text> {deliveryInfos[deliveryFocused].address}</Text>
                                    <Text style={[st.textTitle]}><Text style={[st.textContents]}>Số điện thoại:</Text> {deliveryInfos[deliveryFocused].phoneNumber}</Text>
                                    <Text style={[st.textTitle]}><Text style={[st.textContents]}>Ghi chú:</Text> {deliveryInfos[deliveryFocused].note}</Text>
                                </>
                            ) : null}
                        </View>

                        <Text style={[st.title, { marginTop: 30 }]}>Thông tin sản phẩm:</Text>
                    </View>
                }
                ListFooterComponent={<View style={{ height: 30 }} />}
            />

            <Button_customer lable={'Pay now: ' + formatCurrency(sumPrice)} fun={pay} />
        </View>
    )
}

const st = StyleSheet.create({
    container_contents: {

    },
    title: {
        fontSize: SIZES.h3,
        fontWeight: '600'
    },
    textTitle: {
        fontSize: SIZES.h4,
        fontWeight: '600',
        marginVertical: 5
    },
    textContents: {
        fontWeight: '400'
    },
})