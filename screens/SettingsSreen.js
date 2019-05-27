import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Container, Header, Content, Button, Text, Left } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import { faAlignCenter } from '@fortawesome/free-solid-svg-icons';
import { faAddressBook, faUserCog} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

class SettingsScreen extends Component {


    constructor(props) {
        super(props);
        this.state = {
            email: props.navigation.state.params.email,
        };
      }

    static navigationOptions = {
        headerTitle: <Image source={require('../assets/images/logo.png')} style={{width:100, height:20}}/>,
        headerStyle: {
        backgroundColor: 'rgba(64,64,64,1)',
    },
    headerTintColor: '#fff',
    };


    render () {
        const {navigate} = this.props.navigation;
        return(
            <View style={styles.container}> 
                <Container style={styles.back}>
                        <Row >
                                <Button style={styles.button2} block 
                                onPress={() => {navigate('AddContact', {email: this.state.email});
                                console.log(this.state.email)}} >
                                <FontAwesomeIcon icon={faAddressBook} size={80} color="#fff" />
                                <Text></Text>
                                <Text style={styles.text}>Add contact</Text>
                                </Button>

                                <Button style={styles.button1}  block warning
                                onPress={() => navigate('ChangeUsername')}>
                                <FontAwesomeIcon icon={faUserCog} size={80} color="#fff" />
                                <Text></Text>
                                <Text style={styles.text}>Change username</Text></Button>
                        </Row>
                </Container>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 150,
        backgroundColor: 'rgba(237,199,7,1)',
        
    },
    back: {
        backgroundColor: 'rgba(64,64,64,1)',
        justifyContent: 'space-evenly',
        alignItems: 'stretch',
        padding: 30,
    },
    logo: {
        fontSize: 20,
        alignSelf: 'center',
        padding: 50
    },
    button1:{
        height: 300,
        margin: 5,
        alignSelf: 'center',
        width: 150,  
        fontSize: 50,     
        flexDirection: 'column', 
    },
    button2:{
        height: 300,
        margin: 5,
        alignSelf: 'center',
        width: 150,  
        backgroundColor: '#9CA3DB',
        flexDirection: 'column'
    },
    text:{
        fontSize: 25,
        textAlign: 'center',
    }
    
});

export default SettingsScreen;