import React from 'react';
import {
  StyleSheet,
  View,
  Vibration,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native';

import { Container, Header, Content, Button, Text, Left } from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCapsules, faCogs, faGlobeAmericas, faAmbulance } from '@fortawesome/free-solid-svg-icons'
import { Col, Row, Grid } from "react-native-easy-grid";


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  onPressLogo(){
    Alert.alert('GrandppA: Projekt wykonany przez:'+`\n`+ `\n`+ ' Karolina Rutkowska'+`\n`+ 'Michał Bałos'+`\n`+ 'Michał Topolski'+`\n`+ 'Dominik Malcharczyk');
  }

  render() {
    const DURATION = 50000;
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Container style={styles.back}>
        <TouchableHighlight onPress={this.onPressLogo} underlayColor="white">
        <Header style={styles.header}>
          <Image  source={require('../assets/images/logo.png')} style={{width: 305, height: 65, marginTop:10}}/>
          </Header>
        </TouchableHighlight>
          
          <Content>
            <Grid style={styles.align}>
              <Row>
                <Col>
                    <Button style={styles.button} block warning 
                    onPress={() => navigate('Meds')}>
                      <FontAwesomeIcon style={styles.faCapsules} icon={faCapsules} size={90} color="#fff" />
                      <Text style={styles.TextStyle}>Medicine</Text>
                    </Button>
                </Col>
                <Col>
                  <Button style={styles.button} block danger
                  onPress={() => navigate('Help')}>
                  <FontAwesomeIcon style={styles.faCapsules} icon={faAmbulance} size={90} color="#fff" />
                  <Text style={styles.TextStyle} color="#fff">Help me!</Text></Button>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button style={styles.button3} block
                  onPress={() => navigate('FindMe')}>
                  <FontAwesomeIcon style={styles.faCapsules} icon={faGlobeAmericas} size={90} color="#fff" />
                  <Text style={styles.TextStyle}>Find me</Text>
                  </Button>
                </Col>
                <Col>
                  <Button style={styles.button} block light
                  onPress={() => navigate('Settings')}>
                  <FontAwesomeIcon style={styles.faCapsules} icon={faCogs} size={90} color="rgba(57,57,57,1)" />
                  <Text style={styles.TextStyle2}>Settings</Text></Button>
                </Col>
              </Row>
            </Grid>
          </Content>
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
  TextStyle:{
    display: 'flex',
    top: 60,
    fontSize: 30,
    right: 42,
    color:'#fff'
  },
  TextStyle2:{
    display: 'flex',
    top: 60,
    fontSize: 30,
    right: 42,
    color:'rgba(57,57,57,1)'
  },
  align: {
    margin: 10
  },
  faCapsules:{
    display: 'flex',
    left: 70,
    top: -10
  },
  button: {
    margin: 1,
    height: 300,
  },
  button3: {
    margin: 1,
    height: 300,
    backgroundColor: 'rgba(83,184,87,1)'
  }
});

