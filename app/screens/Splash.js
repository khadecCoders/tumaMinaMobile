import { View, Text } from 'react-native'
import React, { useRef } from 'react'
import LottieView from "lottie-react-native"

const Splash = () => {
  return (
    <LottieView
    autoPlay
    style={{
      // width:'100%',
      // height: 400,
      // flex: 1
    }}
    source={require('./Main Scene.json')}
    resizeMode='cover'
    loop={true}
    // onAnimationFinish={}
  />
  )
}

export default Splash