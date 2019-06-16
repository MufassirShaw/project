import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Image,TextInput,Alert } from 'react-native'
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';


export default class Camera extends Component {


  constructor() {
    super()
    this.state = {
      imageSource: null,  
      data:null,
      Place_name:'',
      Location:'',
      Description:''
    }
    

  }

  selectPhoto() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
      skipBackup: true
      }
    };
    ImagePicker.launchCamera(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };
        this.setState({
          imageSource: source,
          data:response.data
        });
      }
    });
  }
  findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position);

        this.setState({ location });
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  uploadPhoto() {
    RNFetchBlob.fetch('POST','http://192.168.43.110/harkalay/admin/image_upload.php', {
      Authorization: "Bearer access-token",
      otherHeader: "foo",
      'Content-Type': 'multipart/form-data',
    },
      [
        { name: 'image', filename: 'image.png', type: 'image/png', data :this.state.data},
        { name: 'placename', data: this.state.Place_name },
        { name: 'location', data: this.state.Location },
        { name: 'description', data: this.state.Description },
      ]
      ).then((resp) => {

      }).catch((err) => {
        // ...
      })
  }
  render() {

    return (
      <View style={Styles.container}>
        <Image style={Styles.image}
          source={this.state.imageSource != null ? this.state.imageSource :
            require('./image/1.jpeg')}
        />
        <TouchableOpacity style={Styles.button} onPress={this.selectPhoto.bind(this)}>
          <Text style={Styles.Text}>
            Snap it
          </Text>
          </TouchableOpacity>
          <TextInput 
          placeholder="Place Name" 
          onChangeText={data => this.setState({ Place_name: data })} 
          underlineColorAndroid='transparent' 
          style={Styles.TextInputStyle}
           />
          
          <TouchableOpacity onPress={this.findCoordinates}>
          <Text style={Styles.welcome}>Click for Location?</Text>
          <Text>Location : {this.state.location}</Text>
          </TouchableOpacity>  

            <TextInput 
          placeholder="Description" 
          onChangeText={data => this.setState({ Description: data })} 
          underlineColorAndroid='transparent' 
          style={Styles.TextInputStyle}
           />
 
       
        <TouchableOpacity style={Styles.button} activeOpacity={0.6} onPress={this.uploadPhoto.bind(this)}>
          <Text style={Styles.Text}>
            Upload Photo
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#baeff2'
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
    marginTop: 20
  },
  button: {
    width: 250,
    height: 50,
    backgroundColor: '#25a4e2',
    borderRadius: 4,
    justifyContent: 'center',
    marginTop: 15,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 30,
  }
});
