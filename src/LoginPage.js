import React, {useState} from 'react';
import {
  Text,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
  View,
} from 'react-native';
//install react native firebase dependency
import auth from '@react-native-firebase/auth';

//renders login screen with user inputs
const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //it is used to login
  const handleLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        // Login successful
        const user = userCredential.user;
        if (user) {
          // Proceed with navigation or other actions
          navigation.navigate('TabNavigator', {name: user.email}); //Its shows username in profile screen
        }
        console.log('user', user);
      })
      .catch(error => {
        alert(error.message);
        // Handle login error
        const errorMessage = error.message;
        // Display error message to the user
        console.log('error', errorMessage);
      });
  };

  //Used for creating/registering the user email and password
  const handleRegister = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        // Login successful
        const user = userCredential.user;
        // Proceed with navigation or other actions
        if(user) alert('Successfully Registered');
      })
      .catch(error => {
        // Handle login error
        const errorMessage = error.message;
        // Display error message to the user
        alert(errorMessage);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1, justifyContent: 'center', width: '90%'}}>
        <Text style={[styles.label]}>Email</Text>

        <TextInput
          style={styles.input}
          onChangeText={text => setEmail(text)}
          value={email}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setPassword(text)}
          value={password}
          placeholder="Enter your password"
          secureTextEntry
        />

        <View style={{marginLeft: 20, marginBottom: 20}}>
          <Button title="Login" style={styles.button} onPress={handleLogin}>
            Login
          </Button>
        </View>
        <View style={{marginLeft: 20}}>
          <Button
            title="Register"
            style={styles.button}
            onPress={handleRegister}>
            Register
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    marginLeft: 20,
    borderColor: '#007AFF',

    padding: 10,
    borderRadius: 25,
  },
});

export default LoginScreen;
