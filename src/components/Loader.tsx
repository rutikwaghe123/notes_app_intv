import { View, Text, Modal, ActivityIndicator } from 'react-native'
import React from 'react'

interface LoaderProps {
    isVisible: boolean
}

const Loader = ({ isVisible }: LoaderProps) => {
    return (
        <Modal transparent visible={isVisible}>
            <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" }}>

                <View style={{ width: 80, height: 80, borderRadius: 1 }}>
                    <ActivityIndicator size={"large"} color="#000" />
                </View>
            </View>
        </Modal>
    )
}

export default Loader