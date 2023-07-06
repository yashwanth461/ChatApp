import React, {useState, useEffect} from 'react';
import {
  Text,
  TextInput,
  Button,
  StyleSheet,
  View,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
//install react native firebase dependency
import auth from '@react-native-firebase/auth';
import {CommonActions} from "@react-navigation/native";

//renders login screen with user inputs
const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Check if the user is already authenticated
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        // User is authenticated, navigate to the Home page
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'TabNavigator'}],
          }),
        );
      }
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, [navigation]);

  //it is used to login
  const handleLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        // Login successful
        const user = userCredential.user;
        if (user) {
          // Proceed with navigation or other actions
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'TabNavigator'}],
            }),
          );
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

  return (
    <SafeAreaProvider style={styles.container}>
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
        <View style={{marginLeft: 20, marginBottom: 20}}>
          <Button title="Back" style={styles.button} onPress={()=> navigation.navigate("Home")}>
            Login
          </Button>
        </View>
      </View>
    </SafeAreaProvider>
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
