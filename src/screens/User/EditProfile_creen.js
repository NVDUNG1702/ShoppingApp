import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header_components from '../../components/Header_components'
import IconBack from '../../accets/svg_g/arrow-left.svg'
import { COLORS, SIZES } from '../../constants/theme'
import { useSelector } from 'react-redux'
import { userLoginSelector } from '../../redux/selector'
import IconEdit from '../../accets/svg_g/edit.svg'
import { TouchableOpacity } from 'react-native'
import Button_customer from '../../components/Button_customer'
import Toast from 'react-native-toast-message'
const InputCustomer = ({ lable, placeholder, value, onChangText }) => {
    // console.log(value);


    return (
        <View style={[st.inputContainer, {}]}>
            <Text style={[st.textTitleInput]}>{lable}</Text>
            <View style={[st.input]}>
                <TextInput placeholder={placeholder} style={[st.textInput]} value={value.value} onChangeText={(newText) => onChangText({ error: value.error, value: newText })} />
            </View>
        </View>
    )
}

export default function EditProfile_creen({ navigation }) {
    const userLogin = useSelector(userLoginSelector);
    const [name, setName] = useState({ value: '', error: false, edit: false, messageError: '' });
    const [email, setEmail] = useState({ value: '', error: false, edit: false, messageError: '' })
    const [phoneNumber, setPhoneNumber] = useState({ value: '', error: false, edit: false, messageError: '' })
    const funBack = () => [
        navigation.goBack()
    ]

    const validation = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10,11}$/; // Chỉ cho phép số điện thoại có từ 10-11 chữ số
        let isValid = true; // Biến để kiểm tra xem tất cả các dữ liệu có hợp lệ hay không
        const errors = []; // Mảng để lưu trữ các thông báo lỗi

        if (email.edit) {
            if (email.value.trim() === '') {
                setEmail({
                    ...email,
                    error: true,
                    messageError: 'Email không được để trống!',
                });
                errors.push('Email không được để trống!');
                isValid = false;
            } else if (!emailRegex.test(email.value)) {
                setEmail({
                    ...email,
                    error: true,
                    messageError: 'Email không đúng định dạng email@example.com!',
                });
                errors.push('Email không đúng định dạng email@example.com!');
                isValid = false;
            } else {
                setEmail({
                    ...email,
                    error: false,
                    messageError: '',
                });
            }
        }

        if (name.edit) {
            if (name.value.trim() === '') {
                setName({
                    ...name,
                    error: true,
                    messageError: 'Name không được để trống!',
                });
                errors.push('Name không được để trống!');
                isValid = false;
            } else {
                setName({
                    ...name,
                    error: false,
                    messageError: '',
                });
            }
        }

        if (phoneNumber.edit) {
            if (phoneNumber.value.trim() === '') {
                setPhoneNumber({
                    ...phoneNumber,
                    error: true,
                    messageError: 'Số điện thoại không được để trống!',
                });
                errors.push('Số điện thoại không được để trống!');
                isValid = false;
            } else if (!phoneRegex.test(phoneNumber.value)) {
                setPhoneNumber({
                    ...phoneNumber,
                    error: true,
                    messageError: 'Số điện thoại không đúng định dạng!',
                });
                errors.push('Số điện thoại không đúng định dạng!');
                isValid = false;
            } else {
                setPhoneNumber({
                    ...phoneNumber,
                    error: false,
                    messageError: '',
                });
            }
        }

        // Hiển thị tất cả các lỗi cùng một lúc
        errors.forEach((error, index) => {
            setTimeout(() => {
                Toast.show({
                    type: 'error',
                    text1: error,
                    position: 'top',
                    autoHide: true,
                    visibilityTime: 2000,
                    topOffset: 60
                });
            }, index * 2000); // Đặt thời gian chờ để hiển thị từng toast sau khoảng cách 500ms
        });

        return isValid;
    };

    const saveInfo = () => {
        if (validation()) {
            const newName = name.edit == true ? name.value : userLogin.fullName;
            const newEmail = email.edit == true ? email.value : userLogin.email;
            const newPhoneNumber = phoneNumber.edit == true ? phoneNumber.value : userLogin.phoneNumber;
            navigation.navigate('otpAuthenticProfile', { fullName: newName, email: newEmail, phoneNumber: newPhoneNumber, mailSen: userLogin.email });
        }
    }



    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <Header_components
                lable='Cập nhật thông tin'
                IconLeft={IconBack}
                funLeft={funBack}
            />
            <View style={[st.containerContents]}>
                <View style={[{ width: '90%', marginBottom: 30, }]}>
                    <Text style={[{ textAlign: 'center' }, st.title]}>Thông tin hiện tại</Text>
                    <View style={[st.containerTextCurrent]}>
                        <Text style={[st.textContents]}>Tên: {userLogin.fullName}</Text>
                        <TouchableOpacity
                            onPress={() => {
                                setName({
                                    ...name,
                                    edit: !name.edit
                                })
                            }}
                        >
                            <IconEdit width={35} height={35} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={[st.textContents]}>Email: {userLogin.email}</Text>
                        <TouchableOpacity
                            onPress={() => {
                                setEmail({
                                    ...email,
                                    edit: !email.edit
                                })
                            }}
                        >
                            <IconEdit width={35} height={35} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={[st.textContents]}>Số điện thoại: {userLogin.phoneNumber}</Text>
                        <TouchableOpacity
                            onPress={() => {
                                setPhoneNumber({
                                    ...phoneNumber,
                                    edit: !phoneNumber.edit
                                })
                            }}
                        >
                            <IconEdit width={35} height={35} />
                        </TouchableOpacity>
                    </View>
                </View>
                {
                    name.edit && (
                        <View style={[st.inputContainer, {}]}>
                            <Text style={[st.textTitleInput]}>Tên của bạn:</Text>
                            <View style={[st.input]}>
                                <TextInput placeholder={"Your full name"} style={[st.textInput]} value={name.value} onChangeText={(newText) => setName({ ...name, value: newText })} />
                            </View>
                        </View>
                    )
                }
                {
                    email.edit && (
                        <View style={[st.inputContainer, {}]}>
                            <Text style={[st.textTitleInput]}>Email của bạn:</Text>
                            <View style={[st.input]}>
                                <TextInput placeholder={"Your email address"} style={[st.textInput]} value={email.value} onChangeText={(newText) => setEmail({ ...email, value: newText })} />
                            </View>
                        </View>
                    )
                }
                {
                    phoneNumber.edit && (
                        <View style={[st.inputContainer, {}]}>
                            <Text style={[st.textTitleInput]}>Email của bạn:</Text>
                            <View style={[st.input]}>
                                <TextInput placeholder={"Your phone number"} style={[st.textInput]} value={phoneNumber.value} onChangeText={(newText) => setPhoneNumber({ ...phoneNumber, value: newText })} />
                            </View>
                        </View>
                    )
                }

                {
                    name.edit || email.edit || phoneNumber.edit ? (
                        <View style={{ width: '100%', position: 'absolute', bottom: 20, alignItems: 'center' }}>
                            <Button_customer lable='Save' fun={saveInfo} />
                        </View>
                    ) : <></>
                }
            </View>
        </View>
    )
}

const st = StyleSheet.create({
    containerContents: {
        width: '100%',
        height: '90%',
        alignItems: 'center',
        paddingTop: 30
        // backgroundColor: 'black'
    },
    inputContainer: {
        width: '90%',
        height: 90,
        marginVertical: 20
    },
    input: {
        width: '100%',
        height: 60,
        borderWidth: 1,
        borderColor: COLORS.DeepSkyBlue,
        borderRadius: 16,
        paddingHorizontal: 10

    },
    textTitleInput: {
        fontSize: SIZES.h3,
        fontWeight: '600',
        marginBottom: 10,
    },
    textInput: {
        width: '100%',
        height: '100%',
        fontSize: SIZES.h4

    },
    title: {
        fontSize: SIZES.h3,
        fontWeight: '500'
    },
    textContents: {
        fontSize: SIZES.h4,
        fontWeight: '400',
        marginVertical: 5
    },
    containerTextCurrent: {
        // flexDirection: 'row',
        // alignItems: 'center',

    }
})