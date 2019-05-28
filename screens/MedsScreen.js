import React from "react";
import { StyleSheet, Text, View, Modal, Image } from "react-native";
import firebase from "firebase";
import "@firebase/firestore";
import {
  Button,
  ListItem,
  List,
  Container,
  Left,
  Right,
  Body,
  Grid,
  Row,
  Col,
  Icon,
  Input,
  Picker,
  Spinner
} from "native-base";

import hoursOfDay from "../constants/hoursOfDay";
import daysOfWeek from "../constants/daysOfWeek";

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
    headerTitle: (
      <Image
        source={require("../assets/images/logo.png")}
        style={{ width: 100, height: 20 }}
      />
    ),
    headerStyle: {
      backgroundColor: "rgba(64,64,64,1)"
    },
    headerTintColor: "#fff"
  };

  constructor(props) {
    super(props);
    this.state = {
      medList: [],
      email: props.navigation.state.params.email,
      modalVisible: false,
      medName: "",
      date: "",
      time: "",
      amount: "",
      daysOfWeek: daysOfWeek,
      hoursOfDay: hoursOfDay,
      medInfo: "",
      spinner: true
    };
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  setSpinnerVisible(spinner) {
    this.setState({ spinnerVisible: spinner });
  }

  addMedToFirestore(email, name, date, time, amount, medInfo) {
    db = firebase.firestore();
    let usermeds = db.collection("usermeds");
    const usersRef = usermeds.doc(email);

    usersRef.update({
      medicines: firebase.firestore.FieldValue.arrayUnion({
        name: name,
        date: date,
        time: time,
        amount: amount,
        medInfo: medInfo
      })
    });

    this.getMedFromFirestore(email);
  }

  getMedFromFirestore = (email, spinner) => {
    if (spinner) this.setSpinnerVisible(true);

    db = firebase.firestore();
    let docRef = db.collection("usermeds").doc(email);
    docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          let data = doc.data();
          this.setState(
            {
              medList: data.medicines
            },
            () => {
              if (spinner) this.setSpinnerVisible(false);
            }
          );
        } else {
          if (spinner) this.setSpinnerVisible(false);
        }
      })
      .catch(function(err) {
        console.log("Error getting document:", err);
      });
  };

  deleteMed = (email, item) => {
    db = firebase.firestore();
    let docRef = db.collection("usermeds").doc(email);
    docRef
      .update({
        medicines: firebase.firestore.FieldValue.arrayRemove(item)
      })
      .then(this.getMedFromFirestore(email, false));
  };

  componentDidMount() {
    this.getMedFromFirestore(this.state.email, true);
  }

  async getMedInfoFromAPI(email, name, date, time, amount) {
    let brandName, genericName, manufacturerName, substanceName, result;

    brandName = await fetch(`${brandNameAPI}"${name}"`);

    if (brandName.status !== 404) {
      result = await brandName.json();
      this.addMedToFirestore(
        email,
        name,
        date,
        time,
        amount,
        result.results[0].indications_and_usage[0]
      );
      return;
    }

    genericName = await fetch(`${genericNameAPI}"${name}"`);

    if (genericName.status !== 404) {
      result = await genericName.json();
      this.addMedToFirestore(
        email,
        name,
        date,
        time,
        amount,
        result.results[0].indications_and_usage[0]
      );
      return;
    }

    manufacturerName = await fetch(`${manufacturerNameAPI}"${name}"`);

    if (manufacturerName.status !== 404) {
      result = await manufacturerName.json();
      this.addMedToFirestore(
        email,
        name,
        date,
        time,
        amount,
        result.results[0].indications_and_usage[0]
      );
      return;
    }

    substanceName = await fetch(`${substanceNameAPI}"${name}"`);

    if (substanceName.status !== 404) {
      result = await substanceName.json();
      this.addMedToFirestore(
        email,
        name,
        date,
        time,
        amount,
        result.results[0].indications_and_usage[0]
      );
      return;
    }

    result = "There is no such med in the database";
    this.addMedToFirestore(email, name, date, time, amount, result);
    return;
  }

  render() {
    const MedicinesList = this.state.medList.map((item, index) => (
      <ListItem style={styles.listItem} icon key={index} title={item.name}>
        <Left>
          <Icon
            type="AntDesign"
            name="question"
            ios="question"
            style={styles.listItem}
            onPress={() => alert(item.medInfo)}
          />
        </Left>
        <Body>
          <Text style={styles.listItem}>
            {item.name} - {item.amount} pills
          </Text>
          <Text note style={styles.listItem}>
            {item.date} {item.time}
          </Text>
        </Body>
        <Right>
          <Icon
            type="AntDesign"
            name="close"
            ios="close"
            onPress={() => {
              this.deleteMed(this.state.email, item);
            }}
          />
        </Right>
      </ListItem>
    ));

    return (
      <View style={{ flex: 1 }}>
        <Container style={{ flex: 1, backgroundColor: "rgba(64,64,64,1)" }}>
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
                {this.state.spinnerVisible ? (
                  <Spinner color="white" />
                ) : (
                  <List>{MedicinesList}</List>
                )}
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
                <Input
                  placeholderTextColor="black"
                  textColor="black"
                  placeholder="Medicine name"
                  onChangeText={medName => this.setState({ medName })}
                />
              </Col>
            </Row>
            <Row style={styles.inputRow}>
              <Col>
                <Input
                  placeholderTextColor="black"
                  textColor="black"
                  placeholder="Pills amount"
                  keyboardType="numeric"
                  onChangeText={amount => this.setState({ amount })}
                />
              </Col>
            </Row>
            <Row style={styles.dateRow}>
              <Col>
                <Picker
                  mode="dropdown"
                  onValueChange={dayOfWeek =>
                    this.setState({ date: dayOfWeek })
                  }
                  selectedValue={this.state.date}
                  placeholder="Day of week"
                >
                  {this.state.daysOfWeek.map((item, index) => (
                    <Picker.Item
                      key={index}
                      label={item.value}
                      value={item.value}
                    />
                  ))}
                </Picker>
              </Col>
            </Row>
            <Row style={styles.dateRow}>
              <Col>
                <Picker
                  mode="dropdown"
                  onValueChange={time => this.setState({ time: time })}
                  selectedValue={this.state.time}
                  placeholder="Time"
                >
                  {this.state.hoursOfDay.map((item, index) => (
                    <Picker.Item
                      key={index}
                      label={item.value}
                      value={item.value}
                    />
                  ))}
                </Picker>
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
    height: "10%",
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto"
  },
  listItem: {
    color: "white"
  }
});
