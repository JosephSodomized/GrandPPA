import React, { Component } from 'react';
import { StyleSheet, View, Image, TextInput} from 'react-native';
import { Container, Header, Content, Button, Text, Left } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import * as firebase from "firebase/app";


class ChangeUsername extends Component {
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
            name: null, 
            number: null,
            email: props.navigation.state.params.email,
            numbers: [],
        };
      }

    getContactFromFirestore = (email) => {
        db = firebase.firestore();
        let docRef = db.collection("usercontacts").doc(email);
        docRef
          .get()
          .then(doc => {
            if (doc.exists) {
              let data = doc.data();
              this.setState(
                {
                  numbers: data.numbers
                },
              );

              console.log(this.state.numbers);
            } else {
              console.log("No such document!");
            }
          })
          .catch(function(err) {
            console.log("Error getting document:", err);
          });
      };

    render () {
        return(
            <ScrollView>
                <View style={styles.container}> 
                    <Container style={styles.back}>
                                    <Button onPress={() => this.getContactFromFirestore(this.state.email)}>
                                        <Text>Click</Text>
                                    </Button>
                    </Container>
                </View>
            </ScrollView>

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
    textInput: {
        borderColor: '#CCCCCC',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        height: 50,
        fontSize: 25,
        paddingLeft: 20,
        paddingRight: 20
      }
    
});

export default ChangeUsername;