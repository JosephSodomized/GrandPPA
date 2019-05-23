import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { ExpoLinksView } from "@expo/samples";
import firebase from "firebase";
import "@firebase/firestore";
import { Button } from "native-base";
import firebaseConfig from "../firebaseConfig";

let db;
export default class MedsScreen extends React.Component {
  static navigationOptions = {
    title: "Medicine"
  };

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

  render() {
    return (
      <Button
        rounded
        info
        onPress={() => {
          this.addMedToFirestore();
        }}
      >
        <Text>AddMed</Text>
      </Button>
    );
  }
}
