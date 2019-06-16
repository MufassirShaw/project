import React, { Component } from "react";
import {  StyleSheet, Dimensions, Image, View, StatusBar, TouchableOpacity, } from "react-native";
import { Container, Text } from "native-base";
import  MapView from 'react-native-maps';
import Polyline from  '@mapbox/polyline';


class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      concat: null,
      coords:[],
      x: 'false',
      cordLatitude:-6.23,
      cordLongitude:106.75,
    };
  
  
    this.mergeLot = this.mergeLot.bind(this);
  }
  
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
       (position) => {
         this.setState({
           latitude: position.coords.latitude,
           longitude: position.coords.longitude,
           error: null,
         });
         this.mergeLot();
       },
       (error) => this.setState({ error: error.message }),
       { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
     );

   }
  mergeLot(){
    if (this.state.latitude != null && this.state.longitude!=null)
     {
       let concatLot = this.state.latitude +","+this.state.longitude
       this.setState({
         concat: concatLot
       }, () => {
         this.getDirections(concatLot, "33.98499606 71.45416485");
       });
     }

   }

  
  async getDirections(startLoc, destinationLoc) {
    console.log(startLoc, destinationLoc)
  try {
      let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin= 
      ${ startLoc } &destination=${ destinationLoc }&key=82f1ab269faae94eab14faed497963f270e6eff4`)
      let respJson = await resp.json();
      let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      let coords = points.map((point,index) => {
          return  {
              latitude : point[0],
              longitude : point[1]
          
            }
          
      }
      
      )
      console.log(latitude,longitude);
      this.setState({coords: coords})
      this.setState({x: "true"})
      
      return coords,
      console.log(latitude,longitude)
  } 
  
  catch(error) {
    console.log('masuk fungsi')
      this.setState({x: "error"})
      return error
  }
  
}


  render() {

    return (
     
     <MapView 
       style={{flex:1}}
       initialRegion={{
       latitude:33.738045,
       longitude:73.084488,
       latitudeDelta: 1,
       longitudeDelta: 1
      }}>
      {!!this.state.latitude && !!this.state.longitude && <MapView.Marker
         coordinate={{"latitude":this.state.latitude,"longitude":this.state.longitude}}
         title={"Your Location"}
       />}

       {!!this.state.cordLatitude && !!this.state.cordLongitude && <MapView.Marker
          coordinate={{"latitude":this.state.cordLatitude,"longitude":this.state.cordLongitude}}
          title={"Your Destination"}
        />}

       {!!this.state.latitude && !!this.state.longitude && this.state.x == 'true' && <MapView.Polyline
            coordinates={this.state.coords}
            strokeWidth={2}
            strokeColor="red"/>
        }

        {!!this.state.latitude && !!this.state.longitude && this.state.x == 'error' && <MapView.Polyline
          coordinates={[
              {latitude: this.state.latitude, longitude: this.state.longitude},
              {latitude: this.state.cordLatitude, longitude: this.state.cordLongitude},
          ]}
          strokeWidth={2}
          strokeColor="red"/>
         }
      </MapView>
     
     );
    }
}

export default Map;