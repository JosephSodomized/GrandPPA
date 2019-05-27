import React from 'react';
import {
  StyleSheet,
  View,
  Vibration,
  TouchableHighlight,
  Image,
  Alert,
  Linking
} from 'react-native';
import { Container, Header, Content, Button, Text, Left } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCapsules, faCogs, faGlobeAmericas, faAmbulance } from '@fortawesome/free-solid-svg-icons'

export default class HelpScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <Image source={require('../assets/images/logo.png')} style={{ width: 100, height: 20 }} />,
    headerStyle: {
      backgroundColor: 'rgba(64,64,64,1)',
    },
    headerTintColor: '#fff',
  };


  constructor(props) {
    super();
    this.state = {
      ambulanceNr: '112',
      text: 'Call ambulance'
    }
  }

  callAmbulance() {
    Linking.openURL(`tel:${this.state.ambulanceNr}`)
  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View style={styles.container}>
        <Container style={styles.back}>
          <Content>
            <Grid style={styles.align}>
              <Row>
                <Col>
                    <Button style={styles.button} block danger 
                    onPress={() => this.callAmbulance()}>
                      <FontAwesomeIcon style={styles.faCapsules} icon={faAmbulance} size={90} color="#fff" />
                      <Text style={styles.TextStyle}>{this.state.text}</Text>
                    </Button>
                </Col>
              </Row>
              <Row>
                <Col><Text style={styles.TextStyle2}>1. Stay calm</Text></Col>
              </Row>
              <Row>
                <Col><Text>&nbsp;</Text></Col>
              </Row>
              <Row>
                <Col><Text style={styles.TextStyle2}>2. Wait until the operator answers your call</Text></Col>
              </Row>
              <Row>
                <Col><Text>&nbsp;</Text></Col>
              </Row>
              <Row>
                <Col><Text style={styles.TextStyle2}>3. Follow the operator’s advice</Text></Col>
              </Row>
              <Row>
                <Col><Text>&nbsp;</Text></Col>
              </Row>
              <Row>
                <Col><Text style={styles.TextStyle2}>4. If something changes, inform 112 again</Text></Col>
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
    fontSize: 25,
    color:'#fff',
    right: 40
  },
  TextStyle2:{
    display: 'flex',
    top: 60,
    fontSize: 25,
    color:'#fff',
  },
  align: {
    margin: 10
  },
  faCapsules:{
    display: 'flex',
    left: 110,
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
