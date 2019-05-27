import React from "react";
import { StyleSheet, Text, View, TouchableHighlight, Image } from "react-native";

import { Google } from "expo";
import { Button } from "native-base";
import { LinearGradient } from "expo";

import { Container, Input, Item, Icon, Header } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import clientid from "../clientid";
import logo from '../assets/images/logo.png';

export default class AuthenticationScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(...args) {
    super(...args);
    this.state = {
      email: "",
      password: ""
    };
  }

  async loginWithGoogle(navigate) {
    const clientId = clientid;
    const { type, accessToken, user } = await Google.logInAsync({ clientId });
    if (type === "success") {
      navigate("Home", {email: user.email});
    }
    // navigate("Home", {email: "michal.kacper.balos@gmail.com"})
  }

  register(email, password, navigate) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => navigate("Home", {email}))
      .catch(function(err) {
        alert("Coś poszło nie tak, spróbuj jeszcze raz!");
        console.log(err.message);
      });
    // navigate("Home", {email: "michal.kacper.balos@gmail.com"})
  }

  login(email, password, navigate) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => navigate("Home", {email}))
      .catch(function(err) {
        alert("Coś poszło nie tak, spróbuj jeszcze raz!");
        console.log(err.message);
      });
    // navigate("Home", {email: "michal.kacper.balos@gmail.com"})
  }

  handleChange = name => text => {
    console.log(text);
    this.setState({ [name]: text });
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
      <Container style={styles.back}>
      <TouchableHighlight onPress={this.onPressLogo} underlayColor="white">
      <Header style={styles.header}>
        <Image  source={logo} style={{width: 305, height: 65, marginTop:10}}/>
        </Header>
      </TouchableHighlight>
            <Grid>
              <Row style={{ height: "5%" }}>
                <Col />
              </Row>
              <Row style={styles.inputRow}>
                <Col>
                  <Item>
                    <Input
                      style={styles.inputForm}
                      placeholderTextColor="white"
                      textColor="white"
                      placeholder="Adres e-mail"
                      onChangeText={email => this.setState({ email })}
                    />
                  </Item>
                </Col>
              </Row>
              <Row style={styles.inputRow}>
                <Col>
                  <Item>
                    <Input
                      placeholder="Hasło"
                      placeholderTextColor="white"
                      textColor="white"
                      secureTextEntry={true}
                      onChangeText={password => this.setState({ password })}
                    />
                  </Item>
                </Col>
              </Row>
              <Row style={styles.buttonRow}>
                <Col>
                  <Button
                    rounded
                    info
                    onPress={() => {
                      this.login(
                        this.state.email,
                        this.state.password,
                        navigate
                      );
                    }}
                    style={styles.authButton}
                  >
                    <Icon
                      style={styles.icon}
                      type="AntDesign"
                      name="login"
                      ios="login"
                    />
                    <Text style={styles.buttonText}>Zaloguj się</Text>
                  </Button>
                </Col>
              </Row>
              <Row style={styles.buttonRow}>
                <Col>
                  <Button
                    rounded
                    info
                    onPress={() => {
                      this.register(
                        this.state.email,
                        this.state.password,
                        navigate
                      );
                    }}
                    style={styles.authButton}
                  >
                    <Icon
                      style={styles.icon}
                      type="Ionicons"
                      name="md-create"
                      ios="md-create"
                    />
                    <Text style={styles.buttonText}>Zarejestruj się</Text>
                  </Button>
                </Col>
              </Row>
              <Row style={styles.orOptionRow}>
                <Col>
                  <View
                    style={{
                      borderBottomColor: "white",
                      borderBottomWidth: 1
                    }}
                  />
                </Col>
                <Col>
                  <Text style={styles.orOption}>LUB</Text>
                </Col>
                <Col>
                  <View
                    style={{
                      borderBottomColor: "white",
                      borderBottomWidth: 1
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button
                    rounded
                    danger
                    onPress={() => this.loginWithGoogle(navigate)}
                    style={styles.authButton}
                  >
                    <Icon
                      style={styles.icon}
                      type="AntDesign"
                      name="google"
                      ios="google"
                    />
                    <Text style={styles.buttonText}>Google Sign in</Text>
                  </Button>
                </Col>
              </Row>
              <Row style={{ height: "15%" }}>
                <Col />
              </Row>
            </Grid>
        </Container>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(237,199,7,1)',
  },
  header:{
    backgroundColor: 'rgba(64,64,64,1)',
    height: 90,
    padding: 20
  },
  back: {
    backgroundColor: 'rgba(64,64,64,1)'
  },
  logo: {
    fontSize: 20,
    alignSelf: 'center',
    padding: 50
  },
  orOption: {
    textAlign: "center",
    color: "white"
  },
  authButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "75%",
    marginLeft: "auto",
    marginRight: "auto"
  },
  buttonText: {
    color: "white",
    textAlignVertical: "center",
    textAlign: "center"
  },
  inputRow: {
    height: "10%",
    width: "75%",
    marginLeft: "auto",
    marginRight: "auto"
  },
  orOptionRow: {
    height: "10%",
    width: "75%",
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto"
  },
  inputForm: {
    color: "white"
  },
  buttonRow: {
    height: "10%",
    display: "flex",
    alignItems: "center"
  }
});
