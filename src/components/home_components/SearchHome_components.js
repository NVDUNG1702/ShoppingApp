import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { memo, useState } from 'react'
import IconSetting from '../../accets/home/svg_home/setting_search.svg';
import IconSearch from '../../accets/home/svg_home/search.svg';
import IconClear from '../../accets/home/svg_home/clear.svg';
import { SHADOW } from '../../constants/theme';
export default memo(function SearchHome_components({value, onChangText}) {
    return (
        <View style={[st.container]}>
            <View style={[st.inputContainer]}>
                <TouchableOpacity>
                    <IconSearch width={30} height={30} />
                </TouchableOpacity>
                <TextInput style={[st.input]} placeholder={'Find your favorite product'} value={value} onChangeText={onChangText}/>
            </View>
            {/* <TouchableOpacity
                onPress={() => {
                    setShowSelect(!showSelect)
                }}
            >
                {showSelect ? <IconClear width={40} height={40} /> : <IconSetting width={40} height={40} />}
            </TouchableOpacity>
            {
                showSelect && (
                    <View style={[st.settingSearchContainer, SHADOW.shadow('black', 1, 3, 5, 0.2, 5)]}>
                        <View>
                            <Text>Giá:</Text>
                        </View>
                    </View>
                )
            } */}
        </View>
    )
})

const st = StyleSheet.create({
    container: {
        width: '90%',
        backgroundColor: 'white',
        minHeight: '7%',
        borderRadius: 15,
        shadowColor: 'black',
        shadowOffset: { width: 5, height: 5 },
        shadowRadius: 15,
        shadowOpacity: 0.15,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
        elevation: 10,
        zIndex: 10,
        maxHeight: '7%'
    },
    inputContainer: {
        width: '80%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    input: {
        width: '85%'
    },
    settingSearchContainer: {
        width: '60%',
        position: 'absolute',
        height: 150,
        bottom: -170,
        backgroundColor: 'white',
        marginTop: 100,
        borderRadius: 20,
        right: 0,
        padding: 20
    }
})