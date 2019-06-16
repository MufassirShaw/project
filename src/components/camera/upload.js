import React, { Component } from 'react';
import { View, Text,StyleSheet,TouchableOpacity,TextInput,Image,PermissionsAndroid,Platform } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import { withNavigation } from "react-navigation";
import Headerforall from '../header/header';

class upload extends Component {
    constructor() {
        super()
        this.state = {
          Image:{
            uri:''
          },  
          data:null,
          Place_name:'',
          longitude:null,//Initial Longitude
          latitude:null,//Initial Latitude
          Description:''
        }
        }
        findCoordinates = () => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null,
              }
             
              );
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
          );
        };
    uploadPhoto() {
      const imgUri = this.props.navigation.getParam("imgUri");
        RNFetchBlob.fetch('POST','http://192.168.236.2/harkalay/admin/app_upload.php', {
          Authorization: "Bearer access-token",
          otherHeader: "foo",
          'Content-Type': 'multipart/form-data',
        },
          
          [
            { name: 'image', filename: 'image.png', type: 'image/png', data :imgUri},
            { name: 'place_name', data: this.state.Place_name },
            //{ name: 'location', data: this.state.Location },
            { name: 'Description', data: this.state.Description },
          ]
          ).then((resp) => {
    
          }).catch((err) => {
            // ...
          })
          
      }

      
     
  render() {
    const imgUri = this.props.navigation.getParam("imgUri");
    

    
    return (
        <View style={Styles.container}>
        <Headerforall headerText ={'Snap it'}/>   
        <Image style={Styles.image} 
         
         source={{ uri: imgUri }}
        />
          
        
          <TouchableOpacity onPress={this.findCoordinates}>
          <Text style={Styles.welcome}>Click for Location?</Text>
          <Text>Location : {this.state.latitude} {this.state.longitude}</Text>
         </TouchableOpacity>  
          
         
          
          <TextInput 
          placeholder="Place Name" 
          onChangeText={data => this.setState({ Place_name: data })} 
          underlineColorAndroid='transparent' 
          style={Styles.TextInputStyle}
           />
           <TextInput 
          placeholder="Photoghrapher name" 
          onChangeText={data => this.setState({ Person_name: data })} 
          underlineColorAndroid='transparent' 
          style={Styles.TextInputStyle}
           />
            <TextInput 
          placeholder="Description" 
          onChangeText={data => this.setState({ Description: data })} 
          underlineColorAndroid='transparent' 
          style={Styles.TextInputStyle}
           />
 
      
        <TouchableOpacity style={Styles.button2} activeOpacity={0.6} onPress={this.uploadPhoto.bind(this)}>
          <Text style={Styles.Text}>
            Upload Photo
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const Styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#baeff2'
    },
    welcome: {
      fontSize: 20,
      textAlign: "center",
      margin: 10
    },
    Text: {
      color: 'white',
      fontSize: 30,
      textAlign: 'center'
    },
    TextInputStyle: {
   
      textAlign: 'center',
      height: 40,
      width: '80%',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#028b53',
      marginTop:5,
    },
    button1: {
      width:'100%',
      height:110,
      backgroundColor: '#25a4e2',
      borderRadius: 4,
      justifyContent: 'center',
      marginTop:50,
    },
      button2: {
      width: 250,
      height: 50,
      backgroundColor: '#25a4e2',
      borderRadius: 4,
      justifyContent: 'center',
      marginTop:40,
    },
  
    image: {
      width:'100%',
      height:'40%',
      marginTop:-70,
    }
  });
  export default withNavigation(upload);