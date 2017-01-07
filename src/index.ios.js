import React, { Component } from 'react';
import {
  AppRegistry,
  TabBarIOS,
  AsyncStorage
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
      username: null,
      promptUN: false
    };

    this.updateLocation = this.updateLocation.bind(this);
    this.getMessages = this.getMessages.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.login = this.login.bind(this);
    this.updatePromptUN = this.updatePromptUN.bind(this);
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

  updatePromptUN(value) {
    this.setState({
      promptUN: value
    });
  }

  updateUser(userAuth, username) {
    this.setState({
      userAuth: userAuth,
      username: username
    });
  }

  updateLocation(currentRegion) {
    this.setState({
      location: currentRegion
    }, this.getMessages);
  }

  login() {
    lock.show({ closable: true }, (err, profile, token) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(profile, token);
      let username = profile.extraInfo.username;
      if(username) {
        this.updateUser(profile.userId, username);
      } else {
        this.updatePromptUN(true);
      }
      AsyncStorage.setItem('id_token', JSON.stringify(token));
    });
  }

  render() {
    return (
      <TabBarIOS
        unselectedTintColor="#000000"
        tintColor="#4b89ed"
        unselectedItemTintColor="#000000"
        barTintColor="white"
        translucent={true}
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
            lock={lock}
            location={this.state.location}
            updateLocation={this.updateLocation}
            updateUser={this.updateUser}
            getMessages={this.getMessages}
            data={this.state.data}
            userAuth={this.state.userAuth}
            login={this.login}
            username={this.state.username}
            promptUN={this.state.promptUN}
            updatePromptUN={this.updatePromptUN}
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
          title="Profile"
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
            promptUN={this.state.promptUN}
            updateUser={this.updateUser}
            updatePromptUN={this.updatePromptUN}
            login={this.login}
          />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}


AppRegistry.registerComponent('Scribe', () => Scribe);
