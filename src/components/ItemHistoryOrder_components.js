import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, StyleSheet, Image, Button } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import { Swipeable } from 'react-native-gesture-handler';
import IconDelete from '../accets/svg_g/delete.svg'
export const ItemHistoryOrder = ({ orderData, nav, funDelete }) => {


    const [selectedOrder, setSelectedOrder] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    // Hiển thị danh sách các chi tiết đơn hàng trong Modal
    const renderOrderDetail = ({ item }) => (
        <TouchableOpacity
            onPress={() => {
                setModalVisible(false)
                nav.navigate('detailProduct', { id: item.productID });
            }}
        >
            <View style={[st.detailContainer, st.shadow]}>
                <Image source={{ uri: item.image[0] }} style={st.image} />
                <Text style={st.productName}>{item.productName}</Text>
                <Text>Size: {item.size}</Text>
                <Text>Số lượng: {item.quantity}</Text>
                <Text>{item.totalAmount.toLocaleString()} VND</Text>
            </View>
        </TouchableOpacity>
    );

    const right = () => {

        return orderData.status == 1 ? (
            <View style={{ height: '100%', justifyContent: 'center', width: 70 }}>
                <TouchableOpacity
                    onPress={() => { funDelete(orderData.orderID, orderData.status) }}
                >


                    <IconDelete width={SIZES.iconS1} height={SIZES.iconS1} />
                </TouchableOpacity>
            </View>
        ) : <></>

    }

    return (
        <Swipeable
            renderRightActions={right}
        >
            <View style={st.container}>
                {/* Danh sách đơn hàng */}
                <TouchableOpacity
                    style={st.orderItem}
                    onPress={() => {
                        setSelectedOrder(orderData);
                        setModalVisible(true);
                    }}
                >
                    <Text style={st.orderText}>Đơn hàng ID: {orderData.orderID}</Text>
                    <Text style={st.orderText}>Người nhận: {orderData.name}</Text>
                    <Text style={st.orderText}>Địa chỉ: {orderData.address}</Text>
                    <Text style={st.orderText}>SĐT: {orderData.phoneNumber}</Text>
                    <Text style={st.orderText}>Tổng tiền: {orderData.sumPrice.toLocaleString()} VNĐ</Text>
                    <Text style={st.orderText}>Time: {orderData.time}</Text>

                </TouchableOpacity>

                {/* Modal chi tiết đơn hàng */}
                <Modal
                    visible={modalVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={[st.modalContainer, st.shadow]}>
                        <View style={st.modalContent}>
                            <Text style={st.modalTitle}>Chi tiết đơn hàng {selectedOrder?.orderID}</Text>
                            <FlatList
                                data={selectedOrder?.listDetail}
                                renderItem={renderOrderDetail}
                                keyExtractor={(item) => item.id.toString()}
                                style={{ width: '100%' }}

                            />
                            <Button title="Đóng" onPress={() => setModalVisible(false)} />
                        </View>
                    </View>
                </Modal>
            </View>
        </Swipeable>
    );
};

const st = StyleSheet.create({
    container: {
        width: '90%',
        backgroundColor: 'white',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderStyle: 'dashed',
        margin: 'auto',
        marginVertical: 20
    },
    // orderItem: {
    //     padding: 15,
    //     marginVertical: 10,
    //     borderRadius: 8,
    // },
    orderText: {
        fontSize: 16,
        marginBottom: 5,
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        width: SIZES.W * 0.9,
        height: SIZES.H * 0.8,
        marginVertical: SIZES.H * 0.2 / 2,
        margin: 'auto'
    },
    modalContent: {
        width: '100%',
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        padding: 20,
        alignItems: 'center',
        height: '100%'

    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    detailContainer: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 8,
        width: '70%',
        marginVertical: 5,
        alignItems: 'center',
        margin: 'auto'
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    shadow: {
        elevation: 4,
        shadowColor: COLORS.DeepSkyBlue,
        shadowOpacity: 0.7,
        shadowRadius: 10,
    }
});

