import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet,TouchableOpacity,FlatList } from 'react-native';
import { ref, set, onValue, remove, update, push } from 'firebase/database';
import Header from '../Components/Header';
import myTheme from '../utils/theme';
import { useNavigation } from "@react-navigation/native";
import ProfileImage from '../Components/ProfileImage'
import { useLogin } from '../utils/LoginProvider';
import { auth, db, storage } from '../config';
import {
  MaterialIcons,
  MaterialCommunityIcons
} from "@expo/vector-icons";

import { Badge, Divider, Searchbar } from 'react-native-paper';

var messages3 = [];
var newMessages = [];
var messages2 = [];
var allMsgs = [];

function MessagesList() {
        const { COLORS, screenHeight, screenWidth, STYLES } = myTheme();
        const navigation = useNavigation();
        var [userMessages, setUserMessages] = useState([]);
        var [unreadMessages, setUnreadUserMessages] = useState([]);
        const { profile } = useLogin();
        var newData = [];
        const chatsRef = ref(db, 'chats/');
        const usersRef = ref(db, 'users/');
        var tempMessages=[];
        var usersNewData = [];
        const [search, setSearch] = useState(false);
        const [searchNone, setSearchNone] = useState(false);
        const [tempSearch, setTempSearch] = useState([]);
        const [searchQuery, setSearchQuery] = useState('');

        useEffect(() => {
        onValue(chatsRef, async(snapshot) => {
            const data = snapshot.val();
            setUserMessages([]);
            messages3=[];
            messages2=[];
            newMessages=[];
            allMsgs=[]
            if (data) {
               newData = Object.keys(data)
                .map(key => ({
                    id: key,
                    ...data[key]
                }));

                onValue(usersRef, async(userssnapshot) => {
                  const usersdata = userssnapshot.val();
                  if (usersdata) {
                    usersNewData = Object.keys(usersdata)
                      .map(userskey => ({
                          id: userskey,
                          ...usersdata[userskey]
                  }))
                  }
                });

                const whatever= (newData.filter((item) => item.receiver_id ===profile.userId || item.user._id === profile.userId).reverse());  
                for(const item in whatever){
                  allMsgs.push(whatever[item]);

                // If receiver is current user and sender is not in list (To Be Changed), add message and sender to their respective lists, make username = senderName
                  if(whatever[item].receiver_id === profile.userId &&  messages2.filter((itema) => itema ===whatever[item].user._id).length === 0){
                    messages3.push(whatever[item]);
                    messages2.push(whatever[item].user._id);
                    newMessages.push({
                      expoToken: whatever[item].user.token,
                      senderID: whatever[item].user._id,
                      receiverID: whatever[item].receiver_id,
                      received: whatever[item].received,
                      id: whatever[item].id,
                      userId:whatever[item].user._id,
                      userName: whatever[item].user.name,
                      userImg: require('../assets/images/icon.png'),
                      messageTime: whatever[item].createdAt.split('T')[0] + ' '+whatever[item].createdAt.split('T')[1].split(':')[0]+':'+whatever[item].createdAt.split('T')[1].split(':')[1]+'',
                      messageText:whatever[item].text})
                  }
                // If sender is current user and receiver is not in list (To Be Changed), add message and receiver to their respective lists, make username = receiver and userId = receiverId

                  if(whatever[item].user._id === profile.userId &&  messages2.filter((itema) => itema ===whatever[item].receiver_id).length === 0){
                    messages3.push(whatever[item]);
                    messages2.push(whatever[item].receiver_id);
                    const myval=whatever[item].receiver_id;
                    const receiverDetails = usersNewData.filter((item) => item.id ===myval);
                    var newUserName='';
                    if(receiverDetails.length>0){
                      newUserName = receiverDetails[0].username;
                    }
                    newMessages.push({
                      expoToken: whatever[item].user.token,
                      senderID: whatever[item].user._id,
                      receiverID: whatever[item].receiver_id,
                      received: whatever[item].received,
                      id: whatever[item].id,
                      userId:whatever[item].receiver_id,
                      userName: newUserName,
                      userImg: require('../assets/images/icon.png'),
                      messageTime: whatever[item].createdAt.split('T')[0] + ' '+whatever[item].createdAt.split('T')[1].split(':')[0]+':'+whatever[item].createdAt.split('T')[1].split(':')[1]+'',
                      messageText:whatever[item].text})
                  }

                  setUserMessages(newMessages);
                  const unread = allMsgs.filter((item) => item.received === false && item.receiver_id === profile.userId);
                  setUnreadUserMessages(unread);
                  // console.log(unread)
                }    
                //console.log(userMessages);           
            }
        });

      }, [])

      const searchQ = (sQuery) => {
        if(sQuery !== ''){
            let temp = ChatContacts.filter((item) => String(item.username).includes(sQuery) || String(item.useremail).includes(sQuery))
            setChatContacts(temp);
            if(temp.length === 0){
                setSearchNone(true);
            } else{
                setSearchNone(false);
            }
            } else {
            setSearchNone(false);
            setChatContacts(tempChatContacts);
            }
      }

      const CustomHeader = () => (
        <View style={{flexDirection: 'row', justifyContent: 'space-around', flex: 1}}>
           <TouchableOpacity style={{borderWidth: 1, borderColor: COLORS.outline, borderRadius: 100, width: 25, height: 25, marginHorizontal: 5, alignItems: 'center', justifyContent: 'center'}} onPress={() => {
             //console.log('create task')
             navigation.navigate('ChatContacts');
           }}>
             <MaterialCommunityIcons color={COLORS.outline} name='plus' size={15}/>
           </TouchableOpacity>
           {/* <TouchableOpacity style={{borderWidth: 1, borderColor: COLORS.outline, borderRadius: 100, width: 25, height: 25, marginHorizontal: 5, alignItems: 'center', justifyContent: 'center'}} onPress={() => {
             //console.log('create task')
             setSearch(!search);
           }}>
             <MaterialIcons color={COLORS.outline} name='search' size={15}/>
           </TouchableOpacity> */}
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
      <View style={[styles.container, {backgroundColor: COLORS.surface}]}>
      {search ? (
        <View style={{width: screenWidth}}>
            <Searchbar
                mode='bar'
                placeholder="Search by name, email"
                onChangeText={(searchQuery) => {
                    setSearchQuery(searchQuery)
                    searchQ(searchQuery);
                }}
                value={searchQuery}
                right={() => (<MaterialCommunityIcons name='close' size={20} style={{paddingRight: 10}} color={COLORS.outline} onPress={() => {
                    setSearchQuery('');
                    setSearch(false)
                    setChatContacts(tempChatContacts);
                }}/>)}
                onClearIconPress={() => {
                    searchQ(searchQuery);
                    setSearch(false);
                }}
                style={{borderRadius: 0}}
                inputStyle={{color: COLORS.outline}}
                />
        </View>
    ):(
        <></>
    )}

    {searchNone && (
        <>
        <Text style={[STYLES.textNormal, {fontSize: 18, paddingVertical: 10, paddingHorizontal: 10}]}>No search results found :(</Text>
        </>
    )}
        <FlatList
          contentContainerStyle={{backgroundColor: COLORS.surface}}
          data={userMessages}
          keyExtractor={item=>item.id}
          renderItem={({item}) => (
            <View style={{width: '100%'}}>
              <TouchableOpacity onPress={() => {
                if(item.senderID !== profile.userId){
                  // Update the message to received
                    unreadMessages.map((itemc) => {
                      // Update only for the clicked user
                      if(itemc.user._id === item.userId){
                          update(ref(db, 'chats/' + itemc.id), {
                            received: true
                          })
                      }else{
                        // 
                      }
                    })
                }else{
                  // Do nothing
                }
                navigation.navigate('Chats',{ userName:item.userName,userIds:item.userId,allChats:messages3,userTkn:item.expoToken});
              }} style={{flexDirection: 'row', alignItems: 'center'}}>
                <ProfileImage name={item.userName} size='Small'/>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '80%', alignItems:'flex-start'}}>
                  <View style={{
                      flexDirection: 'column',
                      justifyContent: 'center',
                      paddingVertical: 10
                    }}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                      <View style={{justifyContent: 'space-between'}}>
                        <Text style={[STYLES.textHeading, {fontSize: 15}]}>{item.userName}</Text>
                        {item.senderID === profile.userId ? 
                        <Text style={[STYLES.textNormal, {fontSize: 15}]}>{item.received ? <MaterialCommunityIcons color={COLORS.button} name='check-all' size={15}/>:<MaterialCommunityIcons color={COLORS.outline} name='check' size={15}/>}{item.messageText}</Text>
                          :
                        <Text style={[STYLES.textNormal, {fontSize: 15}]}>{item.messageText}</Text>
                      }
                      </View>
                  
                    </View>
                  </View>
                  <View style={{
                      flexDirection: 'column',
                      justifyContent: 'center',
                      paddingVertical: 20
                    }}>
                    <Text style={[STYLES.textNormal, {fontSize: 12, paddingBottom: 10}]}>{item.messageTime}</Text>
                    {item.senderID !== profile.userId && !item.received ? 
                      <Badge size={18} style={{margin: 0, backgroundColor: '#2ac780'}}>{unreadMessages.filter((itemb) => itemb.user._id === item.userId).length}</Badge>
                      : 
                      <></>
                    }
                  </View>
                </View>
              </TouchableOpacity>
              <Divider />
            </View>
          )}
        />
      </View>
      </View>
    );
}

export default MessagesList;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10
  },
});