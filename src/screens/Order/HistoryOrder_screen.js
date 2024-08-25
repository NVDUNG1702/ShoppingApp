
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Header_components from '../../components/Header_components'
import IconBack from '../../accets/svg_g/arrow-left.svg'
import { SIZES } from '../../constants/theme'
import { ScrollView } from 'react-native-gesture-handler'
import { getRandomColor } from '../../untils/randomColor'
import { useFocusEffect } from '@react-navigation/native'
import { orderAPI } from '../../service/api/order/API_Order'
import { ItemHistoryOrder } from '../../components/ItemHistoryOrder_components'
export default function HistoryOrder_screen({ navigation }) {
    const handleBack = () => {
        navigation.goBack();
    }

    const [orders, setOrders] = useState();
    // const [color, setColor] = useState(getRandomColor())
    const [dataRender, setDataRender] = useState([])
    const [focusedStatus, setFocuseStatus] = useState(1)

    const dataMenu = [
        {
            id: 1,
            title: 'đang duyệt',
        },
        {
            id: 2,
            title: 'đóng gói',
        },
        {
            id: 3,
            title: 'giao hàng'
        },
        {
            id: 4,
            title: 'đã giao'
        },
        {
            id: 5,
            title: 'không thành công'
        }
    ]


    useFocusEffect(useCallback(() => {

        const getData = async () => {
            const data = await orderAPI.getAll();
            // console.log("data: ",);
            setOrders(data)
        }
        getData()
    }, []))

    useEffect(() => {
        if (Array.isArray(orders)) {
            const newList = orders.filter(item => item.status == focusedStatus);
            setDataRender(newList)
        }
    }, [focusedStatus, orders])

    const CancelOrder = async (id, status) => {

        if (status != 1) {
            Alert.alert("Không thể huỷ đơn!");
            return
        }
        const res = await orderAPI.cancleOrder(id);

        if (res == 200) {
            const newOrders = orders.map(order => {
                if (order.orderID == id) {
                    order.status = 5;
                    return order
                }
                return order;
            });
            setOrders(newOrders)
            Alert.alert("Huỷ thành công!");
            return;
        }
        Alert.alert("Vui lòng thử lại sau!")
    }



    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <Header_components lable='My order' IconLeft={IconBack} funLeft={handleBack} />
            <ScrollView horizontal>
                <View style={[st.menuContainer]}>
                    {dataMenu.map((item, i) => {
                        const color = getRandomColor();
                        return (
                            <TouchableOpacity

                                onPress={() => setFocuseStatus(item.id)}
                                style={{ height: 50 }}
                                key={item.id}

                            >
                                <View style={{ width: SIZES.W / 3.5, alignItems: 'center', backgroundColor: focusedStatus == item.id ? 'black' : 'white', height: 30, justifyContent: 'center', }}>
                                    <Text style={{ color: focusedStatus == item.id ? 'white' : 'black' }}>{item.title}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </ScrollView>
            <View style={{ width: '100%', height: '80%', alignItems: 'center' }}>
                {
                    orders != undefined ? <FlatList
                        data={dataRender}
                        renderItem={({ item }) => <ItemHistoryOrder orderData={item} nav={navigation} funDelete={CancelOrder} />}
                        keyExtractor={item => item.orderID}
                        style={{ width: '100%' }}
                    /> : <></>
                }
            </View>
        </View>
    )
}

const st = StyleSheet.create({
    menuContainer: {
        width: '100%',
        height: 50,
        // backgroundColor: 'black',
        flexDirection: 'row'
    }
})