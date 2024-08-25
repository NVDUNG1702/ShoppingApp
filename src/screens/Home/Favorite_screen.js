import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { userLoginSelector } from '../../redux/selector';
import { ProductAPI } from '../../service/api/product/API_Product';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, SIZES } from '../../constants/theme';
import Header_components from '../../components/Header_components';
import ItemFavorite_components from '../../components/ItemFavorite_components';
import { FlashList } from '@shopify/flash-list';
import LottieView from 'lottie-react-native';

export default function Favorite_screen({ navigation }) {
  const userLogin = useSelector(userLoginSelector);

  const [favorites, setFavorites] = useState();

  useFocusEffect(
    useCallback(() => {
      // console.log("open");

      try {
        const getFavorite = async () => {
          const resFavorite = await ProductAPI.getFavoriteProduct(userLogin.id);
          // console.log(resFavorite);

          await setFavorites(resFavorite.data.data)

        }
        getFavorite()
      } catch (error) {
        console.log(error);

      } finally {
        // console.log(favorites);
      }

    }, [])
  )


  const handleShowProduct = (id) => {
    navigation.navigate('detailProduct', { id });
  }

  const handleDeleteProduct = async (id) => {
    const res = await ProductAPI.deleteFavorite(id);
    if (res.dataDelete == 1) {
      let newListFavorite = favorites.filter((item) => {
        return item.id != id
      })

      setFavorites([...newListFavorite]);
    } else {
      Alert.alert('Error Delete', 'vui lòng thử lại sau')
    }
  }
  return (
    <View style={{ flex: 1 }}>
      <Header_components lable={'FAVORITESCREEN'} />
      {favorites == undefined ? (
        <LottieView
          autoPlay
          source={require('../../accets/json_g/404.json')}
          style={{ width: '100%', height: 400 }}
        />
      ) : (
        <View style={{ width: SIZES.W, height: SIZES.H * 0.9, alignItems: 'center', paddingVertical: 30 }}>
          {
            favorites == '' ? (
              <LottieView
                autoPlay
                source={require('../../accets/json_g/null.json')}
                style={{ width: '100%', height: 400 }}
              />
            ) : (
              <FlatList
                data={favorites}
                renderItem={({ item }) => <ItemFavorite_components data={item} onPressShowDetail={handleShowProduct} onPressDelete={handleDeleteProduct} />}
                estimatedItemSize={200}
                keyExtractor={(item) => item.id}
                style={{ width: '100%' }}

              />
            )
          }
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({})