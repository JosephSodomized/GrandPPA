import React, { Component } from 'react';
import { StyleSheet, View, Image, TextInput, AppRegistry, Alert, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Button, Text, Left} from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import { Col, Row, Grid } from "react-native-easy-grid";
import Input from '../components/Input';
import firebaseConfig from '../firebaseConfig';
import * as firebase from "firebase/app";

class AddContact extends Component {
    static navigationOptions = {
        headerTitle: <Image source={require('../assets/images/logo.png')} style={{width:100, height:20}}/>,
        headerStyle: {
        backgroundColor: 'rgba(64,64,64,1)',
    },
    headerTintColor: '#fff',
    };

    state = {
        name: null, 
        number: null,
        isValid: null,
        isSubmited: false,
        email: 'karo.rutkowska@gmail.com',
      }

      
      
      submitHandler = (name, number) => {
        
        if (name===null || number===null) {
            Alert.alert('No values added', 'Please enter a name and a contact number before submiting',
                [
                    {text: 'OK', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
                ]);
        }
        else if (!this.state.isValid) {
                // not vaild
                Alert.alert('Number not valid', 'Please enter a 9 digits number',
                [
                    {text: 'OK', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
                ]);
        } else {
                //valid HERE WILL BE THE ADDCONTACT FUNC
                console.log('im a consol log before function call');
                this.addContact(this.state.email,name, number);
        }
      }

    //   addContact = (name, mobile) => {
    //       /* To add contact there must be:
    //         -   a login token that connects user with his contact,
    //         -   a post request that sends data to the server,
    //         -   a control get to see what's in there
    //         -   an alert saying about success or error */

    //         // if(name!=null && mobile!=null){

    //         //     console.log('Adding contact process started');
    //         //     fetch(firebaseConfig.databaseURL + '/contacts/contacts_list.json', {
    //         //     method:'POST',
    //         //     headers: {
    //         //     Accept:'application/json',
    //         //     'Content-Type':'application/json',
    //         //    },
    //         //     body:JSON.stringify({
    //         //      "name":name,
    //         //      "mobile":mobile,
    //         //      }),
    //         //     })
    //         //     .catch((error) => console.log(error))
    //         //     .then((response) => console.log(response))
    //         //    .then((responseData) => {
    //         //      if(responseData.name !=null ){
    //         //      this.setState({
    //         //      name:null,
    //         //      mobile:null,
    //         //      isSubmited:true,
    //         //     })
                
    //         //     console.log("post method executed");
    //         //   }
    //         //  else{
    //         //    Alert.alert(
    //         //     'Oops !',
    //         //     'Something went wrong',[
    //         //      {text: 'OK', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},],
    //         //     { cancelable: false })
    //         //   }
    //         //  })
    //         //  .done();
    //         //  }
    //         //  else{
    //         //    Alert.alert(
    //         //     'Oops !',
    //         //     'Press SUBMIT button after entering your message',[
    //         //     {text: 'OK', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},],
    //         //     { cancelable: false })
    //         //     }

    //          };

             addContact(email, number, name) {
                db = firebase.firestore();
                let usercontacts = db.collection("usercontacts");
                const usersRef = usercontacts.doc(email);

                console.log('add contact fun started get started');

             
                usersRef.get().then(docSnapshot => {
                    console.log('userRef get started');
                  if (docSnapshot.exists) {
                    usersRef.onSnapshot(doc => {
                      usersRef.update({
                        numbers: firebase.firestore.FieldValue.arrayUnion({
                          number: number,
                          name: name,
                        })
                      });
                    });
                    console.log('if got through');
                  } else {
                    usersRef.set({ numbers: [] });
                    usersRef.onSnapshot(doc => {
                      usersRef.update({
                        numbers: firebase.firestore.FieldValue.arrayUnion({
                          number: number,
                          name: name,
                        })
                      });
                    });
                    console.log('else got throough');
                  }
                });
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
                        keyboardType = {'phone-pad'}
                        />
                    <Text></Text>
                    
                    <Button style={styles.button} onPress={() => this.submitHandler(this.state.name, this.state.number)} >
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