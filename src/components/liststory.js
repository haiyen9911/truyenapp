import React from 'react'
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableWithoutFeedback } from 'react-native'
import FastImage from 'react-native-fast-image'
import { iOSUIKit } from 'react-native-typography'
import { useNavigation } from '@react-navigation/core'

import { Story } from '../classes'

const { width, height } = Dimensions.get("window")

const Item = React.memo(({ data = new Story(), index, onPress = () => { } }) => (
    <TouchableWithoutFeedback onPress={onPress}>
        <View style={{ ...styles.content_item, marginTop: (index % 2) ? 0 : 15 }}>
            <FastImage
                resizeMode={FastImage.resizeMode.cover}
                source={{ uri: data.image }}
                style={styles.item_image} />
            <Text style={{ ...iOSUIKit.subheadEmphasized, ...styles.item_title }} numberOfLines={1}>{data.title}</Text>
        </View>
    </TouchableWithoutFeedback>
))


export const ListStory = React.memo((props) => {

    const navi = useNavigation()
    const { data = [] } = props

    return (
        <FlatList
            style={styles.container}
            numColumns={2}
            data={data}
            removeClippedSubviews
            disableVirtualization
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => <Item 
                data={item} index={index} 
                onPress={() => navi.navigate("Detail", { story: item })} 
                />}
        />
    )
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 5,
        backgroundColor: 'transparent'
    },
    content_item: {
        flex: 1, height: (height / 3),
        //backgroundColor: 'red',
        margin: 15
    },
    item_image: {
        flex: 1,
        borderRadius: 5,
        overflow: "hidden",
        //backgroundColor: 'red'
    },
    item_title: {
        marginTop: 5
    }
})