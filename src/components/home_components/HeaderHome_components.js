import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import IconSetting from '../../accets/home/svg_home/setting_search.svg';
import IconSearch from '../../accets/home/svg_home/search.svg';
import IconUser from '../../accets/svg_g/user.svg';
import { SIZES } from '../../constants/theme';
import { Avatar } from '@rneui/themed';
import { IP } from '../../service/untils';
import { auth } from '../../service/auth/auth'
import { useSelector } from 'react-redux';
import { userLoginSelector } from '../../redux/selector';
export default memo(function HeaderHome_components({ image, userName }) {
    const [newAvatar, setNewAvatar] = useState(image);
    const userLogin = useSelector(userLoginSelector);
    useEffect(() => {
        image += ""
        const newImage = image.replace('localhost', IP);
        // console.log(image);
        const checkAvatar = async () => {

            const resAvatar = await auth.checkAvatar(newImage);
            // console.log(resAvatar);

            if (resAvatar != false) {
                setNewAvatar(newImage);
            } else {
                setNewAvatar(false)
            }
        }


        checkAvatar();
    }, []);
    return (
        <View style={[st.container]}>
            <View style={[st.containerText]}>
                <Text style={[st.textHi]}>Hello,</Text>
                <Text style={[st.textName]}>{userName}</Text>
            </View>
            <TouchableOpacity style={st.box_avatar}>
                <View style={[st.containetAvatar]}>
                    {
                        userLogin.avatar == null || userLogin.avatar == undefined || userLogin.avatar == '' ? <IconUser width={40} height={40} /> : <Image source={{ uri: (userLogin.avatar.replace('localhost', IP)) }} style={[st.image]} />
                    }
                </View>
            </TouchableOpacity>

        </View>
    )
})

const st = StyleSheet.create({
    container: {
        width: '90%',
        // backgroundColor: '#f2f2f2',
        height: '7%',
        borderRadius: 15,
        // shadowColor: 'black',
        // shadowOffset: { width: 5, height: 5 },
        // shadowRadius: 15,
        // shadowOpacity: 0.3,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    box_avatar: {
        width: SIZES.H * 0.07,
        height: SIZES.H * 0.07,
        overflow: 'visible'
    },
    containetAvatar: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: SIZES.H * 0.07 / 2,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 10,
        shadowOpacity: 0.1,
        elevation: 5,
        // overflow: 'hidden'
    },
    containerText: {
        width: '60%'
    },
    textHi: {
        fontSize: SIZES.h3,

    },
    textName: {
        fontSize: SIZES.h1,
        fontWeight: '500'
    },
    image: {
        objectFit: 'cover',
        width: '100%',
        height: '100%',
        borderRadius: 100
    }
})