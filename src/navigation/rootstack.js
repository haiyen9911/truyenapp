import React from 'react'
import {View, StyleSheet} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Home, Detail, Chapter } from '../screens';

const Stack = createStackNavigator();

export const RootStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Detail" component={Detail} />
                <Stack.Screen name="Chapter" component={Chapter} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}