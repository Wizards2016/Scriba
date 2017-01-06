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
  KeyboardAvoidingView,
  TabBarIOS
} from 'react-native';
import MapView from 'react-native-maps';
import Input from './Input';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 1
  },
  callout: {
    flex: 1
  }
});

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.updateLocation = this.updateLocation.bind(this);
  }

  watchID: ?number = null;

  componentDidMount(){
    this.getCurrentPosition();
    this.watchID = navigator.geolocation.watchPosition((position) => {
      this.updateLocation(position);
    });
  }

  getCurrentPosition(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.updateLocation(position);
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  updateLocation(position){
    const latitude = position.latitude;
    const longitude = position.longitude;
    this.props.updateLocation({
      latitude: latitude,
      longitude: longitude
    });
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container} automaticallyAdjustContentInsets={false}>
        <MapView id="map-view"
          style={styles.map}
          onRegionChangeComplete={this.updateLocation}
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
              <MapView.Callout width={150} height={40}>
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
        <Input
          getMessages={this.props.getMessages}
          location={this.props.location}
          userAuth={this.props.userAuth}
          login={this.props.login}
          logout={this.props.logout}
        />
      </KeyboardAvoidingView>
    );
  }
}
