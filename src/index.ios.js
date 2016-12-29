import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button
} from 'react-native';
import MapView from 'react-native-maps';

export default class Scribe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "loading"
    };
    this.onRegionChange = this.onRegionChange.bind(this);
  }

  componentWillMount() {
    this.getMessages();
  }

  getMessages() {
    fetch("http://127.0.0.1:8000/messages", {
      method: "GET"
    })
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        data: JSON.stringify(responseData)
      });
    });
  }

  postMessage(text) {
    fetch("http://127.0.0.1:8000/messages", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
      })
    })
    // .then((response: any) => response.json())
    .then((responseData) => {
      this.getMessages();
    });
  }

  sayStuff(stuff) {
    console.log("STUFF " + stuff);
  }


  onRegionChange(region){
    console.log('region: ', region);
    this.setState({region});
  }

  render() {
    return (
      <View>
        <MapView
          style={styles.map}
          onRegionChange={this.onRegionChange}
          followsUserLocation={true}
          showsUserLocation={true}
          loadingEnabled={true}
        />
        <TextInput  style={{height: 40, borderColor: "gray", borderWidth: 1}} onSubmitEditing={(text: any) => this.postMessage( text.nativeEvent.text  )}/>

        <Text style={styles.welcome}>
          Welcome to React Native!sdfasdfasefasef
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{"\n"}
          Cmd+D or shake for dev menu{"\n"}
          {this.state.data}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 400,
    height: 400
  },
});

AppRegistry.registerComponent('Scribe', () => Scribe);
