import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native'
import { iOSUIKit } from 'react-native-typography'
import FastImage from 'react-native-fast-image'
import database from '@react-native-firebase/database';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';

import { imgLogo } from '../assets'
import { Story } from '../classes/story';
import { ListStory, SideMenu, SkeletonListStory } from '../components';

const { width } = Dimensions.get("window")

export const Home = () => {

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const refDrawer = useRef()

    const showSideMenu = () => {
        if (refDrawer.current) refDrawer.current.openDrawer()
    }

    const readData = async () => {
        try {
            const storys = await database().ref('story').once('value')

            // Format lai du lieu
            let listStory = Object.entries(storys.val()).map((i) => new Story(i))

            setData(listStory)
            setIsLoading(false)

        } catch (error) {
            console.log("ERROR", error)
        }

    }

    useEffect(() => {
        readData()
    }, [])

    return (
        <View style={styles.conatiner}>
            <DrawerLayout
                ref={refDrawer}
                drawerWidth={width / 2}
                statusBarAnimation="fade"
                overlayColor="transparent"
                drawerBackgroundColor="transparent"
                drawerType="slide"
                renderNavigationView={() => <SideMenu />}
            >
                <View style={styles.content}>
                    <TouchableWithoutFeedback onPress={showSideMenu}>
                        <FastImage source={imgLogo} style={styles.logo} />
                    </TouchableWithoutFeedback>

                    <Text style={{ ...iOSUIKit.title3Emphasized, ...styles.title }}>Popular</Text>
                </View>

                <SkeletonListStory isLoading={isLoading}>
                    <ListStory data={data} />
                </SkeletonListStory>

            </DrawerLayout>
        </View>)


}

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white'
    },
    content: {
        flexDirection: 'row',
        paddingLeft: 10,
        alignItems: 'center'
    },
    logo: {
        width: 50, height: 50
    },
    title: {
        margin: 10
    }
})