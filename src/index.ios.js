import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  AsyncStorage,
  Navigator
} from 'react-native';
import MapView from 'react-native-maps';
import Auth0Lock from 'react-native-lock';
import Map from './components/Map.js';
import Posts from './components/Posts.js';

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
  }

  componentWillMount() {
    this.getMessages();
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

  render() {
    return (
      <Navigator initialRoute={{index: 0}} renderScene={(route, list) => {
        return (
          route.index === 0 ? 
          <Map onToPosts={() => {
            list.push({index: 1});
          }} /> :
          <Posts backToMap={() => {
            list.pop();
          }}/>
        );
      }} />
    );
  }
}


AppRegistry.registerComponent('Scribe', () => Scribe);
