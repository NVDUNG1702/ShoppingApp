import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { selectProduct } from '../redux/selector';
import { COLORS, SIZES } from '../constants/theme';
import IconLeftArrow from '../accets/svg_g/arrowleft.svg'
import IconRightArrow from '../accets/svg_g/arrowRight.svg'


export default function SliderComponent({ listImg }) {
    const scrollViewRef = useRef(null);

    // const listProduct = useSelector(selectProduct);
    // console.log(listImg);

    const [dostFocuse, setDostFocuse] = useState(0)

    const renderDost = () => {
        return listImg.map((item, i) => {
            return (
                <View key={i} style={{ width: dostFocuse == i ? 25 : 10, height: 10, backgroundColor: dostFocuse == i ? COLORS.DeepSkyBlue : 'black', marginHorizontal: 5, borderRadius: 10 }}>

                </View>
            )
        })
    }





    const showImg = () => {
        return listImg.map((item, i) => {
            // console.log(item);
            return (

                <View key={i} style={{ width: SIZES.W, height: 230, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={{ uri: item }} style={{ width: '70%', height: '90%', objectFit: 'contain' }} />
                    {/* <Text>hiem</Text> */}

                </View>
            )
        })
    }

    const nextSlider = () => {

        newDost = ((dostFocuse) + 1) % listImg.length;
        setDostFocuse(newDost);
        scrollViewRef.current.scrollTo({
            x: newDost * SIZES.W,
        });

    }
    const backSlider = () => {

        newDost = (dostFocuse - 1 + listImg.length) % listImg.length;
        console.log((dostFocuse - 1 + listImg.length) % listImg.length);


        setDostFocuse(newDost)
        scrollViewRef.current.scrollTo({
            x: newDost * SIZES.W,
        });
    }


    // useEffect(() => {
    //     console.log("dostFocuse: ", dostFocuse + 1);
    // }, [dostFocuse])


    return (
        <View style={{ width: '100%', height: SIZES.H * 0.3, alignItems: 'center', backgroundColor: '#d9d9d9', paddingTop: 40 }}>
            {
                listImg && (
                    <>

                        <ScrollView
                            ref={scrollViewRef}
                            style={{ width: '100%', height: '100%' }}
                            horizontal={true}
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            scrollEnabled={false}
                        >
                            {showImg()}
                        </ScrollView>
                        <TouchableOpacity style={[{ position: 'absolute', top: '50%', left: 10, backgroundColor: COLORS.white, borderRadius: 5, padding: 5 }, st.shadow]}
                            onPress={backSlider}
                        >
                            <IconRightArrow width={30} height={30} fill={'black'} style={{ transform: [{ rotate: '180deg' }] }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[{ position: 'absolute', top: '50%', right: 10, backgroundColor: COLORS.white, borderRadius: 5, padding: 5 }, st.shadow]}
                            onPress={nextSlider}
                        >
                            <IconRightArrow width={30} height={30} />
                        </TouchableOpacity>
                        <View style={{ width: SIZES.W, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginVertical: 10 }}>
                            {renderDost()}
                        </View>

                    </>
                )
            }
        </View>
    )
}

const st = StyleSheet.create({
    shadow: {
        shadowColor: "black",
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
        backgroundColor: 'white'
    },
})