import React, { Component } from 'react';
import {
  AppRegistry,
  TabBarIOS
} from 'react-native';
import Auth0Lock from 'react-native-lock';
import Map from './components/Map';
import Posts from './components/Posts';
import Settings from './components/Settings';
import Globe from './media/globe_32.png';
import Eye from './media/eye_32.png';
import User from './media/user_32.png';

const lock = new Auth0Lock({
  clientId: 'fluO2A5kqKrUAJ9jc9lUm5DT7Wf5HpBj',
  domain: 'scribemapsapi.auth0.com'
});

export default class Scribe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      location: null,
      selectedTab: 'map',
      userAuth: null,
    };

    this.updateLocation = this.updateLocation.bind(this);
    this.getMessages = this.getMessages.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  getMessages(cb) {
    if (this.state.location.latitude && this.state.location.longitude) {
      fetch(`http://127.0.0.1:8000/Messages?latitude=${this.state.location.latitude}&longitude=${this.state.location.longitude}`, {
          method: 'GET'
        })
        .then(response => response.json())
        .then((responseData) => {
          this.setState({
            data: responseData
          }, () => {
            if (cb) {
              cb();
            }
          });
        });
    }
  }

  updateUser(userAuth) {
    this.setState({
      userAuth: userAuth
    });
  }

  updateLocation(currentRegion) {
    this.setState({
      location: currentRegion
    }, this.getMessages);
  }

  render() {
    return (
      <TabBarIOS
        unselectedTintColor="white"
        tintColor="white"
        unselectedItemTintColor="#000000"
        barTintColor="#186bf2"
      >
        <TabBarIOS.Item
          icon={Globe}
          title="Map"
          selected={this.state.selectedTab === 'map'}
          onPress={() => {
            this.setState({
              selectedTab: 'map'
            });
          }}
        >
          <Map
            location={this.state.location}
            updateLocation={this.updateLocation}
            getMessages={this.getMessages}
            data={this.state.data}
            userAuth={this.state.userAuth}
          />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={Eye}
          title="Posts"
          selected={this.state.selectedTab === 'posts'}
          onPress={() => {
            this.setState({
              selectedTab: 'posts'
            });
          }}
        >
          <Posts
            data={this.state.data}
            location={this.state.location}
            getMessages={this.getMessages}
          />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={User}
          title="Settings"
          selected={this.state.selectedTab === 'settings'}
          onPress={() => {
            this.setState({
              selectedTab: 'settings'
            });
          }}
        >
          <Settings
            lock={lock}
            userAuth={this.state.userAuth}
            updateUser={this.updateUser}
          />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}


AppRegistry.registerComponent('Scribe', () => Scribe);
