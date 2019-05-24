import React, { Component } from 'react';
import { StyleSheet, View, Image, TextInput, AppRegistry } from 'react-native';
import { Container, Header, Content, Button, Text, Left} from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import { Col, Row, Grid } from "react-native-easy-grid";

class AddContact extends Component {
    static navigationOptions = {
        headerTitle: <Image source={require('../assets/images/logo.png')} style={{width:100, height:20}}/>,
        headerStyle: {
        backgroundColor: 'rgba(64,64,64,1)',
    },
    headerTintColor: '#fff',
    };

    constructor(props) {
        super(props);
        this.state = { 
            name: 'Contact name ', 
            number: 'Phone number'
        };
      }

    render () {
        return(
            <ScrollView>
                <View style={styles.container}> 
                    <Container style={styles.back}>
                    <Col>
                    <Text style={styles.text}>Add new contact</Text>
                    <Text></Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(name) => this.setState({name})}
                        value={this.state.name}
                    />
                    <Text></Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(number) => this.setState({number})}
                        value={this.state.number}
                    />
                    <Text></Text>
                    
                    <Button style={styles.button}>
                        <Text style={styles.text}>Submit</Text>
                    </Button>
                    </Col>

                    </Container>
                </View>
            </ScrollView>

        );
    }
}

AppRegistry.registerComponent('AwesomeProject', () => AddContact);

const styles = StyleSheet.create({
    container: {
        flex: 150,
        backgroundColor: 'rgba(237,199,7,1)',
        
    },
    back: {
        backgroundColor: 'rgba(64,64,64,1)',
        alignItems: 'center',
        padding: 20,

    },
    logo: {
        fontSize: 20,
        alignSelf: 'center',
        padding: 40
    },
    textInput: {
        height: 60,
        fontSize: 33,
        width: 300,
        backgroundColor: 'white',
    },
    button:{
        height: 50,
        margin: 5,
        alignSelf: 'center',
        width: 150,  
        flexDirection: 'column', 
        backgroundColor: '#09BC8A',
    },
    text: {
        textAlign: 'center',
        fontSize: 30, 
        color: 'white',
            
    },
    wrapper: {
        flex: 1,
        marginTop: 150,
      },
      submitButton: {
        paddingHorizontal: 10,
        paddingTop: 20,
      },

    
});

export default AddContact;