import React from 'react'
import { Dimensions } from 'react-native'
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

const { width, height } = Dimensions.get("window")

export const SkeletonDetail = (props) => {

    const { isLoading = false } = props

    return (
        <SkeletonContent
            containerStyle={{ flex: 1 }}
            isLoading={isLoading}
            layout={[
                {
                    marginVertical: 20,
                    width: width - 40,
                    height: width,
                    alignSelf: 'center',
                    borderRadius: 20,

                },
                {
                    width: width / 2,
                    height: 30, marginBottom: 10
                },
                {
                    width: width / 1.5,
                    height: 30, marginBottom: 10
                },
                {
                    width: width / 1.2,
                    height: 30, marginBottom: 10
                },
                {
                    width: width / 1.2,
                    height: 30, marginBottom: 10
                },
                {
                    width: width / 1.1,
                    height: 30, marginBottom: 10
                }]}
        >
            {props.children}
        </SkeletonContent>
    );
}