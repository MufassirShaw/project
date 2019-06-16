import React, { Component } from 'react'
import { Text, View,Container, Content} from 'native-base'
import {StyleSheet ,Image,ImageBackground,} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';

import MainHeader from './header';
import Trip from './icons/planTrip';
import Gallery from './icons/Gallery';
import Camera from './icons/Camera';
import Souvenir from './icons/MySouvenir';
import Qr_code from './icons/QRcode';
import VR from './icons/VR';


export default class Main extends Component {
 
  render() {
   
    return ( 
      <ImageBackground
      source={require('./icons/background.jpg')}  
      style={styles.backgroundImage}>
        <View style={styles.Container}>
         <MainHeader/>
         </View>
          <View style={styles.Container2}>
          <Trip/>
          <Gallery/>
          <Camera/>
          <Souvenir/>
          <Qr_code/>
          <VR/>
         </View>
          
        </ImageBackground>

    
    );
  }
}
const styles = StyleSheet.create({
  
 backgroundImage:{
   flex:1,
   height: hp('100%'), 
   width: wp('100%'),
  },
  Container2:{
    flex:1,
    height: hp('100%'), 
   width: wp('100%'),
   alignItems: 'flex-start',
   
  }

});



