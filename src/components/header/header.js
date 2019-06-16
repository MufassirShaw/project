import React, { Component } from 'react';
import { Container,Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import {StyleSheet} from "react-native";
//import Icon from 'react-native-vector-icons';

const Headerforall = (props) => {
    return (
        <Header style={styles.header}>
          <Left>
            <Button transparent>
            <Icon type="FontAwesome" name="home" />
              
            </Button>
          </Left>
          <Body style={styles.headerText}>
            <Title>{props.headerText}</Title>
          </Body>
          <Right>
            <Button transparent>
            <Icon name="menu" />
            </Button>
          </Right>
        </Header>
    );
};

const styles = StyleSheet.create({
    header:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#25a4e2',
    },
    headerText:{
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 70
    }
})

export default Headerforall;
