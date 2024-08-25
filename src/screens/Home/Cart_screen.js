import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import Header_components from '../../components/Header_components'
import { useFocusEffect } from '@react-navigation/native'
import { useSelector } from 'react-redux';
import { userLoginSelector } from '../../redux/selector';
import { orderAPI } from '../../service/api/order/API_Order';
import { COLORS, SIZES } from '../../constants/theme';
import ItemCart_Components from '../../components/ItemCart_Components';
import { FlatList } from 'react-native-gesture-handler';
import Button_customer from '../../components/Button_customer';
import { formatCurrency } from '../../untils/toPrice';
import { deliveryInfoAPI } from '../../service/api/deliveryInfo/deliveryInfo';
import LottieView from 'lottie-react-native';


export default function Cart_screen({ navigation }) {
  const [cart, setCart] = useState();
  const userLogin = useSelector(userLoginSelector);
  const [sumPrice, setSumPrice] = useState(0);

  useFocusEffect(useCallback(() => {

    const setupCart = async () => {
      try {

        // console.log(await resOrder.data.code);

        // if (resOrder.data.code == 1 || resOrder.data.code == 2) {
        //   const resDetailOrder = await orderAPI.addOrUpdate(product.productId, resOrder.data.code, size[focusedSize].id, quantity);
        //   if (resDetailOrder.data.code == 0) {
        //     Alert.alert("Error", "Add Error!");
        //   } else if (resDetailOrder.data.code == 1) {
        //     Alert.alert("Error", "Số lượng sản phẩm không đủ!");
        //   } else if (resDetailOrder.data.code == 3) {
        //     Alert.alert("Error", "Sản phẩm trong kho đã hết sản phẩm sẽ bị xoá khỏi giỏ hàng!")
        //   }
        // }
        const data = await orderAPI.getCartByID(userLogin.id, '')
        await setCart(data)
        const sum = data.reduce((accumulator, item) => accumulator + item.totalAmount, 0);
        setSumPrice(sum);
      } catch (error) {

      } finally {
        setTimeout(async () => {

        }, 1000)

      }
    }
    setupCart()
  }, []))


  const handleShowProduct = useCallback((id) => {
    navigation.navigate('detailProduct', { id });
  }, [cart])

  const update = async (productID, orderID, sizeID, quantity) => {
    const res = await orderAPI.addOrUpdate(productID, orderID, sizeID, quantity);
    if (res.data.code == 2 || res.data.code == 4) {
      const cartNew = await orderAPI.getCartByID(userLogin.id, '')
      setCart(cartNew)
      let sum = 0;
      cartNew.map(item => sum += item.totalAmount);
      setSumPrice(sum)
    } else if (res.data.code == 1) {
      Alert.alert("WARNING", "Số lượng sản phẩm trong kho không đủ !")
    }

    // console.log("code: ", res.data.code);

  }

  const nextOrder = async () => {
    const res = await deliveryInfoAPI.getAll(userLogin.id);
    if (res.data == '') {
      Alert.alert('Error', 'Thông tin nhận hàng không tồn tại vui lòng bổ sung', [
        {
          text: 'cancel',
          style: 'cancel'
        },
        {
          text: 'ok',
          onPress: () => { navigation.navigate('receivingInformation') }
        }
      ])
      return
    }
    navigation.navigate('orderConfirmation', { id: cart.orderID })
  }

  return (
    <View style={{ flex: 1 }}>
      <Header_components lable={'MY CART'} />

      {cart == undefined ? (
        <>
          <LottieView
            autoPlay
            source={require('../../accets/json_g/404.json')}
            style={{ width: '100%', height: 400 }}
          />
        </>
      ) : (
        <>
          {cart == '' ? (
            <LottieView
              autoPlay
              source={require('../../accets/json_g/null.json')}
              style={{ width: '100%', height: 400 }}
            />
          ) : (
            <View style={{ width: SIZES.W, height: SIZES.H * 0.67, alignItems: 'center', paddingVertical: 30, }}>
              <FlatList
                data={cart}
                renderItem={({ item }) => <ItemCart_Components data={item} onPressShowDetail={handleShowProduct} update={update} />}
                estimatedItemSize={200}
                keyExtractor={(item) => item.detailID}
                style={{ width: '100%' }}

              />
            </View>
          )}
        </>
      )}
      <View style={{ width: '100%', position: 'absolute', bottom: 120, alignItems: 'center' }}>
        {
          sumPrice != 0 && sumPrice != null && cart != undefined && < Button_customer lable={'Pay: ' + formatCurrency(sumPrice)} fun={nextOrder} />
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})