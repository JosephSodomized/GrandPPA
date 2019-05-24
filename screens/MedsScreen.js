import React from "react";
import { ScrollView, StyleSheet, Text, View, FlatList, Modal, TouchableHighlight  } from "react-native";
import { ExpoLinksView } from "@expo/samples";
import firebase from "firebase";
import "@firebase/firestore";
import { Button, ListItem, Content, List, Container, Left, Right, Body } from "native-base";
import firebaseConfig from "../firebaseConfig";

let db;
export default class MedsScreen extends React.Component {
  static navigationOptions = {
    title: "Medicine"
  };

  constructor(...args) {
    super(...args);
    this.state = {
      medicines: [],
      email:"testdrugi",
      modalVisible: false,
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  addMedToFirestore(email, name, date, time) {
    db = firebase.firestore();
    let usermeds = db.collection("usermeds");
    const usersRef = usermeds.doc(email);

    usersRef.get().then(docSnapshot => {
      if (docSnapshot.exists) {
        usersRef.onSnapshot(doc => {
          usersRef.update({
            medicines: firebase.firestore.FieldValue.arrayUnion({
              name: name,
              date: date,
              time: time
            })
          });
        });
      } else {
        usersRef.set({ medicines: [] });
      }
    });
  }

   getMedFromFirestore = (email) => {
    db = firebase.firestore();
    let docRef = db.collection("usermeds").doc(email);
    docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          let data = doc.data();
          this.setState({
            medicines: data.medicines,
          })
        } else {
          console.log("No such document!");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  }

  componentWillMount() {
    this.getMedFromFirestore(this.state.email);
  }

  render() {

    const MedicinesList = this.state.medicines.map((item, index) => (
      <ListItem key={index} title={item.name}><Body><Text>{item.name}</Text><Text note>{item.date}</Text></Body></ListItem>
    ));
    

    return (
      <View>

        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <Text>Hello World!</Text>

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text>Show Modal</Text>
        </TouchableHighlight>
 


        <Button
          rounded
          info
          onPress={() => {
            this.getMedFromFirestore("testdrugi");
          }}
          style={{position:"relative", top:"50%", left:"50%"}}
        >
          <Text>AddMed</Text>
        </Button>
 <List>
 {MedicinesList}
 </List>
   
      </View>
    )
  }
}
