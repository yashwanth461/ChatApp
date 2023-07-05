
import React from 'react';
import {  FlatList, View ,Text,Image} from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';

//static data of user chat list
const Messages = [
  {
    id: '1',
    userName: 'Jenny Doe',
    userImg: require('../src/assests/profile.png'),
    messageTime: '4 mins ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '2',
    userName: 'John Doe',
    userImg: require('../src/assests/profile.png'),
    messageTime: '2 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '3',
    userName: 'Ken William',
    userImg: require('../src/assests/profile.png'),
    messageTime: '1 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '4',
    userName: 'Selina Paul',
    userImg: require('../src/assests/profile.png'),
    messageTime: '1 day ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '5',
    userName: 'Christy Alex',
    userImg: require('../src/assests/profile.png'),
    messageTime: '2 days ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
];

//renders static list of the user chat list 
// used react native flatlist to loop the static data
const MessagesScreen = ({navigation}) => {

    const user = auth().currentUser;
    return (
      <View style={{flex:1, paddingLeft:20,paddingRight:20,alignItems:"center",backgroundColor:'#fffff'}}>
        <FlatList 
          data={Messages}
          keyExtractor={item=>item.id}
          renderItem={({item}) => (
            <TouchableOpacity  style={{width:'100%'}} onPress={() => navigation.navigate('ChatScreen', {userName: item.userName, userId: item.id , myId: user.uid})}>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <View style={{paddingBottom:15,paddingTop:15}}>
                  <Image style={{width:50,height:50,borderRadius:25}} source={item.userImg} />
                </View>
                <View style={{flexDirection:'column',justifyContent:'center',padding:15,paddingLeft:0,marginLeft:10,width:300,borderBottomWidth:1,borderBottomColor:'#ccccc'}}>
                  <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:5}}>
                    <Text style={{fontSize:14,fontWeight:'bold',fontFamily:'latoRegular'}}>{item.userName}</Text>
                    <Text style={{fontSize:12,color:'#666',fontFamily:'latoRegular'}}>{item.messageTime}</Text>
                  </View>
                  <Text style={{fontSize:14,color:'#333333'}}>{item.messageText}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
};

export default MessagesScreen;

