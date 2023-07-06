import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'; //install dependency. 
import React from 'react';
import ProfileScreen from './Profile';
import MessagesScreen from './NewMessageScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();  


const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        tabBarActiveTintColor: '#e91e63',  
      }}>
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="face-man-profile" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Message"
        component={MessagesScreen}
        options={{
          tabBarLabel: 'Message',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="chat"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
