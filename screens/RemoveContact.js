import React, { Component } from 'react';
import { StyleSheet, View, Image, TextInput, Alert} from 'react-native';
import { Container, Header, Content, Button, Text, Left, List, Body, Right, Icon } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import * as firebase from "firebase/app";
import { ListItem, withTheme } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserMinus} from '@fortawesome/free-solid-svg-icons';


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
              console.log(this.state.numbers.name);
            } else {
              console.log("No such document!");
            }
          })
          .catch(function(err) {
            console.log("Error getting document:", err);
          });
      };

      
      removeContact = (email, name, number) => {
          console.log('in a method');
          console.log(email);
          console.log(name);
          console.log(number);

        db = firebase.firestore();
        let docRef = db.collection("usercontacts").doc(email);
        docRef
          .update({
            numbers: firebase.firestore.FieldValue.arrayRemove({
              name: name,
              number: number,
            })
          })
          .then(this.getContactFromFirestore(email));

      };

      componentWillMount() {
          this.getContactFromFirestore(this.state.email);
      }

      removingContactHandler = (email, name, number) => {
          console.log('in a handler');
        Alert.alert('Are you sure?', 'Your contact will be removed and you no longer will be able to call it in case of emergency',
        [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'Delete', onPress: () => this.removeContact(email, name, number)}
        ]);
      } 

    render () {

        const Contacts = this.state.numbers.map((item, index) => (
            <Button style={styles.button} key={index} onPress={() => this.removingContactHandler(this.state.email, item.name, item.number)}>
                < Text style={styles.buttonText}>
                  {item.name} : {item.number}
                </Text>
                  <Icon
                   name='ios-trash'
                   color='black'
                   >
                  </Icon>
            </Button>
          ));

        return(
            <ScrollView>
                <View style={styles.container}> 
                    <Container style={styles.back}>
                        
                                    <List>{Contacts}</List>
                    </Container>
                </View>
            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 150,
        backgroundColor: 'rgba(64,64,64,1)',
        
    },
    back: {
        backgroundColor: 'rgba(64,64,64,1)',
        padding: 10
    },
    logo: {
        fontSize: 20,
        alignSelf: 'center',
        padding: 50
    },
    button: {
        width: 350,
        height: 45,
        backgroundColor: '#595959',
        

    },
    buttonText: {
        color: 'white',
        
    }
    
    
});

export default ChangeUsername;