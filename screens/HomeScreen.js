import React from 'react';
import {
  StyleSheet,
  View,
  Vibration,
  TouchableOpacity
} from 'react-native';

import { Container, Header, Content, Button, Text, Left } from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCapsules } from '@fortawesome/free-solid-svg-icons'
import { Col, Row, Grid } from "react-native-easy-grid";


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    const DURATION = 50000;
    return (
      <View style={styles.container}>
        <Container style={styles.back}>
          <Header><Text>GrandPPA</Text></Header>
          <Content>
            <Grid style={styles.align}>
              <Row>
                <Col>
                    <Button style={styles.button} block info>
                      <Text>Medicine</Text>
                      <FontAwesomeIcon icon={faCapsules} size={40} color="#ffff" />
                    </Button>
                </Col>
                <Col>
                  <Button style={styles.button} block warning><Text>Help me!</Text></Button>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button style={styles.button} block light><Text>Find me</Text></Button>
                </Col>
                <Col>
                  <Button style={styles.button} block dark><Text>Settings</Text></Button>
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
  back: {
    backgroundColor: 'rgba(242,233,209,1)'
  },
  logo: {
    fontSize: 20,
    alignSelf: 'center',
    padding: 50
  },
  align: {
    margin: 10
  },
  button: {
    margin: 1,
    height: 300
  }
});

