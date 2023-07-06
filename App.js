import {StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import LoginScreen from './src/LoginPage';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigator from './src/TabNavigator';

import ChatScreen from './src/NewChatScreen';
import SignupPage from "./src/SignUp";
import Home from "./src/Home";

//Its show which page should be render first in the UI
const Stack = createStackNavigator();

//initial render page with navigator container
// all component wrapped under navigator container

function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name ="Home" component={Home}/>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignupPage" component={SignupPage}/>

          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
