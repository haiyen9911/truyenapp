import React, { useState } from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import FastImage from 'react-native-fast-image'

const { height, width } = Dimensions.get("window")

import { createImageProgress } from 'react-native-image-progress';

const Image = createImageProgress(FastImage);

export const ImageChapter = (props) => {
    const { uri = "" } = props

    const [size, setSize] = useState({width: (width - 40), height: height - 200})

    const onLoad = (e) => {
        let imgWidth = e.nativeEvent.width
        let imgHeigth = e.nativeEvent.height

        let ratio = imgHeigth / imgWidth

        setSize({ width: (width - 40), height: (width - 40) * ratio })
    }

    return (
        <Image
            style={{...size,marginVertical: 5}}
            resizeMode={FastImage.resizeMode.contain}
            onLoad={onLoad}
            source={{
                uri: uri,
                headers: {
                    Referer: "http://www.nettruyen.com"
                }
            }}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: 100,
        maxHeight: 500,
        width: width - 40,
        backgroundColor: "white",
        marginVertical: 5
    }
})