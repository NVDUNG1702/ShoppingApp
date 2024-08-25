import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { SHADOW, SIZES } from '../../constants/theme'

export default memo(function SliderHome_components() {
  // const nextSlider = () => {
  //   newDost = ((dostFocuse) + 1) % listProduct[0].image.length;
  //   setDostFocuse(newDost);
  //   scrollViewRef.current.scrollTo({
  //     x: newDost * W,
  //   });

  // }
  // const backSlider = () => {

  //   newDost = (dostFocuse - 1 + listProduct[0].image.length) % listProduct[0].image.length;

  //   setDostFocuse(newDost)
  //   scrollViewRef.current.scrollTo({
  //     x: newDost * W,
  //   });
  // }

  const dataSlider = [
    {
      id: 1,
      image: require('../../accets/home/imageSlider/1.png')
    },
    {
      id: 2,
      image: require('../../accets/home/imageSlider/2.png')
    },
    {
      id: 3,
      image: require('../../accets/home/imageSlider/3.png')
    },
    {
      id: 4,
      image: require('../../accets/home/imageSlider/4.png')
    },
  ]
  return (
    <View style={[st.container]}>
      <View style={[st.contents, SHADOW.shadow('black', 0, 2, 5, 0., 3)]}>
        <FlatList
          data={dataSlider}
          renderItem={({ item }) => {
            return (
              <Image source={item.image} style={{ objectFit: 'cover', height: '100%', width: SIZES.W * 0.9 }} resizeMode='cover' />
            )
          }}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  )
})

const st = StyleSheet.create({
  container: {
    width: SIZES.W,
    height: 150,
    // backgroundColor: 'black'
    justifyContent: 'center',
    alignItems: 'center'
  },
  contents: {
    width: '90%',
    height: 130,
    backgroundColor: 'white',
    // borderRadius: 20
  }
})