import React, { Component } from 'react';
import { Container,Header, Left, Body, Right, Button, Icon, } from 'native-base';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';
import {StyleSheet,Image,StatusBar} from "react-native";
export default class MainHeader extends Component {
  render() {
    return (
      
        <Header style={styles.header}>
        <StatusBar style={styles.StatusBar}>
        </StatusBar>
          <Left>
            <Button transparent>
            <Icon type="FontAwesome5" name="cloud-sun-rain" />
              
            </Button>
          </Left>
          <Body style={{ width:"20"}}style={styles.headerText}>
            <Image  style={styles.logo}
             source={require('../assests/img/logo1.png')}  
             >

            </Image >
          </Body>
          <Right>
            <Button transparent>
            <Icon name="menu" />
            </Button>
          </Right>
        </Header>
        
    );
  }
}

const styles = StyleSheet.create({
   StatusBar:{
      color:'#25a4e2', 
   },
  header:{
      backgroundColor: "#25a4e2",
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo:{
      resizeMode: 'cover',
       width: '100%',
        height: '100%',
      //justifyContent:'center',
      alignSelf: 'center',
      marginLeft: 85,
      alignContent: 'center',
    },
    headerText:
    {
     height: hp('5%'), 
      width: wp('15%'),
      justifyContent:'center',
    }
});
