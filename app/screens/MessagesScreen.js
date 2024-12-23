import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet,TouchableOpacity,FlatList } from 'react-native';
import { ref, set, onValue, remove, update, push } from 'firebase/database';
import Header from '../Components/Header';
import myTheme from '../utils/theme';
import { useNavigation } from "@react-navigation/native";
import { useLogin } from '../utils/LoginProvider';
import { auth, db, storage } from '../config';
import {
  MaterialIcons,
  AntDesign,
  MaterialCommunityIcons
} from "@expo/vector-icons";

var Messages = [];
const userMessages = [];
const messages2 = [];
const messages3 = [];

const MessagesScreen = () => {
  const [search, setSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { COLORS, screenHeight, screenWidth, STYLES } = myTheme();
  const navigation = useNavigation();
  const [messageId, setMessageId] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const [senderId, setSenderId] = useState('');
  const [senderImage, setSenderImage] = useState('');
  const [messageTime, setMessageTime] = useState('');
  const [messageText, setMessageText] = useState('');
  const [newMessage, setNewMessage] = useState({});
  const [createdAt, setCreatedAt]=useState('');
  const { profile } = useLogin();

  useEffect(() => {
    const chatsRef = ref(db, 'chats/');
    const usersRef = ref(db, 'users/');
    var usersNewData = [];
    Messages=[];
    
    onValue(chatsRef, async(snapshot) => {
        const data = snapshot.val();
        if (data) {

          const newData = Object.keys(data)
            .map(key => ({
                id: key,
                ...data[key]
        }));

    // onValue(usersRef, async(userssnapshot) => {
    //     const usersdata = userssnapshot.val();
    //     if (usersdata) {
    //       usersNewData = Object.keys(usersdata)
    //         .map(userskey => ({
    //             id: userskey,
    //             ...usersdata[userskey]
    //     }))
    //     }

    //   });
   

   //    Filter and reamin with messages from the current user only (To Be Changed)
        var userMessages = newData.filter((item) => item.receiver_id ===profile.userId || item.user._id === profile.userId);
        userMessages = userMessages.sort(({createdAt:a}, {createdAt:b}) => b-a);

        for(const item in userMessages){

          messages3.push(userMessages[item]);

   //    If receiver is current user and sender is not in list (To Be Changed), add message and sender to their respective lists, make username = senderName
        if(userMessages[item].receiver_id === profile.userId &&  messages2.filter((itema) => itema ===userMessages[item].user._id).length === 0){
          messages2.push(userMessages[item].user._id);
          Messages.push({
            id: userMessages[item]._id,
            userId:userMessages[item].user._id,
            userName: userMessages[item].user.name,
            userImg: require('../assets/images/icon.png'),
            messageTime: userMessages[item].createdAt.split('T')[0] + ' '+userMessages[item].createdAt.split('T')[1].split(':')[0]+':'+userMessages[item].createdAt.split('T')[1].split(':')[1]+'         ',
            messageText:userMessages[item].text})
        }

   //  If sender is current user and receiver is not in list (To Be Changed), add message and receiver to their respective lists, make username = receiver and userId = receiverId

        if(userMessages[item].user._id === profile.userId &&  messages2.filter((itema) => itema ===userMessages[item].receiver_id).length === 0){
            messages2.push(userMessages[item].receiver_id);
            const myval=userMessages[item].receiver_id;
            const receiverDetails = usersNewData.filter((item) => item.id ===myval);
            var newUserName='';
            if(receiverDetails.length>0){
              newUserName = receiverDetails[0].username;
            }
            Messages.push({
              id: userMessages[item]._id,
              userId:userMessages[item].receiver_id,
              userName: newUserName,
              userImg: require('../assets/images/icon.png'),
              messageTime: userMessages[item].createdAt.split('T')[0] + ' '+userMessages[item].createdAt.split('T')[1].split(':')[0]+':'+userMessages[item].createdAt.split('T')[1].split(':')[1]+'         ',
              messageText:userMessages[item].text})
          }

        }

        }
        else{
          console.log('no data')
        }
        
      });
     
 /*     const searchQ = (sQuery) => {
        if(sQuery !== ''){
          if(profile.accountType === 'Admin'){
            let temp = contacts.filter((item) => String(item.address).includes(sQuery) || String(item.name).includes(sQuery))
            setContacts(temp);
          }
        } else {
          setContacts(tempContacts);
        }
      }*/

  }, [])


const CustomHeader = () => (
  <View style={{flexDirection: 'row', justifyContent: 'space-around', flex: 1}}>
     <TouchableOpacity style={{borderWidth: 1, borderColor: COLORS.outline, borderRadius: 100, width: 25, height: 25, marginHorizontal: 5, alignItems: 'center', justifyContent: 'center'}} onPress={() => {
      //  navigate('Create')
     }}>
       <MaterialCommunityIcons color={COLORS.outline} name='plus' size={15}/>
     </TouchableOpacity>
     <TouchableOpacity style={{borderWidth: 1, borderColor: COLORS.outline, borderRadius: 100, width: 25, height: 25, marginHorizontal: 5, alignItems: 'center', justifyContent: 'center'}} onPress={() => {
       console.log('create task')
     }}>
       <MaterialIcons color={COLORS.outline} name='search' size={15}/>
     </TouchableOpacity>
  </View>
 )
    return (
      <View style={{flex:1, backgroundColor: COLORS.surface}}>
      <Header 
        style={{width:screenWidth}}
        title='Chats' 
        titleColor={COLORS.outline}
        rightView={<CustomHeader/>}
      />

      </View>
    );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});