import React, { Component } from 'react'
import { Text, View ,Image,StyleSheet, TouchableOpacity ,Animated } from 'react-native';
import { withNavigation } from 'react-navigation';

class Qr_code extends Component {
  constructor () {
    super()
    this.springValue = new Animated.Value(0.4)
  }
  spring () {
    this.springValue.setValue(0.4)
    Animated.spring(
      this.springValue,
      {
        toValue: 1,
        friction: 2,
      }
    ).start()
  }
  render() {
    return (
        
        <TouchableOpacity style={{borderWidth:4,borderColor:"red"}} onPress={() => this.props.navigation.navigate('QR')} >
        <Animated.Image   onLayout={this.spring.bind(this)} 
         style={{  height:120,
          width:120,
          marginTop: -120,
          marginLeft: 185,   
          transform: [{scale: this.springValue}] }}
          source={require('../../assests/icons/Qr_code.png')}
          />
        </TouchableOpacity>

        
       
    )
  }
}
export default withNavigation(Qr_code);
