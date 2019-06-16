import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { withNavigation } from "react-navigation";
import RNblob from "react-native-fetch-blob";

class Cam extends Component {
    constructor(props) {
        super(props);
        this.state = {
          img :null,
      }
    }
    takePicture = async function() {
      const {navigation} = this.props;
      if (this.camera) {
          const options = { quality: 0.5, base64: true };
           this.camera.takePictureAsync(options)
           .then((data)=>{
              this.setState({img:data.uri});
               navigation.navigate("upload",{
                imgUri:this.state.img
              })
           })
           .catch(er=>console.log(er))      
      }
    };
  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          defaultOnFocusComponent={true}
          captureAudio={false}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
         
        >
          {({camera}) => {

            return (
                <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity onPress={this.takePicture.bind(this)} 
                      style={styles.capture}>
                  <Text style={{ fontSize: 14 }}> SNAP </Text>
                </TouchableOpacity>
              </View>
            );
          }
          
          }
        </RNCamera>
          </View>
    );
  }
  
}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'black',
    },
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    capture: {
      flex: 0,
      backgroundColor: '#fff',
      borderRadius: 5,
      padding: 15,
      paddingHorizontal: 20,
      alignSelf: 'center',
      margin: 20,
    },
  });

  export default withNavigation(Cam);
