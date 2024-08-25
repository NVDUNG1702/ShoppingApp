import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SIZES } from '../constants/theme';
import Animated, { useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import BottomTabIcon_customer from './BottomTabIcon_customer';
import LinearGradient from 'react-native-linear-gradient';
export default function TabBarBottom_customer({ state, descriptors, navigation }) {

    const MARGIN = 20;
    const TAB_BAR_WIDTH = SIZES.W - 2 * MARGIN;
    const TAB_WIDTH = TAB_BAR_WIDTH / 4;
    const translateAnimation = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: withTiming(TAB_WIDTH * state.index) }]
        }
    })
    return (
        <LinearGradient
            colors={['#696eff', '#f8acff']}
            style={[st.tabBarContainer, { width: TAB_BAR_WIDTH, bottom: MARGIN }, st.shadow]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
        >
            {/* <View style={[st.tabBarContainer, { width: TAB_BAR_WIDTH, bottom: MARGIN }, st.shadow]}> */}
                <Animated.View style={[{ width: TAB_WIDTH }, st.slidingTabContainer, translateAnimation]}>
                    <View style={[st.slidingTab]}></View>
                </Animated.View>

                {
                    state.routes.map((route, index) => {
                        const { options } = descriptors[route.key];
                        const isFocused = state.index === index;
                        onPress = () => {
                            const event = navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                                canPreventDefault: true,
                            });
                            if (!isFocused && !event.defaultPreventd) {
                                navigation.navigate(route.name, route.params);
                            }
                        };


                        const onLongPress = () => {
                            navigation.emit({
                                type: 'tabLongPress',
                                target: route.key,
                            });
                        };

                        return (
                            <Pressable
                                key={route.key}
                                accessibilityRole='button'
                                accessibilityState={isFocused ? { selected: true } : {}}
                                accessibilityLabel={options.tabBarAccessibilityLabel}
                                testID={options.tabBarTestID}
                                onPress={onPress}
                                onLongPress={onLongPress}
                                style={{ flex: 1 }}
                            >
                                <View style={[st.contentContainer]}>
                                    <BottomTabIcon_customer focused={isFocused} route={route.name} />

                                </View>
                            </Pressable>
                        )

                    })
                }

            {/* </View> */}
        </LinearGradient>
    )
}

const st = StyleSheet.create({
    tabBarContainer: {
        flex: 1,
        height: 75,
        flexDirection: 'row',
        backgroundColor: 'black',
        position: 'absolute',
        alignSelf: 'center',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    slidingTabContainer: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center'
    },
    slidingTab: {
        width: 65,
        height: 65,
        borderRadius: 50,
        backgroundColor: 'white',

    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4
    },
    shadow: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 8,
        shadowOpacity: 1,
    }
})

