import React, { Component } from 'react'
import { Text, View ,Image,StyleSheet,TouchableOpacity,Animated } from 'react-native'

import { withNavigation } from 'react-navigation';

class Camera extends Component {
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
        <View>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Cam')}>
        <Animated.Image   onLayout={this.spring.bind(this)} 
         style={{ height:120,width:120,  marginTop:-30,marginLeft:135,
          transform: [{scale: this.springValue}] }}
         source={require('../../assests/icons/snap_it.png')}
          />
      </TouchableOpacity>
      </View>
    )
  }
}
export default withNavigation(Camera);
const styles = StyleSheet.create({
    icon:{
     height:80,
     width:80,
     marginTop:-30,
     marginLeft:135,  
    }
})