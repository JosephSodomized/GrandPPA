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
  Item,
  Picker
} from "native-base";
import { LinearGradient } from "expo";
import { Dropdown } from "react-native-material-dropdown";

import hoursOfDay from "../constants/hoursOfDay";
import daysOfWeek from "../constants/daysOfWeek";

import { TextField } from "react-native-material-textfield";

import firebaseConfig from "../firebaseConfig";

let db;
const brandNameAPI =
  "https://api.fda.gov/drug/label.json?search=openfda.brand_name:";
const genericNameAPI =
  "https://api.fda.gov/drug/label.json?search=openfda.generic_name:";
const manufacturerNameAPI =
  "https://api.fda.gov/drug/label.json?search=openfda.manufacturer_name:";
const substanceNameAPI =
  "https://api.fda.gov/drug/label.json?search=openfda.substance_name:";
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
      date: "",
      time: "",
      amount: "",
      daysOfWeek: daysOfWeek,
      hoursOfDay: hoursOfDay,
      medInfo: ""
    };
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  addMedToFirestore(email, name, date, time, amount, medInfo) {
    db = firebase.firestore();
    let usermeds = db.collection("usermeds");
    const usersRef = usermeds.doc(email);

    console.log(medInfo);

    usersRef.get().then(docSnapshot => {
      if (docSnapshot.exists) {
        usersRef.onSnapshot(doc => {
          usersRef.update({
            medicines: firebase.firestore.FieldValue.arrayUnion({
              name: name,
              date: date,
              time: time,
              amount: amount,
              medInfo: medInfo
            })
          });
          this.getMedFromFirestore(this.state.email);
        });
      } else {
        usersRef.set({ medicines: [] });
        usersRef.onSnapshot(doc => {
          usersRef.update({
            medicines: firebase.firestore.FieldValue.arrayUnion({
              name: name,
              date: date,
              time: time,
              amount: amount,
              medInfo: medInfo
            })
          });
        });
        this.getMedFromFirestore(this.state.email);
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

  getMedInfoFromAPI(email, name, date, time, amount) {
    fetch(`${brandNameAPI}"${name}"`)
      .then(response => response.json())
      .then(respJson =>
        this.addMedToFirestore(
          email,
          name,
          date,
          time,
          amount,
          respJson.results[0].indications_and_usage
        )
      )
      .catch(
        fetch(`${genericNameAPI}"${name}"`)
          .then(response => response.json())
          .then(respJson =>
            this.addMedToFirestore(
              email,
              name,
              date,
              time,
              amount,
              respJson.results[0].indications_and_usage
            )
          )
          .catch(
            fetch(`${manufacturerNameAPI}"${name}"`)
              .then(response => response.json())
              .then(respJson =>
                this.addMedToFirestore(
                  email,
                  name,
                  date,
                  time,
                  amount,
                  respJson.results[0].indications_and_usage
                )
              )
              .catch(
                fetch(`${manufacturerNameAPI}"${name}"`)
                  .then(response => response.json())
                  .then(respJson =>
                    this.addMedToFirestore(
                      email,
                      name,
                      date,
                      time,
                      amount,
                      respJson.results[0].indications_and_usage
                    )
                  )
                  .catch(() =>
                    this.addMedToFirestore(
                      email,
                      name,
                      date,
                      time,
                      amount,
                      "There is no such med in the database"
                    )
                  )
              )
          )
      );
  }

  render() {
    const MedicinesList = this.state.medicines.map((item, index) => (
      <ListItem icon key={index} title={item.name}>
        <Left>
          <Icon
            type="AntDesign"
            name="question"
            ios="question"
            onPress={() => alert(item.medInfo)}
          />
        </Left>
        <Body>
          <Text>
            {item.name} - {item.amount} pills
          </Text>
          <Text note>
            {item.date} {item.time}
          </Text>
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
            <Row style={{ height: "5%" }}>
              <Col />
            </Row>
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
                <TextField
                  label="Medicine name"
                  onChangeText={medName => this.setState({ medName })}
                  baseColor="black"
                  tintColor="black"
                />
              </Col>
            </Row>
            <Row style={styles.inputRow}>
              <Col>
                <TextField
                  label="Pills amount"
                  onChangeText={amount => this.setState({ amount })}
                  baseColor="black"
                  tintColor="black"
                />
              </Col>
            </Row>
            <Row style={styles.inputRow}>
              <Col>
                <Dropdown
                  label="Day of week"
                  data={this.state.daysOfWeek}
                  onChangeText={dayOfWeek => this.setState({ date: dayOfWeek })}
                  baseColor="black"
                  textColor="black"
                />
              </Col>
            </Row>
            <Row style={styles.inputRow}>
              <Col>
                <Dropdown
                  label="Time"
                  data={this.state.hoursOfDay}
                  onChangeText={time => this.setState({ time })}
                  baseColor="black"
                  textColor="black"
                />
              </Col>
            </Row>
            <Row style={styles.inputRow}>
              <Col>
                <Button
                  rounded
                  light
                  onPress={() => {
                    this.getMedInfoFromAPI(
                      this.state.email,
                      this.state.medName,
                      this.state.date,
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
  },
  dateRow: {
    height: "15%",
    width: "75%",
    marginLeft: "auto",
    marginRight: "auto"
  }
});
