import { Alert, KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import LottieView from 'lottie-react-native'
import { SIZES } from '../../constants/theme'
import Input_customer from '../../components/Input_customer'
import IconMail from '../../accets/svg_input/mail.svg'
import IconUser from '../../accets/svg_input/user.svg'
import IconLock from '../../accets/svg_input/lock.svg'
import IconPhone from '../../accets/svg_input/phone.svg'
import Button_customer from '../../components/Button_customer'
import { auth } from '../../service/auth/auth'
import Loading_customer from '../../components/Loading_customer'
import Toast from 'react-native-toast-message'


export default function SignUp_screen({ navigation }) {
    const [fullName, setFullName] = useState('');
    const [email, setMail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [rePass, setRePass] = useState('')
    const [errorFName, setErrorFName] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPhoneNumber, setErrorPhoneNumber] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorRePass, setErrorRePass] = useState(false);
    const [loading, setLoading] = useState(false);
    // const validate = () => {
    //     let isValid = false
    //     if (fullName.trim() === '') {
    //         setErrorFName({ hasError: true, message: 'Full name is required' });
    //         setFullName('');

    //     } else {
    //         setErrorFName({ hasError: false, message: '' });

    //     }

    //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     if (!emailRegex.test(email)) {
    //         setErrorEmail({ hasError: true, message: 'Invalid email address' });
    //         setMail('');

    //     } else {
    //         setErrorEmail({ hasError: false, message: '' });

    //     }

    //     const phoneRegex = /^\d{10}$/;
    //     if (!phoneRegex.test(phoneNumber)) {
    //         setErrorPhoneNumber({ hasError: true, message: 'Invalid phone number. It should be 10 digits' });
    //         setPhoneNumber('');

    //     } else {
    //         setErrorPhoneNumber({ hasError: false, message: '' });

    //     }

    //     if (password.length < 6) {
    //         setErrorPassword({ hasError: true, message: 'Password must be at least 6 characters' });
    //         setPassword('');

    //     } else {
    //         setErrorPassword({ hasError: false, message: '' });

    //     }

    //     if (password !== rePass) {
    //         setErrorRePass({ hasError: true, message: 'Passwords do not match' });
    //         // setPassword('');

    //     } else {
    //         setErrorRePass({ hasError: false, message: '' });

    //     }

    //     // if (password !== rePass) {
    //     //     setErrorRePass(true);
    //     //     
    //     // } else {
    //     //     setErrorRePass(false);
    //     // }
    //     if(!errorEmail.hasError && !errorFName.hasError && !errorPhoneNumber.hasError && !errorPassword.hasError){
    //         return true;
    //     } else return false;
    // };
    const validate = () => {
        let isValid = true;
        const errors = [];

        // Full Name
        if (fullName.trim() === '') {
            setErrorFName({ hasError: true, message: 'Full name is required' });
            setFullName('');
            errors.push('Full name is required');
            isValid = false;
        } else {
            setErrorFName({ hasError: false, message: '' });
        }

        // Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorEmail({ hasError: true, message: 'Invalid email address' });
            setMail('');
            errors.push('Invalid email address');
            isValid = false;
        } else {
            setErrorEmail({ hasError: false, message: '' });
        }

        // Phone Number
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phoneNumber)) {
            setErrorPhoneNumber({ hasError: true, message: 'Invalid phone number. It should be 10 digits' });
            setPhoneNumber('');
            errors.push('Invalid phone number. It should be 10 digits');
            isValid = false;
        } else {
            setErrorPhoneNumber({ hasError: false, message: '' });
        }

        // Password
        if (password.length < 6) {
            setErrorPassword({ hasError: true, message: 'Password must be at least 6 characters' });
            setPassword('');
            errors.push('Password must be at least 6 characters');
            isValid = false;
        } else {
            setErrorPassword({ hasError: false, message: '' });
        }

        // Re-Password
        // if (password !== rePass) {
        //     setErrorRePass({ hasError: true, message: 'Passwords do not match' });
        //     // Optionally clear password and re-password fields
        //     // setPassword('');
        //     // setRePass('');
        //     errors.push('Passwords do not match');
        //     isValid = false;
        // } else {
        //     setErrorRePass({ hasError: false, message: '' });
        // }

        // Display errors using Toast with setTimeout
        errors.forEach((error, index) => {
            setTimeout(() => {
                Toast.show({
                    type: 'error',
                    text1: 'Validation Error',
                    text2: error
                });
            }, index * 1000); // Show each error 1 second apart
        });

        return isValid;
    };




    const handleSignUp = useCallback(async () => {
        const validation = validate();
        if (!validation) {
            return;
        }
        const dataRegister = {
            email,
            fullName,
            phoneNumber,
            password
        }
        const callBack = (data) => {
            if (data.data.status == 201) {
                console.log(data.data);

                setFullName('');
                setMail('');
                setPassword('');
                setPhoneNumber('');
                Alert.alert('Register', 'Đăng ký thành công, đăng nhập ngay', [
                    {
                        text: 'ok',
                        onPress: () => { navigation.navigate('signin') }
                    },
                    {
                        text: 'cancel',
                        style: 'cancel'
                    }
                ])
            } else {
                Alert.alert('Error', 'Vui lòng kiểm tra thông tin email or phone number', [
                    {
                        text: 'ok',
                        style: 'cancel'
                    }
                ])
            }
        }

        const data = await auth.register(dataRegister, setLoading, callBack);

    }, [fullName, email, password, phoneNumber, validate]);



    return (
        <View style={[st.container]}>
            <Loading_customer loading={loading} setLoading={setLoading} />
            <LottieView
                source={require('../../accets/auth/signup.json')}
                autoPlay
                style={st.image}
                loop={false}
            />

            <Text style={[st.title]}>
                Register
            </Text>

            <ScrollView style={[st.itemView]}>
                {/* <View style={{ justifyContent: 'space-between', alignItems: 'center' }}> */}

                <KeyboardAvoidingView
                    style={{ width: '100%', alignItems: 'center', minHeight: SIZES.H * 0.6, maxHeight: SIZES.H * 0.85 }}
                    behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS == 'ios' ? 100 : 0}
                >
                    <Input_customer setError={setErrorFName} err={errorFName} IconLeft={IconUser} placeholder={'Your name'} value={fullName} setValue={setFullName} />
                    <Input_customer setError={setErrorPhoneNumber} err={errorPhoneNumber} IconLeft={IconPhone} placeholder={'Phone Number'} number value={phoneNumber} setValue={setPhoneNumber} />
                    <Input_customer setError={setErrorEmail} err={errorEmail} IconLeft={IconMail} placeholder={'Example@email.com'} value={email} setValue={setMail} />
                    <Input_customer setError={setErrorPassword} err={errorPassword} pass IconLeft={IconLock} placeholder={'Your password'} value={password} setValue={setPassword} />

                    <View style={[st.containerLoginText]}>
                        <Text style={[st.textLogin]}>
                            Bạn đã có tài khoản,
                        </Text>
                        <TouchableOpacity
                            style={{ marginStart: 5 }}
                            onPress={() => { navigation.navigate('signin') }}
                        >
                            <Text style={[{ color: 'blue' }, st.textLogin]}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    <Button_customer lable={'SignUp'} fun={handleSignUp} />
                </KeyboardAvoidingView>

                {/* </View> */}
            </ScrollView>
        </View>
    );
};

const st = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        paddingTop: SIZES.H * 0.04,
        backgroundColor: 'white'
    },
    image: {
        width: SIZES.W,
        height: SIZES.H * 0.2
    },
    title: {
        fontSize: SIZES.title,
        fontWeight: 'bold',
        marginVertical: 20,
        // fontFamily: 'Roboto'
    },
    containerLoginText: {
        width: '90%',
        flexDirection: 'row',
        marginVertical: 10,
        marginTop: 30
    },
    textLogin: {
        fontSize: SIZES.h4
    },
    itemView: {
        width: '100%',
        height: SIZES.H * 0.94 - 200,
        // alignItems: 'center'
    }
})