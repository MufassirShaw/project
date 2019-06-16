import React, { Component } from 'react'
import { Text, View ,Image,StyleSheet,TouchableOpacity ,Animated  } from 'react-native'

import { withNavigation } from 'react-navigation';

class Trip extends Component {
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
        <TouchableOpacity onPress={() => this.props.navigation.navigate('CardImage') } >
        <Animated.Image   onLayout={this.spring.bind(this)} 
         style={{  height:120,
          width:120,
          marginTop:80,
          marginLeft:80,  
          transform: [{scale: this.springValue}] }}
          source={require('../../assests/icons/plan_trip.png')}
          />
      </TouchableOpacity>

      </View>
    )
  }
}
export default withNavigation(Trip);
const styles = StyleSheet.create({
    icon:{
     height:120,
     width:120,
     marginTop:80,
     marginLeft:80,  
    }
})