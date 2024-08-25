import { Alert, KeyboardAvoidingView, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import Header_components from '../../components/Header_components'
import IoconLeft from '../../accets/svg_g/arrow-left.svg'
import { useSelector } from 'react-redux';
import { userLoginSelector } from '../../redux/selector';
import { useFocusEffect } from '@react-navigation/native';
import { deliveryInfoAPI } from '../../service/api/deliveryInfo/deliveryInfo';
import IconAdd from '../../accets/svg_g/add.svg';
import LottieView from 'lottie-react-native';
import { COLORS, SIZES } from '../../constants/theme';
import { FlatList, Swipeable } from 'react-native-gesture-handler';
import IconClose from '../../accets/svg_g/remove.svg';
import IconEdit from '../../accets/svg_g/edit.svg';
import IconDelete from '../../accets/svg_g/delete.svg'
import Input_customer from '../../components/Input_customer';


export default function ReceivingInformation_screen({ navigation }) {

    const userLogin = useSelector(userLoginSelector);
    const [deliveryInfo, setDeliveryInfo] = useState();
    const [addVisible, setAddVisible] = useState(false);

    

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [note, setNote] = useState('');

    const handleClickAdd = async () => {
        const res = await deliveryInfoAPI.add({ recipientName: name, address, phoneNumber, note });
        if (res.status == 201) {
            console.log(res.data);
            setDeliveryInfo([...deliveryInfo, res.data]);
            setAddVisible(false);

        } else {
            Alert.alert(
                "vui lòng thử lại sau!"
            )
        }

        setName('');
        setAddress('');
        setPhoneNumber('');
        setNote('')
    }

    const handleIconLeft = () => {
        navigation.goBack()
    }

    const handleDelete = async (id) => {
        const res = await deliveryInfoAPI.delete(id);
        if (res.status == 200) {
            const newDeleveryInfo = deliveryInfo.filter(item => item.id != id);
            setDeliveryInfo([...newDeleveryInfo])
        }
    }

    useFocusEffect(
        useCallback(() => {
            const getData = async () => {
                const res = await deliveryInfoAPI.getAll(userLogin.id);
                console.log(res.data == '');
                if (res.status == 200) {
                    setDeliveryInfo(res.data)
                }
            }

            getData()
        }, [])
    )

    const renderItem = (item) => {



        const showRight = () => {
            return (
                <View style={{ width: 100, height: '100%', justifyContent: 'space-around' }}>
                    <TouchableOpacity

                    >
                        <IconEdit width={SIZES.iconS1} height={SIZES.iconS1} stroke={COLORS.white} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            handleDelete(item.id)
                        }}
                    >
                        <IconDelete width={SIZES.iconS1} height={SIZES.iconS1} stroke={COLORS.black} />
                    </TouchableOpacity>
                </View>
            )
        }

        return (
            <Swipeable
                renderRightActions={showRight}
            >
                <View style={[st.itemContainer,]}>
                    <Text style={[st.textTitle]}><Text style={[st.textContents]}>Tên người nhận:</Text> {item.recipientName}</Text>
                    <Text style={[st.textTitle]}><Text style={[st.textContents]}>Địa chỉ:</Text> {item.address}</Text>
                    <Text style={[st.textTitle]}><Text style={[st.textContents]}>Số điện thoại:</Text> {item.phoneNumber}</Text>
                    <Text style={[st.textTitle]}><Text style={[st.textContents]}>Ghi chú:</Text> {item.note}</Text>
                </View>
            </Swipeable>
        )
    }

    // const ModalAdd = () => {
    //     return (

    //     )
    // }

    const showModalAdd = () => {
        setAddVisible(!addVisible)
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
            <Header_components lable='Thông tin nhận hàng' IconLeft={IoconLeft} funLeft={handleIconLeft} IconRight={IconAdd} funRight={showModalAdd} />
            {
                !deliveryInfo ? (
                    <>
                        <LottieView
                            autoPlay
                            source={require('../../accets/json_g/null.json')}
                            style={{ width: '90%', height: 400 }}
                        />
                    </>
                ) : (
                    <>
                        <Modal
                            animationType='slide'
                            transparent={true}
                            visible={addVisible}
                            onRequestClose={() => {
                                setAddVisible(!addVisible)
                            }}
                            style={{ width: '100%', height: '100%' }}
                        >

                            <View style={[st.modalContainer, st.shadow]}>
                                <Pressable
                                    style={[st.button, st.buttonClose]}
                                    onPress={() => setAddVisible(!addVisible)}>
                                    <IconClose width={SIZES.iconS1} height={SIZES.iconS1} stroke={COLORS.white} />
                                </Pressable>

                                <Text style={[st.textTitle, { marginVertical: 30 }]}>Thêm thông tin</Text>

                                <TextInput
                                    value={name}
                                    onChangeText={setName}
                                    placeholder='Tên người nhận'
                                    style={[st.input]}
                                />
                                <TextInput
                                    value={address}
                                    onChangeText={setAddress}
                                    placeholder='Địa chỉ người nhận'
                                    style={[st.input]}
                                />
                                <TextInput
                                    value={phoneNumber}
                                    onChangeText={setPhoneNumber}
                                    placeholder='Số điện thoại người nhận'
                                    style={[st.input]}
                                />
                                <TextInput
                                    value={note}
                                    onChangeText={setNote}
                                    placeholder='Ghi chú'
                                    style={[st.input, { height: 100 }]}
                                    multiline={true}
                                />

                                {
                                    name.trim() == '' || address.trim() == '' || phoneNumber.trim() == '' ? (<></>) : (
                                        <TouchableOpacity style={{ width: '100%' }}
                                            onPress={handleClickAdd}
                                        >
                                            <View style={[st.buttonAdd]}>
                                                <Text style={[st.textTitle]}>
                                                    Thêm
                                                </Text>
                                            </View>
                                        </TouchableOpacity>

                                    )
                                }
                            </View>

                        </Modal>

                        <FlatList
                            data={deliveryInfo}
                            renderItem={({ item }) => renderItem(item)}
                            style={{ width: '100%' }}
                        />


                    </>
                )
            }
        </View>
    )
}

const st = StyleSheet.create({
    itemContainer: {
        width: '90%',
        backgroundColor: COLORS.white,
        padding: 15,
        borderColor: COLORS.red,
        borderWidth: 2,
        borderStyle: 'dashed',
        marginTop: 20,
        margin: 'auto'
    },
    shadow: {
        elevation: 4,
        shadowColor: COLORS.black,
        shadowOpacity: 0.3,
        shadowRadius: 7
    },
    textTitle: {
        fontSize: SIZES.h3,
        fontWeight: '600',
        marginVertical: 5
    },
    textContents: {
        fontWeight: '400'
    },
    modalContainer: {
        width: SIZES.W * 0.9,
        height: SIZES.H * 0.7,
        backgroundColor: 'white',
        margin: 'auto',
        borderRadius: 16,
        alignItems: 'center'
    },
    buttonClose: {
        borderRadius: 30,
        elevation: 2,
        height: 35,
        width: 35,
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'black',
    },

    input: {
        width: '90%',
        borderWidth: 1,
        height: 50,
        marginTop: 40,
        borderRadius: 10,
        borderColor: COLORS.DeepSkyBlue,
        paddingHorizontal: 10
    },
    buttonAdd: {
        width: '80%',
        height: 70,
        backgroundColor: 'white',
        marginTop: 40,
        margin: 'auto',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center'
    }

})