import { ActivityIndicator, Image, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderHome_components from '../../components/home_components/HeaderHome_components'
import SearchHome_components from '../../components/home_components/SearchHome_components'
import { SHADOW, SIZES } from '../../constants/theme'
import { useSelector } from 'react-redux'
import { userLoginSelector } from '../../redux/selector'
import MenuHome_components from '../../components/home_components/MenuHome_components'
import SliderHome_components from '../../components/home_components/SliderHome_components'
import CategoryList_components from '../../components/home_components/CategoryList_components'
import ShowAllProduct_components from '../../components/home_components/product/ShowAllProduct_components'
import ShowProductsByType from '../../components/home_components/product/ShowProductsByType'
import { ProductAPI } from '../../service/api/product/API_Product'

export default function HomeUser_screen({ navigation }) {
  const userLogin = useSelector(userLoginSelector);
  const [menuFocused, setMenuFocused] = useState('All')
  const [textSearch, setTextSearch] = useState('')
  // console.log("Width: ", SIZES.W);
  const padding = Platform.OS == 'ios' ? 60 : 10;

  const [loading, setLoading] = useState(false)
  const [dataProduct, setDataProduct] = useState([])

  useEffect(() => {
    const getDataProduct = async () => {
      const res = await ProductAPI.getAllProduct(setLoading);
      if (res.status == 200) {
        // console.log(res.data);

        setDataProduct(res.data)
      }
    }
    getDataProduct()
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: 'white', }}>
      {/* <ScrollView style={{ width: SIZES.W, height: SIZES.H }}
      > */}
      <View style={[st.container, { paddingTop: padding }]}>
        <HeaderHome_components userName={userLogin.fullName} image={userLogin.avatar} />

        <SearchHome_components value={textSearch} onChangText={setTextSearch} />

        <MenuHome_components focused={menuFocused} setFocused={setMenuFocused} />

        {
          !loading ? (
            <>
              {/* <ShowAllProduct_components data={dataProduct} /> */}
              <ShowProductsByType data={dataProduct} nav={navigation} type={menuFocused} search={textSearch} />
            </>
          ) : (
            <>
              <ActivityIndicator size={34} color={'red'} />
            </>
          )
        }
        {/* <SliderHome_components /> */}
      </View>
      {/* </ScrollView> */}
    </View>
  )
}

const st = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    minHeight: 'auto',
    width: SIZES.W,
    marginBottom: 350

  },
  test: {
    width: 200,
    height: 200,
    // marginVertical: 100,
    backgroundColor: 'white',
  }
})