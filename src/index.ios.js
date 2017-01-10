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
    this.verifyUsername = this.verifyUsername.bind(this);
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

  verifyUsername(userAuth, username) {
    fetch('http://127.0.0.1:8000/users?userAuth=' + userAuth, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(res => {
      let post = true;
      if (this.state.userAuth) {
        if (res.status === 200) {
          console.log(res);
          this.updateUser(userAuth, res.displayName);
          this.updatePromptUN(false);
          post = false;
        } else if (!username) {
          this.updatePromptUN(true);
          post = false;
        }
      } else if (res.status === 200) {
        this.updateUser(userAuth, username);
        post = false;
      }
      if (this.state.userAuth && post || (post && res.status !== 200)) {
        fetch('http://127.0.0.1:8000/users', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userAuth: userAuth,
            displayName: username
          })
        })
        .then(res2 => {
          if (res2.status === 201) {
            this.updateUser(userAuth, username);
            this.updatePromptUN(false);    
          }
        })
        .catch(err => {
          console.log('POST request err: ', err);
        });
      }
    })
    .catch(err => {
      console.log('GET request err: ', err);
      throw err;
    });
  }

  updatePromptUN(value) {
    if (this.state.promptUN !== value) {
      this.setState({
        promptUN: value
      });
    }
  }

  updateUser(userAuth, username) {
    if (this.state.promptUN === userAuth) {
      this.setState({
        username: username
      });
    } else {
      this.setState({
        userAuth: userAuth,
        username: username
      });
    }
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
      let userAuth = profile.userId;
      console.log(userAuth);
      let username = profile.extraInfo.username;
      if(username) {
        this.verifyUsername(userAuth, username);
      } else {
        this.updateUser(userAuth);
        this.verifyUsername(userAuth);
      }
      console.log(this.state);
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
            verifyUsername={this.verifyUsername}
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
            verifyUsername={this.verifyUsername}
          />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}


AppRegistry.registerComponent('Scribe', () => Scribe);
