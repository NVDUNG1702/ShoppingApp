import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import LottieView from 'lottie-react-native'
import { SIZES } from '../../constants/theme'
import Input_customer from '../../components/Input_customer'
import IconMail from '../../accets/svg_input/mail.svg';
import Button_customer from '../../components/Button_customer';
import IconArrowLeft from '../../accets/svg_g/arrowleft.svg'
export default function Forgot_screen({navigation}) {
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');

  return (
    <View style={[st.container]}>

      <LottieView
        style={[st.img]}
        source={require('../../accets/auth/forgot.json')}
        autoPlay
      />
      <Text style={[st.title]}>
        Forgot
      </Text>

      <Input_customer
        value={email}
        err={errorEmail}
        setError={setErrorEmail}
        setValue={setEmail}
        placeholder={'your email address'}
        IconLeft={IconMail}
      />

      <Button_customer lable={'resert'} />

      <TouchableOpacity style={[st.backContainer]}
        onPress={()=>{navigation.goBack()}}
      >
        <IconArrowLeft width={40} height={40} />
      </TouchableOpacity>

    </View>
  )
}

const st = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
    backgroundColor: 'white',
    justifyContent: 'space-evenly'
  },
  img: {
    width: SIZES.W,
    height: SIZES.H * 0.3
  },
  title: {
    fontSize: SIZES.title,
    fontWeight: 'bold',
    marginVertical: 30,
    // fontFamily: 'Roboto'
  },
  backContainer: {
    width: 50,
    height: 50,
    // backgroundColor: 'black',
    position: 'absolute',
    top: 50,
    left: 20
  }
})