import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, FlatList } from 'react-native'
import { iOSUIKit } from 'react-native-typography'
import FastImage from 'react-native-fast-image'
import database from '@react-native-firebase/database';
import { useNavigation, useRoute } from '@react-navigation/core';

import { icBack } from '../assets';
import { ImageChapter, SkeletonChapter, ControlChapter } from "../components"
import { ScrollView } from 'react-native-gesture-handler';
import { Story } from '../classes';

const { width, height } = Dimensions.get("window")

export const Chapter = () => {

    const route = useRoute()
    const navi = useNavigation()
    const { index = 0, story = new Story() } = route.params

    const [chapters, setChapters] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const onBack = () => navi.goBack()

    const readData = async () => {
        try {
            let id = story.id + "-".concat(index)

            const detail = await database().ref('chapters').child(id).once('value')

            let temps = detail.val()

            if (!temps) return

            temps = Object.values(temps)

            setChapters(temps)
            setIsLoading(false)
        } catch (error) {
            console.log("ERROR", error)
        }
    }

    const renderChapter = () => {
        let temps = (chapters.map((i, j) => <ImageChapter key={j.toString()} uri={i} />))
        temps.push(<ControlChapter
            key={"99999"}
            chapter={story ? story.chapters[index] : "Nothing"}
            onPress_Next={onPress_Next}
            onPress_Behind={onPress_Behind}
        />)
        return temps
    }

    const onPress_Next = () => {
        navi.replace("Chapter", { index: ((!index) ? story.chapters.length : (index)) - 1, story: story })
    }

    const onPress_Behind = () => {
        navi.replace("Chapter", { index: (index + 1) % story.chapters.length, story: story })
    }

    useEffect(() => {
        readData()
    }, [])

    return (
        <View style={styles.conatiner}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.content_header}>
                    <TouchableOpacity onPress={onBack} style={styles.content_backbtn}>
                        <FastImage source={icBack} style={styles.ic_back} />
                    </TouchableOpacity>
                    <View style={styles.content_title}>
                        <Text style={iOSUIKit.title3Emphasized}>{story ? story.chapters[index] ? story.chapters[index].name : "Nothing" : "Nothing"}</Text>
                    </View>
                </View>
                <SkeletonChapter isLoading={isLoading}>
                    {renderChapter()}
                </SkeletonChapter>
            </ScrollView>
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
        marginBottom: 10
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
})