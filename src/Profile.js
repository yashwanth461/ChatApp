import {View, Text, StyleSheet, Image, Button} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

//renders user page pic with logout logic
const ProfileScreen = ({navigation}) => {
 // to get the current user login
  const user = auth().currentUser;

  //logout logic implementation
  const handleLogout = async() => {  
    try {
      await auth().signOut();
      AsyncStorage.removeItem('user')
       // Perform logout using Firebase auth
      navigation.navigate('Login'); // Navigate to the Login screen after successful logout
    } catch (error) {
      console.log('Logout error:', error);
    } 
  };


  return (
    <View style={styles.container}>
      <Image
        source={require('../src/assests/profile.png')}
        style={styles.profilePicture}
      />
      <Text style={styles.nameText}>{user?.email}</Text>
      <Text style={styles.label}>Profile</Text>
      <View style={styles.logoutButtonContainer}>
        <Button title="Logout" onPress={handleLogout}  />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  profilePicture: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 10,
  },
  logoutButtonContainer: {
    
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default ProfileScreen;
