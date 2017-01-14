import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
  TouchableHighlight,
  KeyboardAvoidingView,
  TabBarIOS
} from 'react-native';
import MapView from 'react-native-maps';
import Prompt from 'react-native-prompt';
import Input from './Input';
import UsernameCreate from './UsernameCreate';
import Happy from '../media/map-happy.png'
import Funny from '../media/map-funny.png'
import Warning from '../media/map-warning.png'
import Nice from '../media/map-nice.png'
import Sad from '../media/map-sad.png'
import Secret from '../media/map-secret.png'
import General from '../media/map-general.png'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
    justifyContent: 'center',
    width: 200,
    overflow: 'hidden'
  },
  titleText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '400'
  },
  options: {
    backgroundColor: '#007aff',
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingTop: 20,
    paddingBottom: 0,
    margin: 0,
    height: 70
  },
  buttonsLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: 60,
    paddingLeft: 20,
    paddingTop: 5,
    height: 20
  },
  buttonsRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: 60,
    height: 20,
    paddingRight: 20,
    paddingTop: 5
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
      <View style={styles.container}>
      <View>
          <StatusBar
            style="zIndex: 0"
            barStyle="light-content"
          />
        </View>
        <View style={styles.options}>
          <View style={styles.buttonsLeft}>
          </View>
          <View style={styles.title}>
            <Text style={styles.titleText}>Nearby</Text>
          </View>
          <View style={styles.buttonsRight}>
          </View>
        </View>
        <KeyboardAvoidingView behavior="padding" style={styles.container} automaticallyAdjustContentInsets={false}>
          <MapView id="map-view"
            style={styles.map}
            onRegionChangeComplete={this.updateLocation}
            followsUserLocation={true}
            showsUserLocation={true}
            loadingEnabled={true}
          >
            {this.props.data.map((message, i)=> {
              var category = General;
              if(message.category === 'Happy'){
                category = Happy;
              } else if(message.category === 'Funny'){
                category = Funny;
              } else if(message.category === 'Nice'){
                category = Nice;
              } else if(message.category === 'Sad'){
                category = Sad;
              } else if(message.category === 'Warning'){
                category = Warning;
              } else if(message.category === 'Secret'){
                category = Secret;
              }
              return (<MapView.Marker
                image={category}
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
              )}
            )}
          </MapView>
          <Input
            lock={this.props.lock}
            getMessages={this.props.getMessages}
            location={this.props.location}
            userAuth={this.props.userAuth}
            login={this.props.login}
            username={this.props.username}
          />
          <UsernameCreate
            userAuth={this.props.userAuth}
            verifyUsername={this.props.verifyUsername}
            promptUN={this.props.promptUN}
            updateUser={this.props.updateUser}
            updatePromptUN={this.props.updatePromptUN}
          />
        </KeyboardAvoidingView>
      </View>
    );
  }
}
