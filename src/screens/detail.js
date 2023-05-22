import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, TouchableOpacity, FlatList } from 'react-native'
import { iOSUIKit } from 'react-native-typography'
import FastImage from 'react-native-fast-image'
import database from '@react-native-firebase/database';
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation, useRoute } from '@react-navigation/core';

import { icBack } from '../assets';
import { Story, Chapter } from '../classes';
import { SkeletonDetail } from '../components';

const { width, height } = Dimensions.get("window")

const ItemChapter = ({ item = new Chapter(), onPress = () => { } }) => (
    <TouchableOpacity style={styles.item_chapter} onPress={onPress}>
        <Text style={iOSUIKit.subhead}>{item.name}</Text>
    </TouchableOpacity>
)

export const Detail = () => {

    const route = useRoute()
    const navi = useNavigation()
    const { story = new Story() } = route.params

    const [detail, setDetail] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const onBack = () => navi.goBack()

    const readData = async () => {
        try {
            const detail = await database().ref('detailStory').child(story.id).once('value')

            let temps = detail.val()

            if (!temps) return

            temps = Object.values(temps).map((i) => new Chapter(i))

            story.chapters = temps
            setDetail(temps)
            setIsLoading(false)
            
        } catch (error) {
            console.log("ERROR", error)
        }
    }

    const renderChapters = () => {
        return (detail.map((i, j) => <ItemChapter
            key={i.id}
            item={i}
            onPress={() => navi.navigate("Chapter", { index: j , story : story })}
        />))
    }

    useEffect(() => {
        readData()
    }, [])

    return (
        <View style={styles.conatiner}>
            <View style={styles.content_header}>
                <TouchableOpacity onPress={onBack} style={styles.content_backbtn}>
                    <FastImage source={icBack} style={styles.ic_back} />
                </TouchableOpacity>
                <View style={styles.content_title}>
                    <Text style={iOSUIKit.title3Emphasized}>{story.title}</Text>
                </View>

            </View>
            <SkeletonDetail isLoading={isLoading}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <FastImage
                        resizeMode={FastImage.resizeMode.cover}
                        source={{ uri: story.image }}
                        style={styles.card_image}
                    />

                    <Text style={iOSUIKit.subheadEmphasized}>{story.detail}</Text>

                    <Text style={{ ...iOSUIKit.title3Emphasized, marginVertical: 10 }}>List Chapter : </Text>

                    {renderChapters()}

                </ScrollView>
            </SkeletonDetail>
        </View>)

}

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white'
    },
    content_header: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 5
    },
    content_title: {
        flex: 1,
        paddingHorizontal: 20
    },
    content_backbtn: {
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    ic_back: {
        width: 28, height: 28
    },
    card_image: {
        marginVertical: 20,
        width: width - 40,
        height: width,
        alignSelf: 'center',
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
    item_chapter: {
        padding: 10,
        marginVertical: 10,
        borderWidth: 2,
        borderRadius: 10,
        borderStyle: 'dashed'
    }
})