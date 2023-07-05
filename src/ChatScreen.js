import React, {useState, useEffect} from 'react';
import {View, Image} from 'react-native';
import {useRoute} from '@react-navigation/native';
//used gifted chat template
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import {launchCamera} from 'react-native-image-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native-gesture-handler';
//database to store image
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

//renders new message chat screen with image sending logic
const ChatScreen = () => {
  const [messages, setMessages] = useState([]); 
  const [imageData, setImageData] = useState(null); // store image data
  const [imageUrl, setImageUrl] = useState(''); //store image url
  const route = useRoute();

  useEffect(() => {
    //to get all message from firestore
    const querySnapShot = firestore()
      .collection('chats')
      .doc('123456789')
      .collection('messages')
      .orderBy('createdAt', 'desc');
    querySnapShot.onSnapshot(snapShot => {
      const allMessages = snapShot.docs?.map(snap => {
        return {...snap.data(), createdAt: new Date()};
      });
//set returned messages
      setMessages(allMessages);
    });
  }, []);

  
  const onSend = messageArray => {  
    let myMsg = null;
    if (imageUrl !== '') {
      const msg = messageArray[0];
      myMsg = {
        ...msg,
        senderId: route.params?.myId,
        receiverId: route.params?.userId,
        image: imageUrl,
      };
    } else {
      const msg = messageArray[0];   
      myMsg = {
        ...msg,
        senderId: route.params?.myId,
        receiverId: route.params?.userId,
        image: '',
      };
    }

    setMessages(previousMessages => GiftedChat.append(previousMessages, myMsg));
    firestore()
      .collection('chats')
      .doc(route.params?.myId)
      .collection('messages')
      .add({
        ...myMsg,
        createdAt: new Date(),
      });
    setImageUrl('');
    setImageData(null);
  };

  //on click open camera and store image data
  const openCamera = async () => {
    const result = await launchCamera({mediaType: 'photo'});
    console.log(result);
    if (result.didCancel && result.didCancel == true) {
    } else {
      setImageData(result);
      uplaodImage(result);
    }
  };

  //uplaod and set image url
  const uplaodImage = async imageDataa => {
    const reference = storage().ref(imageDataa.assets[0].fileName);
    const pathToFile = imageData.assets[0].uri;
    await reference.putFile(pathToFile);
    const url = await storage()
      .ref(imageData.assets[0].fileName)
      .getDownloadURL();
    console.log('url', url);
    setImageUrl(url);
  };

  //
  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

  //chat scrollable
  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };
  return (
    <View style={{flex: 1}}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: route.params?.myId,
        }}
        renderBubble={renderBubble}
        alwaysShowSend
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
        renderSend={props => {
          return (
            <View
              style={{flexDirection: 'row', alignItems: 'center', height: 60}}>
              {imageUrl !== '' ? (
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    backgroundColor: '#fff',
                    marginRight: 10,
                  }}>
                  <Image
                    source={{uri: imageData.assets[0].uri}}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      position: 'absolute',
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setImageUrl('');
                    }}>
                    <Image
                      source={require('../src/assests/profile.png')}
                      style={{width: 16, height: 16, tintColor: '#fff'}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setImageUrl('');
                    }}>
                    <Image
                      source={require('../src/assests/profile.png')}
                      style={{width: 16, height: 16, tintColor: '#fff'}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setImageUrl('');
                    }}>
                    <Image
                      source={require('../src/assests/profile.png')}
                      style={{width: 16, height: 16, tintColor: '#fff'}}
                    />
                  </TouchableOpacity>
                </View>
              ) : null}
              <TouchableOpacity
                style={{marginRight: 20}}
                onPress={() => {
                  openCamera();
                }}>
                <Image
                  source={require('../src/assests/profile.png')}
                  style={{width: 24, height: 24}}
                />
              </TouchableOpacity>
              <Send {...props} containerStyle={{justifyContent: 'center'}}>
                <Image
                  source={require('../src/assests/profile.png')}
                  style={{
                    width: 24,
                    height: 24,
                    marginRight: 10,
                    tintColor: 'orange',
                  }}
                />
              </Send>
            </View>
          );
        }}
      />
    </View>
  );
};

export default ChatScreen;


