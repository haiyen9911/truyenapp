import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { iOSUIKit } from 'react-native-typography'
import FastImage from 'react-native-fast-image'

import { icBehind, icNext } from '../assets'
import { Chapter } from '../classes'

export const ControlChapter = (props) => {

    const { onPress_Next = () => { }, onPress_Behind = () => { }, chapter = new Chapter() } = props

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={onPress_Behind}>
                <FastImage source={icBehind} style={styles.image} />
            </TouchableOpacity>
            <View style={styles.content}>
                <Text style={{ ...iOSUIKit.footnoteEmphasized, textAlign: 'center' }}>{chapter.name}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={onPress_Next}>
                <FastImage source={icNext} style={styles.image} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 40, height: 40,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10, borderWidth: 2, borderStyle: 'dashed'
    },
    container: {
        backgroundColor: 'white',
        padding: 5, flexDirection: 'row'
    },
    image: {
        width: 20,
        height: 20
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5
    }
})

