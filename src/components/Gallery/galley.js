import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Container, TouchableWithoutFeedback, Dimensions, Modal} from 'react-native';
import ImageElement  from './SingleImage';
import Headerforall from "../header/header";
import { Content } from 'native-base';

export default class App extends Component {

  state = {
    modalVisable: false,
    modalImage: require('./image/4.jpg'),
    images: [
        require('./image/4.jpg'),
        require('./image/5.jpg'),
        require('./image/6.jpg'),
        require('./image/7.jpg'),

     
    ]
  }

  setModalVisible(visible , imagekey) {
    this.setState({ modalImage: this.state.images[imagekey] });
    this.setState({ modalVisable: visible });
  }

  getImage() {
    return this.state.modalImage;
  }

  render() {
    
    let images = this.state.images.map((val , key) => {
      return <TouchableWithoutFeedback key = {key} 
        onPress= {() => { this.setModalVisible(true, key)}}>
        <View style = {styles.imagewrap}>
          <ImageElement imgsource= {val}></ImageElement>
        </View>
        </TouchableWithoutFeedback>

    });

    return (
      <Container>
          <Headerforall headerText={"Plan My Trip"} />
      </Container>
            
       <Content>
      <View style = {styles.gallery}>
          
        <Modal style = {styles.Modal} animationType= {'fade'}
               transparent={true} visible={this.state.modalVisable}
               onRequestClose={() => {}}>
               <View style = {styles.modal}>
                 <Text style= {styles.text}
                       onPress = {() => {this.setModalVisible(false)}}>Close</Text>
                 <ImageElement imgsource = {this.state.modalImage}>
                    
                     </ImageElement>      
                     <Text style={{color:"red"}}>HEllo</Text>
               </View>

        </Modal>
        {images}
      </View>
      </Content>
    );
      
  }
}

const styles = StyleSheet.create({
 gallery: {
   flex: 1,
   flexDirection: 'row',
   flexWrap: 'wrap',
   backgroundColor: '#eee'
 },
 imagewrap: {
   margin: 2,
   padding: 2,
   height: (Dimensions.get('window').height/3) - 12,
   width: (Dimensions.get('window').width/2) - 4,
   backgroundColor: '#fff'
 },
 modal: {
   flex: 1,
   padding: 40,
   backgroundColor: 'rgba(0,0,0,0.9)'
 },
 text: {
   color: '#fff'
 }
});

