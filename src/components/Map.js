import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  AsyncStorage,
  ScrollView,
  TouchableHighlight,
  KeyboardAvoidingView
} from 'react-native';
import MapView from 'react-native-maps';
import TabBar from './TabBar';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 1
  },
  callout: {
    flex: 1
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    height: 40,
    marginBottom: 48
  }
});

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 'loading',
      userAuth: '',
      position: {
        latitude: 0,
        longitude: 0
      },
      lastPosition: {
        latitude: 0,
        longitude: 0
      },
      region: {

      }
    };

    this.onRegionChange = this.onRegionChange.bind(this);
    this.postMessage = this.postMessage.bind(this);
  }

  watchID: ?number = null;

  componentDidMount(){
    this.getCurrentPosition();
    this.watchID = navigator.geolocation.watchPosition((position) => {
      this.setState({
        lastPosition: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
      });
    });
  }

  getCurrentPosition(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          position: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        });
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  onRegionChangeComplete(){
    var latitude = this.state.region.latitude;
    var longitude = this.state.region.longitude;
    this.props.getMessages({
      latitude: latitude,
      longitude: longitude
    });
  }

  postMessage(text) {
    // Clear the text input field
    this._textInput.setNativeProps({text: ''});

    // Post the message to the database
    fetch('http://127.0.0.1:8000/messages', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: text,
        latitude: this.state.lastPosition.latitude,
        longitude: this.state.lastPosition.longitude,
        userAuth: this.state.userAuth
      })
    })
    .then(() => {
      this.onRegionChangeComplete();
    });
  }

  login() {
    this.props.lock.show({}, (err, profile, token) => {
      if (err) {
        console.log(err);
        return;
      }

      this.setState({userId: profile.userId});
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
      <KeyboardAvoidingView behavior="padding" style={styles.map}>
        <MapView id="map-view"
          style={styles.map}
          onRegionChange={this.onRegionChange}
          onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}
          followsUserLocation={true}
          showsUserLocation={true}
          loadingEnabled={true}
        >
          {this.props.data.map((message, i)=>
            (<MapView.Marker
              key={"markerID"+i}
              coordinate={{
                latitude: message.latitude,
                longitude: message.longitude
              }}
            >
              <MapView.Callout width={40} height={40}>
                <TouchableHighlight
                  style={styles.callout}
                  underlayColor="transparent"
                  onPress={() => console.log('callout was clicked')}
                >
                  <View>
                    <Text>{message.text}</Text>
                  </View>
                </TouchableHighlight>
              </MapView.Callout>
              </MapView.Marker>
            )
          )}
        </MapView>
        <TextInput 
          ref={component => this._textInput = component}
          style={styles.input}
          onSubmitEditing={(text) => this.postMessage( text.nativeEvent.text  )}
          placeholder="Type a message"
        />
      </KeyboardAvoidingView>
    );
  }
}
