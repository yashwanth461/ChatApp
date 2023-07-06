import {
    Button,
    StyleSheet,
    View,
  } from 'react-native';
  import {SafeAreaProvider} from 'react-native-safe-area-context';

const Home = ({navigation}) => {
  return (
    <SafeAreaProvider style={styles.container}>
      <View style={{flex: 1, justifyContent: 'center', width: '90%'}}>
        
        <View style={{marginLeft: 20, marginBottom: 20}}>
          <Button title="Login" style={styles.button} onPress={()=> navigation.navigate("Login")}>
            Login
          </Button>
        </View>
        <View style={{marginLeft: 20}}>
          <Button
            title="Sign_Up"
            style={styles.button}
            onPress={()=> navigation.navigate("SignupPage")}>
            Register
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
    }
  });

export default Home;


