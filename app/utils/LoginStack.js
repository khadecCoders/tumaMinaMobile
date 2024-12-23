import SignUp from '../screens/SignUp';
import Signin from "../screens/Signin";
import ForgotPass from "../screens/ForgotPass";
import VerifyAccount from "../screens/VerifyAccount";
import AccountCreated from "../screens/AccountCreated";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './Tabs';

const Stack = createNativeStackNavigator();

const LoginStack = () => {
  
  return (
    <Stack.Navigator
      initialRouteName="Signin"
      backBehavior="history"
      screenOptions={{
        headerMode: "screen",
        headerTintColor: "white",
        headerTitleAlign: "left",
        headerBackTitle: "Back",
        headerBackTitleVisible: false,
        headerShadowVisible: false,
        headerStyle: { backgroundColor: "#16272D",},
        headerTitleStyle: { fontFamily: 'Poppins-Medium'},
      }}
  >
    <Stack.Screen
      name="SignIn"
      component={Signin}
      options={{
        headerBackTitleVisible: false,
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="User"
      component={Tabs}
      options={{
        headerBackTitleVisible: false,
        headerShown: false,
      }}
    />

    <Stack.Screen
      name="SignUp"
      component={SignUp}
      options={{
        headerTitle: "Sign Up",
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />

    <Stack.Screen
      name="ForgotPassword"
      component={ForgotPass}
      options={{
        headerTitle: "Forgot Password",
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />

    <Stack.Screen
      name="VerifyAccount"
      component={VerifyAccount}
      options={{
        headerTitle: "Sign Up",
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />

    <Stack.Screen
      name="AccountCreated"
      component={AccountCreated}
      options={{
        headerTitle: "Sign Up",
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />

    </Stack.Navigator>
  )
}

export default LoginStack
