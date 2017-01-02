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

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 'loading',
      userId: '',
      position: {
        latitude: 0,
        longitude: 0
      },
      lastPosition: {
        latitude: 0,
        longitude: 0
      }
    };
    this.onRegionChange = this.onRegionChange.bind(this);
  }

  watchID: ?number = null;

  componentDidMount(){
    this.getCurrentPosition();
    this.watchID = navigator.geolocation.watchPosition((position) => {
      this.setState({
        lastPosition:{
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
    // console.log('this is region', region);
    this.setState({ region });
  }

  // getMessages() {
  //   fetch('http://127.0.0.1:8000/messages', {
  //     method: 'GET'
  //   })
  //   .then(response => response.json())
  //   .then((responseData) => {
  //     this.setState({
  //       data: JSON.stringify(responseData)
  //     });
  //   });
  // }

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
      this.props.getMessages();
    });
  }

  login() {
    console.log('whats in props', this.props);
    this.props.lock.show({}, (err, profile, token) => {
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
      <View>
        <MapView id="map-view"
          style={styles.map}
          onRegionChange={this.onRegionChange}
          followsUserLocation={true}
          showsUserLocation={true}
          loadingEnabled={true}
        >
          <MapView.Marker
            coordinate={{
              latitude: this.state.lastPosition.latitude + .0002,
              longitude: this.state.lastPosition.longitude + .0002
            }}
            title="title"
            description="description"
          />
        </MapView>
        <TextInput  style={{height: 40, borderColor: "gray", borderWidth: 1}} onSubmitEditing={(text) => this.postMessage( text.nativeEvent.text  )}/>
        <Button title="View Posts" onPress={this.props.onToPosts} />
        <Button title="Login" onPress={this.login.bind(this)} />
        <Button title="Logout" onPress={this.logout.bind(this)} />
        <Text>{this.props.data}</Text>
      </View> 
    );
  }
}
