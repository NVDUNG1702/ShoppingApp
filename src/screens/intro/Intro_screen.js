import { ActivityIndicator, Alert, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppIntroSlider from 'react-native-app-intro-slider'
import { dataIntroSlider } from '../../datas/introSlider'
import { SIZES } from '../../constants/theme'
import LottieView from 'lottie-react-native'
import { storage } from '../../helper/storage'
import { useDispatch } from 'react-redux'
import { authSlice } from '../../redux/slice/authSlice'
import { auth } from '../../service/auth/auth'



export default function Intro_screen({ navigation }) {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const [nextIntro, setNextIntro] = useState(false)
    useEffect(() => {
        // const setShowIntro = async () => {
        //     const data = await storage.getData('nextIntro');
        //     // console.log(data);

        //     setNextIntro(data)
        // }
        // setShowIntro()

        const checkLogin = async () => {
            if (loading == true) {
                const remember = await storage.getData('remember');
                if (remember == null || remember == undefined) {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'auth', state: { routes: [{ name: 'signin' }] } }],
                    });
                } else {
                    const res = await auth.loginWithToken(setLoading);
                    // console.log("Res: ", res);
                    if (res) {
                        const userLogin = res;
                        const newAvatar = userLogin.avatar == null ? '' : userLogin.avatar
                        dispatch(authSlice.actions.setUserLogin({
                            ...userLogin,
                            avatar: newAvatar
                        }));
                        navigation.navigate('bottom');
                    } else {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'auth', state: { routes: [{ name: 'signin' }] } }],
                        });
                    };
                }
                setLoading(false)

            } else {
                setLoading(false);
            }
        }

        const start = async () => {
            // await storage.clearData('nextIntro')
            const data = await storage.getData('nextIntro');
            // console.log(data);

            if (data) {
                setTimeout(checkLogin, 3000);
            } else {
                console.log(nextIntro);
                setLoading(false)
            }
        }
        start()

    }, []);

    const handlerDone = async () => {

        await storage.saveData('nextIntro', true);
        navigation.reset({
            index: 0,
            routes: [{ name: 'auth', state: { routes: [{ name: 'signin' }] } }],
        });
    }

    const ItemSlider = (item) => {
        // console.log(item.image);
        return (
            <View key={item.key} style={[st.containerItem]}>
                <LottieView
                    source={item.image}
                    style={{ width: SIZES.W - 70, height: 400 }}
                    autoPlay
                />
                <View style={st.textContainer}>
                    <Text style={[st.text, st.title]}>{item.title}</Text>
                    <Text style={[st.text, st.content]}>{item.content}</Text>
                </View>
            </View>
        )
    }



    return (
        <View style={[st.container]}>
            {
                loading ? (
                    <>
                        <ActivityIndicator size={30} color={'red'} />
                    </>
                ) : (
                    <>
                        <AppIntroSlider
                            style={[st.introContainer]}
                            data={dataIntroSlider}
                            renderItem={({ item }) => ItemSlider(item)}
                            dotStyle={[st.dot]}
                            activeDotStyle={[st.dotActive]}
                            showSkipButton={true}
                            showPrevButton={true}
                            showDoneButton={true}
                            onDone={handlerDone}
                            dotClickEnabled={false}
                        />
                    </>
                )
            }
        </View>
    )
}

const st = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    },
    introContainer: {
        flex: 1,
        backgroundColor: 'black',
        width: SIZES.W,
        height: SIZES.H
    },
    containerItem: {
        width: SIZES.W,
        height: SIZES.H * 0.8,
        alignItems: 'center',
        paddingVertical: 50,
        justifyContent: 'space-evenly'
    },
    dot: {
        width: 10,
        height: 10,
        backgroundColor: 'white',
    },
    dotActive: {
        width: 25,
        height: 10,
        backgroundColor: 'red'
    },
    text: {
        color: 'white',
        textAlign: 'center'
    },
    textContainer: {
        width: SIZES.W - 70,
    },
    title: {
        fontWeight: 'bold',
        fontSize: SIZES.h0,
        marginBottom: 20
    },
    content: {
        fontSize: SIZES.h4
    }
})