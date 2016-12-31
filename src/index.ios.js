import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  AsyncStorage
} from 'react-native';
import MapView from 'react-native-maps';
import Auth0Lock from 'react-native-lock';

const lock = new Auth0Lock({
  clientId: 'fluO2A5kqKrUAJ9jc9lUm5DT7Wf5HpBj',
  domain: 'scribemapsapi.auth0.com'
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  map: {
    position: 'relative',
    top: 0,
    left: 0,
    width: 400,
    height: 400
  }
});

export default class Scribe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 'loading',
      userId: ''
    };
    this.onRegionChange = this.onRegionChange.bind(this);
  }

  componentWillMount() {
    this.getMessages();
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  getMessages() {
    fetch('http://127.0.0.1:8000/messages', {
      method: 'GET'
    })
    .then(response => response.json())
    .then((responseData) => {
      this.setState({
        data: JSON.stringify(responseData)
      });
    });
  }

  postMessage(text) {
    fetch('http://127.0.0.1:8000/messages', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: text
      })
    })
    .then(() => {
      this.getMessages();
    });
  }


  login() {
    lock.show({}, (err, profile, token) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log('User ID', profile.userId);
      AsyncStorage.setItem('id_token', JSON.stringify(token)).then(() => {
        console.log('id token created');
      });
    });
  }

  logout() {
    AsyncStorage.removeItem('id_token').then(() => {
      AsyncStorage.getItem('id_token').then((res) => {
        console.log('Logged out', res);
      });
    });
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View>
          <MapView
            style={styles.map}
            onRegionChange={this.onRegionChange}
            followsUserLocation={true}
            showsUserLocation={true}
            loadingEnabled={true}
          >
            <MapView.Marker
              coordinate={{
                latitude: 34.05,
                longitude: -118.2437
              }}
              title="Title"
              description="Description"
            />
          </MapView>
        </View>
        <View>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onSubmitEditing={(text) => { this.postMessage(text.nativeEvent.text); }}
          />

          <Text style={styles.welcome}>
            Welcome to React Native!
          </Text>
          <Text style={styles.instructions}>
            To get started, edit index.ios.js
          </Text>
          <Button title="Login" onPress={this.login} />
          <Button title="Logout" onPress={this.logout} />
          <Text style={styles.instructions}>
            Press Cmd+R to reload,{'\n'}
            Cmd+D or shake for dev menu{'\n'}
            {this.state.data}
          </Text>
        </View>
      </View>
    );
  }
}


AppRegistry.registerComponent('Scribe', () => Scribe);
