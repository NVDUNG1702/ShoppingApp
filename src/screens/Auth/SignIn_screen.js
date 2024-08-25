import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import LottieView from 'lottie-react-native'
import { SIZES } from '../../constants/theme'
import Button_customer from '../../components/Button_customer';
import Input_customer from '../../components/Input_customer';
import IconMail from '../../accets/svg_input/mail.svg';
import IconLock from '../../accets/svg_input/lock.svg';
import CheckBox_customer from '../../components/CheckBox_customer';
import IconGoogle from '../../accets/auth/google.svg';
import IconFacebook from '../../accets/auth/facebook.svg';
import Loading_customer from '../../components/Loading_customer';
import { storage } from '../../helper/storage';
import { auth } from '../../service/auth/auth';
import { useDispatch } from 'react-redux';
import { authSlice } from '../../redux/slice/authSlice';


export default function SignIn_screen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPass, setErrorPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reMember, setReMember] = useState(false);

  const dispatch = useDispatch();


  const validation = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorEmail({ hasError: true, message: 'Invalid email address' });
      setEmail('');
    } else {
      setErrorEmail({ hasError: false, message: '' });
    }

    if (password.trim().length < 6) {
      setErrorPass({ hasError: true, message: "Invalid password" });
      setPass('');
    } else {
      setErrorPass({ hasError: false, message: '' });
    }
    // console.log('1: ', errorEmail.hasError, errorPass.hasError);
    if (errorEmail.hasError || errorPass.hasError) {
      return false;
    } else {
      return true;
    }
  }

  const handlerLogin = async () => {
    const validationData = validation();
    console.log(validationData);
    if (!validationData) {

      return;
    };

    const dataLogin = {
      email,
      password
    }

    const callBack = async (res) => {
      if (res.data.status == 200) {
        const userLogin = res.data.user;
        const { avatar, email, fullName, phoneNumber, id } = userLogin
        console.log(userLogin);
        const newAvatar = userLogin.avatar == null ? '' : userLogin.avatar
        dispatch(authSlice.actions.setUserLogin({
          id,
          avatar: newAvatar,
          email,
          fullName,
          phoneNumber
        }))

        const accessToken = res.data.ACCESS_TOKEN;
        const refreshToken = res.data.REFRESH_TOKEN;

        await storage.saveData('accessToken', accessToken.token + '');
        await storage.saveData('refreshToken', refreshToken.token + '');
        if (reMember) {
          await storage.saveData('remember', true);
        } else {
          await storage.clearData('remember');
        }
        // console.log('access_token: ', accessToken);
        // console.log('refresh_token: ', refreshToken);
        // console.log('user: ', userLogin);

        setEmail('');
        setPass('');

        navigation.navigate('bottom');
      } else {
        Alert.alert('Error', 'Tài khoản hoặc mật khẩu không chính xác!', [
          {
            text: 'Ok',
            style: 'cancel'
          }
        ]);
      }
    }

    await auth.login(dataLogin, setLoading, callBack);

  }

  return (
    <View style={[st.container]}>

      <Loading_customer setLoading={setLoading} loading={loading} />

      <LottieView
        source={require('../../accets/auth/register.json')}
        style={[st.image]}
        autoPlay
      />
      <Text style={[st.title]}>
        Login
      </Text>
      <ScrollView style={{ width: '100%' }}>
        <View style={[st.itemLogin]}>
          <Input_customer setError={setErrorEmail} IconLeft={IconMail} err={errorEmail} placeholder={'email'} value={email} setValue={setEmail} />
          <Input_customer setError={setErrorPass} IconLeft={IconLock} err={errorPass} placeholder={'password'} value={password} setValue={setPass} pass />

          <View style={[st.checkBox]}>
            <CheckBox_customer size={20} check={reMember} setCheck={setReMember} />
            <Text style={[st.contentCheckBox]}>
              Nhớ mật khẩu
            </Text>
          </View>
          <Button_customer lable={'SignIn'} fun={handlerLogin} />

          <View style={{ width: '70%', marginVertical: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ width: '40%', height: 2, backgroundColor: '#cccccc' }}>
            </View>
            <Text>
              or
            </Text>
            <View style={{ width: '40%', height: 2, backgroundColor: '#cccccc' }}>

            </View>
          </View>


          <View style={[st.loginWith]}>
            <TouchableOpacity style={[st.iconShadow]}>
              <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                <IconGoogle width={SIZES.W * 0.13} height={SIZES.W * 0.13} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={[st.iconShadow]}>
              <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <IconFacebook width={SIZES.W * 0.13} height={SIZES.W * 0.13} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={[st.textSignUpContainer]}>
            <Text style={[st.textLogin]}>
              Bạn chưa có tài khoản,
            </Text>
            <TouchableOpacity
              style={{ marginHorizontal: 5 }}
              onPress={() => { navigation.navigate('signup') }}
            >
              <Text style={[{ color: 'blue' }, st.textLogin]}>Register</Text>
            </TouchableOpacity>
            <Text>hoặc</Text>
            <TouchableOpacity
              style={{ marginHorizontal: 5 }}
              onPress={() => { navigation.navigate('forgot') }}
            >
              <Text style={[{ color: 'blue' }, st.textLogin]}>Forgot</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const st = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor: '#d9d9d9'
    // justifyContent: 'center'
    paddingTop: SIZES.H * 0.06,
    backgroundColor: 'white'
  },
  image: {
    width: SIZES.W * 0.9,
    height: SIZES.H * 0.2,
    // backgroundColor: 'black'
  },
  title: {
    fontSize: SIZES.title,
    fontWeight: 'bold',
    marginVertical: 30,
    // fontFamily: 'Roboto'
  },
  checkBox: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20
  },
  contentCheckBox: {
    marginStart: 10,

  },

  loginWith: {
    width: '90%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'

  },
  iconShadow: {
    width: SIZES.W * 0.15,
    height: SIZES.W * 0.15,
    marginHorizontal: 30,
    shadowColor: '#d9d9d9',
    backgroundColor: 'white',
    shadowOffset: { width: 3, height: 0 },
    shadowOpacity: 10,
    shadowRadius: 10,
    borderRadius: 15
  },

  textSignUpContainer: {
    flexDirection: 'row',
    marginTop: 20
  },
  itemLogin: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 20
  }
})