import React from 'react'
import { Dimensions } from 'react-native'
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

const { width, height } = Dimensions.get("window")

export const SkeletonChapter = (props) => {

    const { isLoading = false } = props

    return (
        <SkeletonContent
            containerStyle={{ flex: 1 }}
            isLoading={isLoading}
            layout={[
                {
                    width: width - 40,
                    height: height / 1.5, marginBottom: 10
                },
                {
                    width: width - 40,
                    height: height / 3, marginBottom: 10
                },
                {
                    width: width - 40,
                    height: height / 2, marginBottom: 10
                },]}
        >
            {props.children}
        </SkeletonContent>
    );
}