import 'react-native-gesture-handler';
import React from 'react';
import {
  View,
  StatusBar,
  StyleSheet
} from 'react-native';

import { RootStack } from './src/navigation';

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <RootStack/>
    </View>
  );
};

const styles = StyleSheet.create({
  container : {
    flex: 1, backgroundColor:'white'
  }
})


export default App;