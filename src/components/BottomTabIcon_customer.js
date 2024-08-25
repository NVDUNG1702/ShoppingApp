import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/theme';
import IconHome_Outline from '../accets/home/svg_home/home_outline.svg';
import IconHome from '../accets/home/svg_home/home.svg';
import IconHeart_Outline from '../accets/home/svg_home/heart_outline';
import IconHeart from '../accets//home/svg_home/heart.svg';
import IconCart_Outline from '../accets/home/svg_home/cart_outline.svg';
import IconCart from '../accets/home/svg_home/cart.svg';
import IconUser from '../accets/home/svg_home/user.svg';
import IconUser_Outline from '../accets/home/svg_home/user_outline.svg';
import IconSetting from '../accets/home/svg_home/setting.svg';
import IconSetting_Outline from '../accets/home/svg_home/setting_outline.svg';

export default function BottomTabIcon_customer({ route, focused }) {
    const sizeIcon = 34;
    const colorFocused = COLORS.DeepSkyBlue;
    const colorFocusedNull = COLORS.white;
    const RenderIcon = () => {
        switch (route) {
            case "home": {
                return (
                    focused ? (
                        <>
                            <IconHome width={sizeIcon} height={sizeIcon} fill={colorFocused} />
                        </>
                    ) : (
                        <>
                            <IconHome_Outline fill={colorFocusedNull} stroke={colorFocusedNull} width={sizeIcon} height={sizeIcon} />
                        </>
                    )
                );
                break;
            }
            case "favorite": {
                return (
                    focused ? (
                        <>
                            <IconHeart width={sizeIcon} height={sizeIcon} fill={colorFocused} />
                        </>
                    ) : (
                        <>
                            <IconHeart_Outline fill={colorFocusedNull} stroke={colorFocusedNull} width={sizeIcon} height={sizeIcon} />
                        </>
                    )
                );
                break;
            }
            case "cart": {
                return (
                    focused ? (
                        <>
                            <IconCart width={sizeIcon} height={sizeIcon} fill={colorFocused} />
                        </>
                    ) : (
                        <>
                            <IconCart_Outline fill={colorFocusedNull} width={sizeIcon} height={sizeIcon} />
                        </>
                    )
                );
                break;
            }
            case "profile": {
                return (
                    focused ? (
                        <>
                            <IconUser width={sizeIcon} height={sizeIcon} fill={colorFocused} />
                        </>
                    ) : (
                        <>
                            <IconUser_Outline fill={colorFocusedNull} width={sizeIcon} height={sizeIcon} />
                        </>
                    )
                );
                break;
            }

            // case "setting": {
            //     return (
            //         focused ? (
            //             <>
            //                 <IconSetting width={sizeIcon} height={sizeIcon} />
            //             </>
            //         ) : (
            //             <>
            //                 <IconSetting fill={'white'} width={sizeIcon} height={sizeIcon} />
            //             </>
            //         )
            //     );
            //     break;
            // }

        }
    }
    return (
        <RenderIcon />
    )
}

const styles = StyleSheet.create({})