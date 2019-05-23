import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, Image } from 'react-native';
import { Container, Header, Content, Button, Text, Left } from 'native-base';


export default class FindMeScreen extends Component {
    static navigationOptions = {
        headerTitle: <Image source={require('../assets/images/logo.png')} style={{width:100, height:20}}/>,
        headerStyle: {
        backgroundColor: 'rgba(64,64,64,1)',
    },
    headerTintColor: '#fff',
    };

    render() {
        return (
            <View style={styles.container}>
                <Container style={styles.back}>
                    <Text style={styles.white}>Dalej coś będzie działane później</Text>
                </Container>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(237,199,7,1)',
    },
    header: {
        backgroundColor: 'rgba(64,64,64,1)',
        height: 90,
        padding: 20
    },
    back: {
        backgroundColor: 'rgba(64,64,64,1)'
    },
    logo: {
        fontSize: 20,
        alignSelf: 'center',
        padding: 50
    },
    white:{
        color: '#fff'
    }
});