import React, { Component } from 'react';
import { StyleSheet, View, Image, TextInput, AppRegistry, Alert, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Button, Text, Left} from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import { Col, Row, Grid } from "react-native-easy-grid";
import Input from '../components/Input';

class AddContact extends Component {
    static navigationOptions = {
        headerTitle: <Image source={require('../assets/images/logo.png')} style={{width:100, height:20}}/>,
        headerStyle: {
        backgroundColor: 'rgba(64,64,64,1)',
    },
    headerTintColor: '#fff',
    };

    state = {
        name: '', 
        number: '',
        isValid: null,
      }

      
      
      submitHandler = (name, number) => {
        
        const numberReg = new RegExp('(?:\d{9})');
        const nameReg = new RegExp("^[a-zA-Z]+$");

        testNom = this.state.testNo;

       // numberTest = testNom.exec(numberReg);

        if (!this.state.isValid) {
                // not vaild
                Alert.alert('Number not valid', 'Please enter a 9 digits number',
                [
                    {text: 'OK', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
                ]);
        } else {
                //valid
        }
      }

      

    render () {

        const { isValid } = this.state;
        const { name } = this.state;
        const { number } = this.state;
        console.log('isValid', isValid);
        console.log(name);
        console.log(number);

        return(
            <ScrollView>
                <View style={styles.container}> 
                    <Container style={styles.back}>
                    <Col>
                    <Text style={styles.text}>Add new contact</Text>
                    <Text></Text>
                    <TextInput
                        placeholder="Contact name"
                        style={styles.textInput}
                        onChangeText={(name) => this.setState({name})}
                        value={this.state.name}
                    />
                    
                    <Text></Text>
                    
                    <Input 
                        placeholder="Contact number"
                        style={styles.textInput}
                        pattern={'^[0-9]{9}$' /* only nummbers */ }
                        onValidation={isValid => this.setState({ isValid })} 
                        onChangeText={(number) => this.setState({number})}
                        value={this.state.number}
                        />
                    <Text></Text>
                    
                    <Button style={styles.button} onPress={() => this.submitHandler(this.state.name.value, this.state.number.value)} >
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
      input: {
        height: 48,
        width: '80%',
        padding: 8,
        margin: 16,
        borderColor: 'gray',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 8,
      },

    
});

export default AddContact;