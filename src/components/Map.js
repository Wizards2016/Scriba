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
      position: {
        latitude: 0,
        longitude: 0
      }
    };

    this.updatePosition = this.updatePosition.bind(this);
    this.updateMessages = this.updateMessages.bind(this);
  }

  watchID: ?number = null;

  componentDidMount(){
    this.getCurrentPosition();
    this.watchID = navigator.geolocation.watchPosition((position) => {
      this.setState({
        position: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
      }, () => this.updateMessages);
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

  updatePosition(region) {
    this.setState({
      position: {
        latitude: region.latitude,
        longitude: region.longitude
      }
    });
  }

  updateMessages(){
    const latitude = this.state.position.latitude;
    const longitude = this.state.position.longitude;
    this.props.getMessages({
      latitude: latitude,
      longitude: longitude
    });
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container} automaticallyAdjustContentInsets={false}>
        <MapView id="map-view"
          style={styles.map}
          onRegionChange={this.updatePosition}
          onRegionChangeComplete={this.updateMessages}
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
        <Input
          updateMessages={this.updateMessages}
          position={this.state.position}
          userId={this.props.userId}
        />
      </KeyboardAvoidingView>
    );
  }
}
