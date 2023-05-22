import React from 'react'
import { Dimensions } from 'react-native'
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

const { width, height } = Dimensions.get("window")

export const SkeletonListStory = (props) => {

    const { isLoading = false } = props

    return (
        <SkeletonContent
            containerStyle={{ flex: 1, margin: 5 }}
            isLoading={isLoading}
            layout={[
                {
                    flexDirection: 'row',
                    children: [
                        { width: (width - 90) / 2, height: height / 3, margin: 15, },
                        { width: (width - 90) / 2, height: height / 3, margin: 15, marginTop: 0 }
                    ]
                },
                {
                    flexDirection: 'row',
                    children: [
                        { width: (width - 90) / 2, height: height / 3, margin: 15, },
                        { width: (width - 90) / 2, height: height / 3, margin: 15, marginTop: 0 }
                    ]
                },
                {
                    flexDirection: 'row',
                    children: [
                        { width: (width - 90) / 2, height: height / 3, margin: 15, },
                        { width: (width - 90) / 2, height: height / 3, margin: 15, marginTop: 0 }
                    ]
                },]}
        >
            {props.children}
        </SkeletonContent>
    );
}