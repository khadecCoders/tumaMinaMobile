import { Linking, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign, Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Header from '../Components/Header';
import myTheme from '../utils/theme';
import { useLogin } from '../utils/LoginProvider';
import { ActivityIndicator, Button, Dialog, Divider, Portal } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Switch, Text} from 'react-native-paper';
import { signOut } from 'firebase/auth';
import {
  auth,
  db
} from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { onValue, ref, remove, update } from 'firebase/database';
import { ScrollView } from 'react-native';
import * as Updates from 'expo-updates';

const More = ({navigation}) => {
  const { COLORS, screenHeight, screenWidth, STYLES } = myTheme();
  const { isLoggedIn, setIsLoggedIn, profile, setProfile, themeDark, setThemeDark } = useLogin();
  const [optionsCnt, setOptionsCnt] = useState(1);
  const { navigate } = useNavigation();
  const [adminUrl, setAdminUrl] = useState('');
  const [isSwitchOn, setIsSwitchOn] = useState(themeDark);
  const [isLoading, setIsLoading] = useState(false);
  const [updatesVisible, setUpdatesVisible] = useState(false);
  const [updateMessage, setUpdateMessage] = ("No update found NOW");
  const [isChecking, setIsChecking] = useState(false);

  // Checking for updates
  async function onFetchUpdateAsync() {
    setIsChecking(true)
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        setIsChecking(false)
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }else{
        setIsChecking(false)
      }
    } catch (error) {
      setIsChecking(false)
      // You can also add an alert() to see the error message in case of an error when fetching updates.
      alert(`Error fetching latest update ${error}`);
    }
  }

  useEffect(() => {
      const getUrl = async () => {
          const urlRel = ref(db, 'Dashboard/');
          onValue(urlRel, (snapshot) => {
              const data = snapshot.val();
              if (data) {
                  setAdminUrl(data.url);
              }
          });
      };
      getUrl();
  }, []);

  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn)
    AsyncStorage.setItem('themeDark', JSON.stringify(!themeDark))
    setThemeDark(!themeDark)
  };

  const CustomHeader = () => (
    <View style={{flexDirection: 'row', justifyContent: 'space-around', flex: 1}}>
       <TouchableOpacity style={{borderWidth: 1, borderColor: COLORS.outline, borderRadius: 100, width: 25, height: 25, marginHorizontal: 5, alignItems: 'center', justifyContent: 'center'}} onPress={() => {
          // Clear input states
          setImage('');
          setuserPassword('');
          setUserAddress('');
          setBikeNo('');
          setuserPasswordConfirm('');
          setuserNumber('');
          setuserEmail('');
          setuserName('');

          setAddBiker(!addBiker)
       }}>
         <MaterialCommunityIcons color={COLORS.outline} name='plus' size={15}/>
       </TouchableOpacity>
       <TouchableOpacity style={{borderWidth: 1, borderColor: COLORS.outline, borderRadius: 100, width: 25, height: 25, marginHorizontal: 5, alignItems: 'center', justifyContent: 'center'}}>
         <MaterialCommunityIcons color={COLORS.outline} name='reload' size={15}/>
       </TouchableOpacity>
       <TouchableOpacity style={{borderWidth: 1, borderColor: COLORS.outline, borderRadius: 100, width: 25, height: 25, marginHorizontal: 5, alignItems: 'center', justifyContent: 'center'}} onPress={() => {
         setSearch(!search)
       }}>
         <MaterialIcons color={COLORS.outline} name='search' size={15}/>
       </TouchableOpacity>
    </View>
)

const handleSignOutFunction = () => {
  signOut(auth)
  .then(() => {
    if(profile.accountType === "Admin"){
      console.log("removing Admin")
      remove(ref(db,"adminUserTokens/" + profile.userId))
      .then(() => {
        AsyncStorage
        .removeItem('@tumamMinaCredentials')
        .then(() => {
          update(ref(db, 'users/' + profile.userId), {
            expoToken: ""
          }).then(() => {
            setIsLoggedIn(false);
            setProfile({})
        }).catch((error) => console.log(error.message))
        }).catch((error) => console.log(error.message))
      })
      .catch(error => console.log(error.message))
    } else {
      AsyncStorage
      .removeItem('@tumamMinaCredentials')
      .then(() => {
        update(ref(db, 'users/' + profile.userId), {
          expoToken: ""
        }).then(() => {
          setIsLoggedIn(false);
          setProfile({})
      }).catch((error) => console.log(error.message))
      }).catch((error) => console.log(error.message))
    }
      })
      .catch(error => console.log(error.message))
    }

  return (
    <View style={[styles.container, {backgroundColor: COLORS.surface}]}>
        <Header
            title='More'
            titleColor={COLORS.outline}
        />

      {/* Portal */}
      <Portal>
        <Dialog visible={updatesVisible} onDismiss={() => setUpdatesVisible(!updatesVisible)}>
          <Dialog.Title style={{color: COLORS.outline, fontFamily: 'DMSansRegular'}}>Checking for updates</Dialog.Title>
          <Dialog.Content>
            {isChecking ? (
              <>
                <Text style={{color: COLORS.outline, fontFamily: 'DMSansRegular'}} variant="bodyMedium">Please wait while we check for updates</Text>
                <ActivityIndicator animating={true} color={COLORS.button} />
              </>
            ):(
              <>
                <Text style={{color: COLORS.outline, fontFamily: 'DMSansRegular'}} variant="bodyMedium">No update found, you're running the latest update!</Text>
              </>
            )}
          </Dialog.Content>
          <Dialog.Actions>
          {isLoading ? (
                <ActivityIndicator animating={true} color={COLORS.button} />
            ):(
                <>
                    <Button onPress={() => setUpdatesVisible(!updatesVisible)}>Close</Button>
                </>
            )}
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <ScrollView>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingHorizontal: 20, paddingVertical: 20}} onPress={() => {
          navigate('Account')
        }}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
            <MaterialCommunityIcons name='account' size={25} color={COLORS.outline}/>
            <Text style={[STYLES.textNormal, {paddingHorizontal: 10}]}>My Account</Text>
          </View>
          <AntDesign name='rightcircleo' size={25} color={COLORS.outline}/>
        </TouchableOpacity>
        <Divider style={{width: '100%'}} />
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingHorizontal: 20, paddingVertical: 20}} onPress={() => {
          navigate('Addresses')
        }}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
            <MaterialIcons name='location-on' size={25} color={COLORS.outline}/>
            <Text style={[STYLES.textNormal, {paddingHorizontal: 10}]}>My Addresses</Text>
          </View>
          <AntDesign name='rightcircleo' size={25} color={COLORS.outline}/>
        </TouchableOpacity>
        <Divider style={{width: '100%'}} />
        {profile.accountType === "Admin" ? (
          <>
            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingHorizontal: 20, paddingVertical: 20}} onPress={() => {
              navigate('Accounts')
            }}>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                <MaterialCommunityIcons name='account-multiple' size={25} color={COLORS.outline}/>
                <Text style={[STYLES.textNormal, {paddingHorizontal: 10}]}>User Accounts</Text>
              </View>
              <AntDesign name='rightcircleo' size={25} color={COLORS.outline}/>
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingHorizontal: 20, paddingVertical: 20}} onPress={() => {
              if(adminUrl){
                Linking.openURL(adminUrl);
              }
            }}>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                <MaterialCommunityIcons name='account-multiple' size={25} color={COLORS.outline}/>
                <Text style={[STYLES.textNormal, {paddingHorizontal: 10}]}>Admin Dashboard</Text>
              </View>
              <AntDesign name='rightcircleo' size={25} color={COLORS.outline}/>
            </TouchableOpacity>
          </>
        ) : (
          <></>
        )}
        
        <View style={{backgroundColor: COLORS.onSurfaceVariant, width: '100%', paddingHorizontal: 20, paddingVertical: 10, marginBottom: 10}}>
            <Text style={{color: COLORS.background}}>Info</Text>
        </View>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingHorizontal: 20, paddingVertical: 20}} onPress={() => {
          navigate('Help')
        }}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
            <MaterialCommunityIcons name='help-circle-outline' size={25} color={COLORS.outline}/>
            <Text style={[STYLES.textNormal, {paddingHorizontal: 10}]}>Help</Text>
          </View>
          <AntDesign name='rightcircleo' size={25} color={COLORS.outline}/>
        </TouchableOpacity>
        <Divider style={{width: '100%'}} />

        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingHorizontal: 20, paddingVertical: 20}} onPress={() => {
          navigate('About')
        }}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
            <MaterialCommunityIcons name='information' size={25} color={COLORS.outline}/>
            <Text style={[STYLES.textNormal, {paddingHorizontal: 10}]}>About Tuma Mina</Text>
          </View>
          <AntDesign name='rightcircleo' size={25} color={COLORS.outline}/>
        </TouchableOpacity>
        <Divider style={{width: '100%'}} />
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingHorizontal: 20, paddingVertical: 20}} onPress={() => {
          navigate('T&C')
        }}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
            <MaterialCommunityIcons name='file-document-edit' size={25} color={COLORS.outline}/>
            <Text style={[STYLES.textNormal, {paddingHorizontal: 10}]}>Terms And Conditions</Text>
          </View>
          <AntDesign name='rightcircleo' size={25} color={COLORS.outline}/>
        </TouchableOpacity>

        <View style={{backgroundColor: COLORS.onSurfaceVariant, width: '100%', paddingHorizontal: 20, paddingVertical: 10, marginBottom: 10}}>
            <Text style={{color: COLORS.background}}>Settings</Text>
        </View>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingHorizontal: 20, paddingVertical: 20}} onPress={() => {
            setIsSwitchOn(!isSwitchOn)
            AsyncStorage.setItem('themeDark', JSON.stringify(!themeDark))
            setThemeDark(!themeDark)
        }}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
            <Feather name={isSwitchOn ? 'moon' : 'sun'} size={25} color={COLORS.outline}/>
            <Text style={[STYLES.textNormal, {paddingHorizontal: 10}]}>Dark Theme</Text>
          </View>
          <Switch value={isSwitchOn} onValueChange={onToggleSwitch} theme='dark' />
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingHorizontal: 20, paddingVertical: 20}} onPress={() => {
          // Check for updates
          setUpdatesVisible(!updatesVisible);
          onFetchUpdateAsync();
        }}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
            <MaterialIcons name='tips-and-updates' size={25} color={COLORS.outline}/>
            <Text style={[STYLES.textNormal, {paddingHorizontal: 10}]}>Check for updates</Text>
          </View>
          <MaterialIcons name='update' size={25} color={COLORS.outline}/>
        </TouchableOpacity>
        <Divider style={{width: '100%'}} />

        <View style={{backgroundColor: COLORS.onSurfaceVariant, width: '100%', paddingHorizontal: 20, paddingVertical: 10, marginBottom: 10}}>
            <Text style={{color: COLORS.background}}>Log Out</Text>
        </View>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingHorizontal: 20, paddingVertical: 20}} onPress={async () => {
            handleSignOutFunction();
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
            <AntDesign name='logout' size={25} color={COLORS.outline}/>
            <Text style={[STYLES.textNormal, {paddingHorizontal: 10}]}>Log Out</Text>
          </View>
        </TouchableOpacity>
        <Divider style={{width: '100%'}} />
        </ScrollView>
    </View>
  )
}

export default More

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: 15,
        flexGrow: 1,
    },
})