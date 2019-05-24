import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, Image } from 'react-native';
import { Container, Header, Content, Button, Text, Left, Alert } from 'native-base';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';


export default class FindMeScreen extends Component {

    state = {
        region: {
            isLoading: true,
            latitude: null,
            longitude: null
        }
    }

    getCurrentPosition = () => {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            this.setState({
                latitude,
                longitude
            });
        },
            error => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }

    static navigationOptions = {
        headerTitle: <Image source={require('../assets/images/logo.png')} style={{ width: 100, height: 20 }} />,
        headerStyle: {
            backgroundColor: 'rgba(64,64,64,1)',
        },
        headerTintColor: '#fff',
    };
    componentDidMount(){
        this.getCurrentPosition();
    }


    render() {
            return (
                <View style={styles.container}>
                    <View style={styles.container}>
                        <MapView
                            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                            style={styles.map}
                            region={{
                                latitude: this.state.longitude,
                                longitude: this.state.latitude,
                                latitudeDelta: 0.015,
                                longitudeDelta: 0.0121,
                            }}
                        >
                        <MapView.Marker coords = {this.state.region}/>
                        </MapView>
                    </View>
                    <Text>{this.state.longitude}</Text>
                    <Text>{this.state.latitude}</Text>
                </View>
            )
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



