import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, View} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Provider } from 'react-native-paper';
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import Mainnavigator from './utils/Mainnavigator';
import LoginProvider from './utils/LoginProvider';
import { NotificationProvider } from './context/NotificationContext';
import * as Notifications from 'expo-notifications';
import { StatusBar } from 'expo-status-bar';
import AnimatedLottieView from 'lottie-react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
});


// Prevent splashscreen from autohiding
SplashScreen.preventAutoHideAsync();

const index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [ fontsLoaded ] = useFonts({
    "DMSansRegular": require("./assets/fonts/DMSans_18pt-Regular.ttf"),
    "DMSansItalic": require("./assets/fonts/DMSans_18pt-Italic.ttf"),
    "DMSansSemiBold": require("./assets/fonts/DMSans_18pt-SemiBold.ttf"),
    "DMSansBold": require("./assets/fonts/DMSans_18pt-Bold.ttf"),
  });

  // useEffect(() => {
  //   SplashScreen.hideAsync();
  // },[fontsLoaded]);

  if(!fontsLoaded){
    return null;
  }
  
  return (
    isLoading ? (
      <AnimatedLottieView
        autoPlay
        source={require('./MainScene.json')}
        resizeMode='cover'
        style={{
          backgroundColor: '#fff'
        }}
        loop={false}
        onAnimationFinish={() => setIsLoading(false)}
      />
    ) : (
    <GestureHandlerRootView>
      <Provider>
        <LoginProvider>
            <NotificationProvider>
              <Mainnavigator />
            </NotificationProvider>
        </LoginProvider>
      </Provider>
    </GestureHandlerRootView>
    )

  )
}

export default index

const styles = StyleSheet.create({})