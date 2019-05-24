import React, { Component } from 'react';
import { StyleSheet, View, Image, TextInput} from 'react-native';
import { Container, Header, Content, Button, Text, Left } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';

class ChangeUsername extends Component {
    static navigationOptions = {
        headerTitle: <Image source={require('../assets/images/logo.png')} style={{width:100, height:20}}/>,
        headerStyle: {
        backgroundColor: 'rgba(64,64,64,1)',
    },
    headerTintColor: '#fff',
    };


    render () {
        return(
            <ScrollView>
                <View style={styles.container}> 
                    <Container style={styles.back}>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Your new username"
                                        maxLength={20}
                                        />
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