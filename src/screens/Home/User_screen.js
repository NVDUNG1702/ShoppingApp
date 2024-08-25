import { Alert, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import Header_components from '../../components/Header_components';
import IconLogOut from '../../accets/svg_g/logout.svg';
import { COLORS, SIZES } from '../../constants/theme';
import { useDispatch, useSelector } from 'react-redux';
import { userLoginSelector } from '../../redux/selector';
import { useFocusEffect } from '@react-navigation/native';
import { IP } from '../../service/untils';
import IconArrowRightLong from '../../accets/svg_g/arrow-right-long.svg'
import { getRandomColor } from '../../untils/randomColor';
import { auth } from '../../service/auth/auth'
import IconUser from '../../accets/svg_g/user.svg';
import IconEdit from '../../accets/svg_g/edit-svgrepo-com.svg'
import ImageCropPicker from 'react-native-image-crop-picker';
import { userAPI } from '../../service/api/user/user';
import Toast from 'react-native-toast-message';
import { authSlice } from '../../redux/slice/authSlice';
import { storage } from '../../helper/storage';
export default function User_screen({ navigation }) {
  const userLogin = useSelector(userLoginSelector);
  console.log(userLogin);

  const [avatar, setAvatar] = useState(userLogin.avatar == null ? false : userLogin.avatar.replace('localhost', IP));
  const dispatch = useDispatch();


  useEffect(() => {
    console.log("user thay doi: ", userLogin);

    const checkAvatar = async () => {

      if (avatar) {
        const resAvatar = await auth.checkAvatar(userLogin.avatar.replace('localhost', IP));
        console.log("resAvatar: ", resAvatar);

        setAvatar(resAvatar)
      }
    }
    checkAvatar()
  }, [userLogin]);

  useFocusEffect(
    useCallback(() => {

      const checkAvatar = async () => {

        if (avatar) {
          const resAvatar = await auth.checkAvatar(userLogin.avatar.replace('localhost', IP));
          // console.log("resAvatar: ", resAvatar);

          setAvatar(resAvatar)
        }
      }
      checkAvatar()

    }, [userLogin]),
  );



  // 

  const renderItemMenu = (screen, title) => {
    const handleNexScreen = () => {
      navigation.navigate(screen)
    }
    const color = getRandomColor()
    return (
      <TouchableOpacity

        onPress={handleNexScreen}
      >
        <View style={[st.containerItem, { backgroundColor: color }]}>
          <Text style={[{ width: '70%' }, st.titile]}>{title}</Text>
          <IconArrowRightLong width={SIZES.iconS1} height={SIZES.iconS1} />
        </View>
      </TouchableOpacity>
    )
  }

  const dataMenu = [
    {
      id: 1,
      title: "Thông tin nhận hàng",
      screen: 'receivingInformation'
    },
    {
      id: 2,
      title: "Đơn hàng của bạn",
      screen: 'historyCart'
    },
    {
      id: 3,
      title: "Chỉnh sửa thông tin cá nhân",
      screen: 'editProfile'
    }
    , {
      id: 4,
      title: "Đổi mật khẩu",
      screen: 'editPassword'
    }
  ]

  const handleEditAvatar = () => {
    try {
      ImageCropPicker.openPicker({
        width: 400,
        height: 400
      }).then(async (image) => {

        const formData = new FormData();

        formData.append('avatars', {
          uri: image.path,
          type: image.mime,
          name: image.filename
        })


        const res = await userAPI.uploadImage(formData);
        if (!res) {
          Toast.show({
            type: 'error',
            text1: 'Lỗi upload avatar!'
          })
          return;
        }
        const newUserLogin = {
          ...userLogin,
          avatar: res.avatar
        }
        dispatch(authSlice.actions.setUserLogin(newUserLogin))
        console.log("test", newUserLogin);

        Toast.show({
          type: 'success',
          text1: 'Upload image success!'
        })
      }).catch(error => {
        console.log("Lỗi update avatar: ", error);
        Toast.show({
          type: 'error',
          text1: 'Upload image error'
        })

      })
    } catch (error) {
      console.log(error);

    }
  }

  const logOut = async () => {


    Alert.alert("LogOut", "Bạn có muốn đăng xuất?", [
      {
        text: 'cancel',
        style: 'cancel'
      },
      {
        text: 'OK',
        onPress: async () => {
          await storage.clearData('remember');
          await storage.clearData('accessToken');
          await storage.clearData('refreshToken');
          navigation.reset({
            index: 0,
            routes: [{ name: 'auth', state: { routes: [{ name: 'signin' }] } }],
          });
        }
      }
    ])

  }

  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: COLORS.white }}>
      <Header_components lable={'Profile'} IconRight={IconLogOut} funRight={logOut} />
      <View style={[st.containerInfo, st.shadow]}>
        <TouchableOpacity
          onPress={handleEditAvatar}
        >
          <View style={[st.containerImage]}>
            {
              userLogin.avatar == null || userLogin.avatar == '' || userLogin.avatar == undefined ? <IconUser width={70} height={70} /> : <Image source={{ uri: userLogin.avatar.replace('localhost', IP) }} width={120} height={120} />
            }
            <View style={{ position: 'absolute', bottom: 0, backgroundColor: 'rgba(225, 225, 225, 0.6)', width: '100%', height: '30%', justifyContent: 'center', alignItems: 'center' }}>
              <IconEdit width={30} height={30} />
            </View>
          </View>
        </TouchableOpacity>
        <Text style={[st.titile]}>{userLogin.fullName}</Text>
        <Text style={[st.txtContents]}>{userLogin.email}</Text>

        <View style={{ width: '50%', height: 5, backgroundColor: COLORS.DeepSkyBlue, borderRadius: 10, position: 'absolute', bottom: -2 }}>

        </View>
      </View>


      <FlatList
        data={dataMenu}
        renderItem={({ item }) => renderItemMenu(item.screen, item.title)}
        keyExtractor={item => item.id}
        style={{ width: '100%' }}
      />


    </View>
  );
}

const st = StyleSheet.create({
  containerInfo: {
    width: '100%',
    height: SIZES.H * 0.25,
    backgroundColor: COLORS.white,
    borderBottomEndRadius: 100,
    borderBottomStartRadius: 100,
    alignItems: 'center',
    padding: 20,
  },
  containerImage: {
    width: 120,
    height: 120,
    backgroundColor: 'black',
    borderRadius: 100,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center'
  },
  shadow: {
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10
  },
  titile: {
    fontSize: SIZES.h4,
    fontWeight: '600',
    marginVertical: 5
  },
  txtContents: {
    fontSize: SIZES.h4,

  },
  containerItem: {
    width: '90%',
    height: 70,
    backgroundColor: 'white',
    marginTop: 40,
    borderRadius: 10,
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    margin: 'auto'
  }
});


