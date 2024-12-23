import React, {useState, useEffect, useCallback} from 'react';
import {View, ScrollView, Text, Button,TouchableOpacity, StyleSheet} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Header from '../Components/Header';
import myTheme from '../utils/theme';
import { auth, db, storage } from '../config';
import { ref, set,push, onValue } from 'firebase/database';
import { useLogin } from '../utils/LoginProvider';
import {
  MaterialIcons,
  AntDesign,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import { router } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { Surface } from 'react-native-paper';


var newMessages=[];
var userIdsa='';

const Chats = ({route}) => {
  const [messages, setMessages] = useState([]);
  const [currMessage, setCurrMessage] = useState('');
  const { navigate } = useNavigation(); 
 const {userName, userIds, userTkn} = route.params;

 const { profile } = useLogin();

 //.........................................................................

  const { COLORS } = myTheme();

  useEffect(() => {
    setCurrMessage('');
    userIdsa=userIds;
    const chatsRef = ref(db, 'chats/');
    onValue(chatsRef, async(snapshot) => {

    const data = snapshot.val();
    setMessages([]);
    newMessages=[];

    if (data) {
      newData = Object.keys(data)
       .map(key => ({
           id: key,
           ...data[key]
       }));
       const whatever= (newData.filter((item) => item.receiver_id ===profile.userId || item.user._id === profile.userId).reverse()); 
      // //console.log(whatever); 
       for(const item in whatever){

        if(whatever[item].receiver_id === profile.userId && whatever[item].user._id===userIds){
          newMessages.push(whatever[item]);
        }
        if(whatever[item].user._id === profile.userId && whatever[item].receiver_id=== userIds){
            newMessages.push(whatever[item]);
        }
       }
       setMessages(newMessages);
      }
    })
  }, [userIds]);

  // Send push notifications
  const sendPushNotification = (title, message, token) => {
    console.log("sending noti")
    if(token){
      fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          'host': 'exp.host',
          'accept':'application/json',
          'accept-encoding': 'gzip, deflate',
          'content-type': "application/json"
        },
        body: JSON.stringify({
          "to": token,
          "badge": 1,
          "title": title,
          "body": message
        })
      }).then(() => {
        console.log("Sent Successfully");
        setCurrMessage('');
      }).catch((error) => {
        console.log(error.message)
      })
    } else{
      console.log('nooooooo')
      setCurrMessage('');

    }
  }

  const onSend = useCallback((currMessage) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, currMessage),
    );

    let _id = new Date().toISOString().replace(/[^1-9a-zA-Z]/g, "");

    push(ref(db, 'chats'), {
      _id: _id,
      receiver_id:userIdsa,
      text: currMessage,
      createdAt:new Date().toISOString(),
      user: {
        _id: profile.userId,
        name: profile.username,
        avatar: profile.profilePicture,
        token: userTkn
      },
      sent: true,
      received: false

    }).then(() => {
      sendPushNotification(`New message`, `${profile.username} has sent you a new chat message.`, userTkn);     
    }).catch((error) => {
      let errorMessage = error.message.replace(/[()]/g," ");
      //console.log(errorMessage);
    })
  }, []);

  const renderSend = (props) => {
    return (
      <TouchableOpacity onPress={() => {
        if(currMessage){
          onSend(currMessage)
        }else{
        }
      }}>
        <MaterialCommunityIcons
            name="send-circle"
            style={{marginBottom: 5, marginRight: 5}}
            size={32}
            color="#2e64e5"
          />
      </TouchableOpacity>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
      onPress={() => console.log(1)}
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
          },
          left: {
            backgroundColor: '#fff',
          }
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
          left:{
            color: COLORS.outline
          }
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return(
      <FontAwesome name='angle-double-down' size={22} color='#333' />
    );
  }

  const BackHandler = () => (
    <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', borderRadius: 60, paddingRight: 20}} onPress={() => {
            navigate('Messages')
        }}>
            <AntDesign color={COLORS.outline} name='left' size={18}/>
        </TouchableOpacity>
    </View>
   )

  return (
    <View style={[styles.container]}>
      <Surface mode='elevated' style={{backgroundColor: COLORS.background, width: '100%', paddingHorizontal: 20, flexDirection: 'row',alignItems: 'center', paddingTop: 60, borderRadius: 0, paddingBottom: 20}}>
          <BackHandler/>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{color: COLORS.outline, fontSize: 20, fontFamily: 'DMSansRegular'}} variant='bodyLarge'>{userName}</Text>
          </View>
      </Surface>

      <View style={{width: '100%', flex: 1}} >
        <GiftedChat
          messages={messages}
          onSend={()=> setCurrMessage('')}
          user={{
            _id: profile.userId,
          }}
          messagesContainerStyle={{
            backgroundColor: COLORS.surface,
            width: '100%'
          }}
          onInputTextChanged={(val) => setCurrMessage(val)}
          renderBubble={renderBubble}
          renderSend={renderSend}
          scrollToBottom
          text={currMessage}
          scrollToBottomComponent={scrollToBottomComponent}
        />
      </View>
    </View>
  );
};

export default Chats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',    
  },
});