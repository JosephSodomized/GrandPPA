import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, Image } from 'react-native';
import { Container, Header, Content, Button, Text, Left, Alert } from 'native-base';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';


export default class FindMeScreen extends Component {
  static navigationOptions = {
    headerTitle: <Image source={require('../assets/images/logo.png')} style={{ width: 100, height: 20 }} />,
    headerStyle: {
        backgroundColor: 'rgba(64,64,64,1)',
    },
    headerTintColor: '#fff',
};


    state = {
        region: {
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
        },
        marker: {
          latitude: 0,
          longitude: 0,
       
      },
        watchID: null
    }

    componentWillMount(){
      this.getCurrentPosition();
  }

  componentWillUnmount(){
    this.checkPosition();
  }

    getCurrentPosition = () => {
        navigator.geolocation.getCurrentPosition(position => {
            var lat = parseFloat(position.coords.latitude);
            var long = parseFloat(position.coords.longitude);
            this.setState({
                latitude: lat,
                longitude: long,
                latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
            });
        },
            error => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 2000, maximumAge: 100 }
        );

        this.state.watchID = navigator.geolocation.watchPosition((position) =>{
          var lat = parseFloat(position.coords.latitude);
          var long = parseFloat(position.coords.longitude);

          var lastRegion = {
            latitude: lat,
            longitude: long,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }

          this.setState({region: lastRegion})
          this.setState({marker: lastRegion})
        })
    }

    checkPosition = () =>{
      if(this.state.region.latitude !== null || this.state.region.longitude !== null){
        this.setState(this.state.loaded = true)
      }
    }

    componentWillUnmount(){
      navigator.geolocation.clearWatch(this.watchID)
    }
    
    loading(){
      return(<View><Text>Loading...</Text></View>)
  }
    

    render() {
      if(this.state.loaded !== null){
            return (
                <View style={styles.container}>
                    <View style={styles.container}>
                        <MapView
                            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                            style={styles.map}
                            region={this.state.region}>
                        <MapView.Marker coordinate={this.state.marker}/>
                        </MapView>
                    </View>
                    <Text>{this.state.region.latitude}</Text>
                    <Text>{this.state.region.longitude}</Text>
                </View>
            )
        }
        return this.loading()
    }
}


const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});



