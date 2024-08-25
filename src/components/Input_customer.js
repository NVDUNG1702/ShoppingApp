import { StyleSheet, Text, TextInput, View, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import React, { memo, useState } from 'react'
import IconError from '../accets/svg_input/error.svg'
import IconEye from '../accets/svg_input/eye.svg'
import IconEyeOff from '../accets/svg_input/eye_off.svg'
import { COLORS } from '../constants/theme'
export default memo(function Input_customer({ IconLeft, placeholder, err, pass, number, value, setValue, setError }) {
    const sizeIcon = 30;
    const [showPass, setShowPass] = useState(true);
    return (
        <View
            style={{ height: 60, marginVertical: 10, margin: 'auto' }}>
            <View
                style={[st.container, { borderColor: err?.hasError ? COLORS.error : COLORS.DeepSkyBlue }]}
            // behavior={"padding"}
            // keyboardVerticalOffset={700}
            >
                <View style={[st.iconContainer]}>
                    {IconLeft && <IconLeft stroke={err?.hasError ? COLORS.error : COLORS.DeepSkyBlue} width={sizeIcon} height={sizeIcon} />}
                </View>
                <TextInput
                    style={[st.inputContainer]}
                    placeholder={placeholder}
                    secureTextEntry={pass ? showPass : false}
                    keyboardType={number ? 'numeric' : 'default'}
                    value={value}
                    onChangeText={(txt) => {
                        setValue(txt);
                        setError(false)
                    }}
                />

                <TouchableOpacity
                    style={[st.iconContainer]}
                    onPress={() => {
                        setShowPass(!showPass)
                    }}
                >
                    {/* {iconRight && (
                    <iconRight width={sizeIcon} height={sizeIcon} />
                )} */}
                    {
                        err?.hasError ? (
                            <>
                                <IconError width={sizeIcon} height={sizeIcon} fill={COLORS.error} />
                            </>
                        ) : (
                            pass && (
                                showPass ? (
                                    <>
                                        <IconEye fill={COLORS.DeepSkyBlue} width={sizeIcon} height={sizeIcon} />
                                    </>
                                ) : (
                                    <>
                                        <IconEyeOff fill={COLORS.DeepSkyBlue} width={sizeIcon} height={sizeIcon} />
                                    </>
                                )
                            )
                        )
                    }
                </TouchableOpacity>



            </View>
            {
                err?.hasError && (
                    <Text style={{ textAlign: 'left', color: '#cccccc' }}>
                        {err.message}
                    </Text>
                )
            }
        </View>
    )
})

const st = StyleSheet.create({
    container: {
        width: '90%',
        height: 50,
        borderWidth: 1,
        borderRadius: 15,
        flexDirection: 'row',
        paddingHorizontal: '1.5%',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    inputContainer: {
        width: '77%',
        height: 50,
        // backgroundColor: 'black'

    },
    iconContainer: {
        width: '10%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }

})