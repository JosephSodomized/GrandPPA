import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Modal,
  TouchableHighlight
} from "react-native";
import { ExpoLinksView } from "@expo/samples";
import firebase from "firebase";
import "@firebase/firestore";
import {
  Button,
  ListItem,
  Content,
  List,
  Container,
  Left,
  Right,
  Body,
  Grid,
  Row,
  Col,
  Icon,
  Form,
  Input,
  Label,
  Item
} from "native-base";
import { LinearGradient } from "expo";

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
      email: "testdrugi",
      modalVisible: false,
      medName: "",
      dayOfWeek: "",
      time: "",
      amount: ""
    };
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  addMedToFirestore(email, name, date, time, amount) {
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
              time: time,
              amount: amount
            })
          });
          this.getMedFromFirestore("testdrugi");
        });
      } else {
        usersRef.set({ medicines: [] });
        usersRef.onSnapshot(doc => {
          usersRef.update({
            medicines: firebase.firestore.FieldValue.arrayUnion({
              name: name,
              date: date,
              time: time,
              amount: amount
            })
          });
        });
        this.getMedFromFirestore();
      }
    });
  }

  getMedFromFirestore = email => {
    db = firebase.firestore();
    let docRef = db.collection("usermeds").doc(email);
    docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          let data = doc.data();
          this.setState({
            medicines: data.medicines
          });
        } else {
          console.log("No such document!");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  };

  deleteMed = (email, name, date, time, amount) => {
    db = firebase.firestore();
    let docRef = db.collection("usermeds").doc(email);
    docRef
      .update({
        medicines: firebase.firestore.FieldValue.arrayRemove({
          name: name,
          date: date,
          time: time,
          amount: amount
        })
      })
      .then(this.getMedFromFirestore(email));
  };

  componentWillMount() {
    this.getMedFromFirestore(this.state.email);
  }

  render() {
    const MedicinesList = this.state.medicines.map((item, index) => (
      <ListItem icon key={index} title={item.name}>
        <Left>
          <Icon type="AntDesign" name="question" ios="question" />
        </Left>
        <Body>
          <Text>{item.name} {item.amount} - pills</Text>
          <Text note>{item.date} {item.time}</Text>
        </Body>
        <Right>
          <Icon
            type="FontAwesome"
            name="trash-o"
            ios="trash-o"
            onPress={() => {
              this.deleteMed(
                this.state.email,
                this.state.medicines[index].name,
                this.state.medicines[index].date,
                this.state.medicines[index].time,
                this.state.medicines[index].amount
              );
            }}
          />
        </Right>
      </ListItem>
    ));

    return (
      <View style={{ flex: 1 }}>
        <Container>
          <Grid>
            <Row style={{ height: "20%" }}>
              <Col>
                <Button
                  rounded
                  light
                  onPress={() => this.setModalVisible(true)}
                  style={styles.authButton}
                >
                  <Text>Add medicine</Text>
                </Button>
              </Col>
            </Row>
            <Row style={{ height: "80%" }}>
              <Col>
                <List>{MedicinesList}</List>
              </Col>
            </Row>
          </Grid>
        </Container>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <Grid>
            <Row style={{ height: "25%" }}>
              <Col />
            </Row>
            <Row style={styles.inputRow}>
              <Col>
                <Item>
                  <Input
                    placeholder="Medicine name"
                    placeholderTextColor="black"
                    textColor="black"
                    onChangeText={medName => this.setState({ medName })}
                  />
                </Item>
              </Col>
            </Row>
            <Row style={styles.inputRow}>
              <Col>
                <Item>
                  <Input
                    placeholder="Day of week"
                    placeholderTextColor="black"
                    textColor="black"
                    onChangeText={dayOfWeek => this.setState({ dayOfWeek })}
                  />
                </Item>
              </Col>
            </Row>
            <Row style={styles.inputRow}>
              <Col>
                <Item>
                  <Input
                    placeholder="Time"
                    placeholderTextColor="black"
                    textColor="black"
                    onChangeText={time => this.setState({ time })}
                  />
                </Item>
              </Col>
            </Row>
            <Row style={styles.inputRow}>
              <Col>
                <Item>
                  <Input
                    placeholder="Pills amount"
                    placeholderTextColor="black"
                    textColor="black"
                    onChangeText={amount => this.setState({ amount })}
                  />
                </Item>
              </Col>
            </Row>
            <Row style={styles.inputRow}>
              <Col>
                <Button
                  rounded
                  light
                  onPress={() => {
                    this.addMedToFirestore(
                      this.state.email,
                      this.state.medName,
                      this.state.dayOfWeek,
                      this.state.time,
                      this.state.amount
                    );
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                  style={styles.authButton}
                >
                  <Text>Add medicine</Text>
                </Button>
              </Col>
            </Row>
            <Row style={styles.inputRow}>
              <Col>
                <Button
                  rounded
                  light
                  onPress={() => this.setModalVisible(!this.state.modalVisible)}
                  style={styles.authButton}
                >
                  <Text>Cancel</Text>
                </Button>
              </Col>
            </Row>
          </Grid>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  authButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "75%",
    marginLeft: "auto",
    marginRight: "auto"
  },
  inputRow: {
    height: "10%",
    width: "75%",
    marginLeft: "auto",
    marginRight: "auto"
  }
});
