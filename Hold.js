import { ModalPortal } from 'react-native-modals';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-native-paper';
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import Mainnavigator from './utils/Mainnavigator';
import LoginProvider from './utils/LoginProvider';
import { CameraView, Camera } from "expo-camera";
import Toast from 'react-native-toast-message';
import MainNavigator from './utils/MainNavigator2';
import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useContext } from 'react';
import { useState } from 'react';
import Tabs from './utils/Tabs';
import LoginStack from './utils/LoginStack';
import Welcome from './screens/Welcome';
import { auth } from './config';
import HomeTest from './screens/HomeTest';
import SigninTest from './screens/SigninTest';
import WelcomeTest from './screens/WelcomeTest';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthenticatedUserContext = createContext({});
const AuthenticatedUserProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [viewedOnBoarding, setViewedOnBoarding] = useState(false);

  return (
    <AuthenticatedUserContext.Provider value={{profile, setProfile, viewedOnBoarding, setViewedOnBoarding}}>
      {children}
    </AuthenticatedUserContext.Provider>
  )
}

function RootNavigator(){
  const [hasPermission, setHasPermission] = useState(null);
  const {profile, setProfile, viewedOnBoarding, setViewedOnBoarding} = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);
  
  const [ fontsLoaded ] = useFonts({
    "DMSansRegular": require("./assets/fonts/DMSans_18pt-Regular.ttf"),
    "DMSansItalic": require("./assets/fonts/DMSans_18pt-Italic.ttf"),
    "DMSansSemiBold": require("./assets/fonts/DMSans_18pt-SemiBold.ttf"),
    "DMSansBold": require("./assets/fonts/DMSans_18pt-Bold.ttf"),
  });

  // Check if the user has previously viewed the onboarding
  const checkOnBoarding = async () => {
    try {
      const value = await AsyncStorage.getItem('@viewedonboarding');

      if (value !== null){
        setViewedOnBoarding(true);
      }

    } catch (error) {
      console.log('Error @checkonboarding: ', error)
    } finally {
      setIsLoading(false);
    }
  }

  async function prepare () {
    await SplashScreen.preventAutoHideAsync();
  }

  if(!fontsLoaded){
    return undefined;
  }else{
    SplashScreen.hideAsync();
  }

  prepare();

  // useEffect(() => {
  //   console.log('Changed');
  //   const getCameraPermissions = async () => {
  //     const { status } = await Camera.requestCameraPermissionsAsync();
  //     setHasPermission(status === "granted");
  //   };

  //   getCameraPermissions();
  //   prepare();
  //   // checkOnBoarding();
  // }, []);

  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async authenticatedUser => {
        authenticatedUser ? setProfile(authenticatedUser) : setProfile(null);
        setIsLoading(false);
      }
    );
// unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, [profile]);

  if(viewedOnBoarding){
    if (isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size='large' />
        </View>
      );
    }
  
    return (
      <NavigationContainer>
        {profile ? <HomeTest /> : <SigninTest />}
      </NavigationContainer>
    );
  } else {
    <WelcomeTest />
  }
}

export default function index() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  )
}

