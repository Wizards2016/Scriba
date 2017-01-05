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
      selectedTab: 'map',
      userId: null
    };

    this.getMessages = this.getMessages.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  getMessages(currentRegion) {
    fetch(`http://127.0.0.1:8000/Messages?latitude=${currentRegion.latitude}&longitude=${currentRegion.longitude}`, {
      method: 'GET'
    })
    .then(response => response.json())
    .then((responseData) => {
      this.setState({
        data: responseData
      });
    });
  }

  updateUser(userId) {
    this.setState({
      userId: userId
    });
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
            getMessages={this.getMessages}
            data={this.state.data}
            userId={this.state.userId}
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
            userId={this.state.userId}
            updateUser={this.updateUser}
          />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}


AppRegistry.registerComponent('Scribe', () => Scribe);
