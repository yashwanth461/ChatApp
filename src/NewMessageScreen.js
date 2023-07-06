import React, {useState, useEffect} from 'react';
import { Text, View, FlatList, TouchableOpacity, Image} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const UsersScreen = ({navigation})  => {
  const [users, setUsers] = useState([]);
  const {uid} = auth().currentUser;

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('users')
      .where('uid', '!=', uid)
      .onSnapshot(snapshot => {
        const usersArray = snapshot.docs?.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.displayName,
            email: data.email,
          };
        });
        const sortedUsers = usersArray?.sort((a, b) =>
          a.name.localeCompare(b.name),
        );

        setUsers(sortedUsers || []);
      });

    return () => {
      unsubscribe();
    };
  }, [uid]);


  console.log("users", users);

  return (
    <View style={{flex:1, paddingLeft:20,paddingRight:20,alignItems:"center",backgroundColor:'#fffff'}}>
      <FlatList
        data={users}
        renderItem={({item}) => (
            <TouchableOpacity  style={{width:'100%'}} onPress={() => navigation.navigate('ChatScreen', { selectedUser: item , myId: uid})}>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <View style={{paddingBottom:15,paddingTop:15}}>
                  <Image style={{width:50,height:50,borderRadius:25}} source={item.userImg ? item.userImg : require('../src/assests/profile.png')} />
                </View>
                <View style={{flexDirection:'column',justifyContent:'center',padding:15,paddingLeft:0,marginLeft:10,width:300,borderBottomWidth:1,borderBottomColor:'#ccccc'}}>
                  <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:5}}>
                    <Text style={{fontSize:14,fontWeight:'bold',fontFamily:'latoRegular'}}>{item.name}</Text>
                    <Text style={{fontSize:12,color:'#666',fontFamily:'latoRegular'}}>{item.messageTime}</Text>
                  </View>
                  <Text style={{fontSize:14,color:'#333333'}}>{item.messageText}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

export default UsersScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//     paddingTop: 20,
//     backgroundColor: '#408E91',
//   },
//   userItem: {
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     width: '100%',
//   },
//   userName: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 5,
//     color: '#333',
//     textDecorationLine: 'none',
//   },
//   userNameHover: {
//     textDecorationLine: 'underline',
//     color: '#666',
//   },
// });
