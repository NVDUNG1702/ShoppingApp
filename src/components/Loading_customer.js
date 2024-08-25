import { Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';

export default function Loading_customer({loading, setLoading}) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={loading}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setLoading(!loading);
            }}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
                <LottieView source={require('../accets/loading.json')} style={{ width: 500, height: 500 }} autoPlay />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({})