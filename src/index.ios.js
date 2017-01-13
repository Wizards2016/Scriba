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
import API from './util/APIService';

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
    const data = {
      latitude: this.state.location.latitude,
      longitude: this.state.location.longitude
    };

    if (data.latitude && data.longitude) {
      API.get.message(data)
        .then(response => response.json())
        .then((JSONresponse) => {
          return this.setState({
            data: JSONresponse
          }, () => {
            if (cb) {
              cb();
            }
          });
        })
        .then(() => {
          if (this.state.userAuth) {
            this.getUserVotes();
          }
        })
        .catch((error) => {
          console.log('error:', error);
        });
    }
  }

  getUserVotes() {
    const messages = this.state.data.slice(0);
    for (let i = 0; i < this.state.data.length; i++) {
      let index = i;
      fetch(`http://127.0.0.1:8000/votes?displayName=${this.state.displayName}&messageId=${this.state.data[i].id}`, {
        method: 'GET'
      })
      .then(response => response.json())
      .then((userVote) => {
        if (userVote) {
          messages[index].userVote = userVote.vote;
        }
      });
    }
    this.setState({
      data: messages
    });
  }

  verifyUsername(userAuth, username) {
    const data = {
      userAuth: userAuth,
      displayName: username
    };

    if (this.state.userAuth) {
      API.get.user(data)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        return res;
      })
      .then((res) => {
        if (res.status === 200) {
          this.updateUser(data.userAuth, res.displayName);
        } else {
          if (!data.displayName) {
            this.updatePromptUN(true);
          } else {
            API.post.user(data)
            .then((res) => {
              if (res.status === 201) {
                this.updateUser(userAuth, username);
                this.updatePromptUN(false);
              }
            })
            .catch((err) => {
              console.log('POST request err: ', err);
              throw err;
            });
          }
        }
      })
      .catch((err, result) => {
        console.log('GET request err: ', err, result);
        throw err;
      });
    } else {
      API.post.user(data)
      .then((res) => {
        this.updateUser(data.userAuth, data.displayName);
      })
      .catch((err) => {
        console.log('POST request err: ', err);
      });
    }
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
      const userAuth = profile.userId;
      const username = profile.extraInfo.username;
      if(username) {
        this.verifyUsername(userAuth, username);
      } else {
        this.updateUser(userAuth);
        this.verifyUsername(userAuth);
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
            username={this.state.username}
            userAuth={this.state.userAuth}
            login={this.login}
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
            getMessages={this.getMessages}
            verifyUsername={this.verifyUsername}
          />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

AppRegistry.registerComponent('Scribe', () => Scribe);
