import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,  } from 'react-native';
import {Grid,Row} from 'react-native-easy-grid';
import {Container} from 'native-base';
import {createStackNavigator,createAppContainer} from 'react-navigation';
//import Gallery from './src/components/Gallery/galley';
  // import QR from './src/components/Qrcode/QRCode'
  //import VR from './src/components/VR/VR'
  //import Cam from './src/components/camera/Camera1'
  //import Mysouvenir from './src/components/mysouvenir/souvenir';
  // import Weather from './src/components/weather/weather'
   //import CardImage from './src/components/planTrip/plantrip';
    import Main from './src/main/index';
   //import upload from './src/components/camera/upload'
   // import Map from './src/components/map'
 
     //import Login from './src/components/login/login'; 
     //import Question from './src/components/tripdescrp/question';


const Navigation = createStackNavigator({
      // Weather:{screen:Weather}
          //Map :{ screen :Map}
        //Login: { screen: Login },
         Main: { screen: Main },
        //Cam: { screen: Cam},
       //QR: { screen: QR},
      // Gallery: { screen: Gallery},
      //  CardImage: { screen: CardImage},
       //upload: { screen: upload},
       //location:{screen:location}
       //Question:{screen: Question},
       //Mysouvenir : {screen:Mysouvenir},
      //VR : { screen:VR},
      
   
},
{
  defaultNavigationOptions:{
    header:null,
}
})
 export default createAppContainer(Navigation);
 
