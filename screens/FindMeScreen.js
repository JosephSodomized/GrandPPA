import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Image,
  TouchableOpacity
} from "react-native";
import {
  Container,
  Header,
  Content,
  Button,
  Text,
  Left,
  Alert
} from "native-base";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSms } from "@fortawesome/free-solid-svg-icons";
import { SMS } from "expo";
import * as firebase from "firebase/app";

export default class FindMeScreen extends Component {
  static navigationOptions = {
    headerTitle: (
      <Image
        source={require("../assets/images/logo.png")}
        style={{ width: 100, height: 20 }}
      />
    ),
    headerStyle: {
      backgroundColor: "rgba(64,64,64,1)"
    },
    headerTintColor: "#fff"
  };

  constructor(props) {
    super(props);
    this.state = {
      name: null,
      number: null,
      email: props.navigation.state.params.email,
      numbers: null,
      contacts: [],
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121
      },
      marker: {
        latitude: 0,
        longitude: 0
      },
      watchID: null
    };
  }

  componentWillMount() {
    this.getCurrentPosition();
  }

  componentWillUnmount() {
    this.checkPosition();
  }

  getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        var lat = parseFloat(position.coords.latitude);
        var long = parseFloat(position.coords.longitude);
        this.setState({
          latitude: lat,
          longitude: long,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121
        });
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 100 }
    );

    this.state.watchID = navigator.geolocation.watchPosition(position => {
      var lat = parseFloat(position.coords.latitude);
      var long = parseFloat(position.coords.longitude);

      var lastRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121
      };

      this.setState({ region: lastRegion });
      this.setState({ marker: lastRegion });
    });
  };

  checkPosition = () => {
    if (
      this.state.region.latitude !== null ||
      this.state.region.longitude !== null
    ) {
      this.setState((this.state.loaded = true));
    }
  };

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  loading() {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  componentDidMount() {
    this.getContactFromFirestore(this.state.email);
  }

  sendSms = async () => {
    const contactsList = this.state.numbers.map(item => {
      return item.number;
    });

    const status = await SMS.sendSMSAsync(
      contactsList,
      "Zgubiłem się, moje położenie to:" +
        `\n` +
        "https://maps.google.com/?q=" +
        `${JSON.stringify(this.state.region.latitude)}` +
        "," +
        `${JSON.stringify(this.state.region.longitude)}`
    );
  };

  getContactFromFirestore = email => {
    db = firebase.firestore();
    let docRef = db.collection("usercontacts").doc(email);
    docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          let data = doc.data();
          this.setState({
            numbers: data.numbers
          });
        } else {
          console.log("No such document!");
        }
      })
      .catch(function(err) {
        console.log("Error getting document:", err);
      });
  };

  render() {
    if (this.state.loaded !== null) {
      return (
        <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            region={this.state.region}
          >
            <MapView.Marker coordinate={this.state.marker} />
          </MapView>
          <View style={styles.buttonContainer}>
            <Button onPress={this.sendSms} dark rounded>
              <Text>Send location</Text>
              <FontAwesomeIcon
                style={styles.faSms}
                icon={faSms}
                size={40}
                color="#fff"
              />
            </Button>
          </View>
        </View>
      );
    }
    return this.loading();
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: "auto",
    width: "auto",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  buttonContainer: {
    marginBottom: 100,
    paddingTop: 10,
    paddingBottom: 10
  },
  faSms: {
    marginRight: 10
  }
});
