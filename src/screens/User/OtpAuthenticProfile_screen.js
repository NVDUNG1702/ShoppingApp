import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header_components from '../../components/Header_components';
import LottieView from 'lottie-react-native';
import { SIZES } from '../../constants/theme';
import { userAPI } from '../../service/api/user/user';
import Toast from 'react-native-toast-message';
import Button_customer from '../../components/Button_customer';
import { useDispatch, useSelector } from 'react-redux';
import { authSlice } from '../../redux/slice/authSlice';
import { CommonActions } from '@react-navigation/native';
import { userLoginSelector } from '../../redux/selector';


const CELL_COUNT = 6;

export default function OtpAuthenticProfile_screen({ navigation, route }) {
    const { fullName, email, phoneNumber, mailSen } = route.params;
    const userLogin = useSelector(userLoginSelector);
    // console.log(fullName, email, phoneNumber, mailSen);
    const dispatch = useDispatch();
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    // console.log(value);

    const [timeLeft, setTimeLeft] = useState(0); // 120 giây cho 2 phút

    useEffect(() => {
        if (timeLeft === 0) return;

        const intervalId = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        // Cleanup interval khi component unmount hoặc khi thời gian hết
        return () => clearInterval(intervalId);
    }, [timeLeft]);

    // Chuyển đổi thời gian thành định dạng "mm:ss"
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const senOTP = async () => {
        const resOTP = await userAPI.senOTP(mailSen);
        if (resOTP == 200) {
            setTimeLeft(120);
            Toast.show({
                type: 'success',
                text1: 'Sen OTP success'
            })

        } else {
            Toast.show({
                type: 'error',
                text1: 'Sen OTP error'
            })
        }
    }

    const checkOtpAndUpdate = async () => {
        try {
            const res = await userAPI.update(fullName, email, phoneNumber, mailSen, value);
            if (res.status == 200) {
                

                dispatch(authSlice.actions.update({
                    ...userLogin,
                    email: email,
                    fullName,
                    phoneNumber
                }));

                Toast.show({
                    type: 'success',
                    text1: 'Sen OTP success',
                    // onPress: () => {
                    //     navigation.dispatch(
                    //         CommonActions.reset({
                    //             index: 0,
                    //             routes: [
                    //                 { name: 'bottom' }, // Thay 'Home' bằng tên của màn hình chính của bạn
                    //             ],
                    //         })
                    //     );
                    // }
                })

                setTimeout(() => {
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [
                                { name: 'bottom' }, // Thay 'Home' bằng tên của màn hình chính của bạn
                            ],
                        })
                    );
                }, 1000)






            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Sen OTP error',
                })
            }
        } catch (error) {

        }

    }



    return (
        <View style={styles.root}>
            <Header_components lable='Verification' />

            <View style={{ width: '90%', height: '40%', alignItems: 'center' }}>
                <LottieView source={require('../../accets/json_g/otp_sendmail.json')} autoPlay style={{ width: '70%', height: '100%' }} />
            </View>
            <Text style={[{ fontSize: SIZES.h4 }]}>Kiểm tra mã otp từ email của bạn</Text>
            <View style={{ width: '90%' }}>
                <CodeField
                    ref={ref}
                    // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                    value={value}
                    onChangeText={setValue}
                    cellCount={CELL_COUNT}
                    rootStyle={styles.codeFieldRoot}
                    // keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    autoComplete={Platform.select({ android: 'sms-otp', default: 'one-time-code' })}
                    testID="my-code-input"
                    renderCell={({ index, symbol, isFocused }) => (
                        <Text
                            key={index}
                            style={[styles.cell, isFocused && styles.focusCell]}
                            onLayout={getCellOnLayoutHandler(index)}>
                            {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                    )}

                />
            </View>
            <View style={{ width: '90%', paddingVertical: 20 }}>
                {
                    timeLeft == 0 ? (
                        <>
                            <TouchableOpacity
                                onPress={senOTP}
                            >
                                <Text style={{ textDecorationLine: 'underline' }}>Sen OTP</Text>
                            </TouchableOpacity>
                        </>
                    ) : <Text>Mã OTP sẽ hết hạn sau: {formatTime(timeLeft)}</Text>
                }
            </View>
            <View style={{ width: '100%', alignItems: 'center', position: 'absolute', bottom: 30 }}>
                <Button_customer lable='CHECK OTP' fun={checkOtpAndUpdate} />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    root: { flex: 1, alignItems: 'center' },
    title: { textAlign: 'center', fontSize: 30 },
    codeFieldRoot: { marginTop: 20 },
    cell: {
        width: 50,
        height: 50,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 3,
        borderColor: '#00000030',
        textAlign: 'center',
        borderRadius: 10
    },
    focusCell: {
        borderColor: '#000',
    },
})