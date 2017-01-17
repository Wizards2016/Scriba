import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  AsyncStorage,
  ScrollView,
  View,
  StatusBar,
  Image
} from 'react-native';
import UsernameCreate from './UsernameCreate';
import Profile from './Profile';

const styles = StyleSheet.create({
  welcome: {
    textAlign: 'center'
  },
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
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingTop: 20,
    paddingBottom: 0,
    margin: 0,
    height: 70
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.logout = this.logout.bind(this);
  }

  logout() {
    AsyncStorage.removeItem('id_token')
    .then(() => {
      AsyncStorage.getItem('id_token')
      .then(() => {
        this.props.updateUser(null, null);
        this.props.getMessages();
      });
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
          <View style={styles.title}>
            <Text style={styles.titleText}>{this.props.username ? `${this.props.username}` : 'Welcome'}</Text>
          </View>
        </View>
        <ScrollView style={styles.container}>
          <Text style={styles.welcome}>
            {`${this.props.userAuth === null ? 'Please log in to post messages.' : ''}`}
          </Text>
          <Profile
            userAuth={this.props.userAuth}
            username={this.props.username}
          />
          { this.props.userAuth ?
            <View>
              <Button title="Manage Posts" />
              <Button title="Logout" onPress={this.logout} />
            </View>
            :
            <Button title="Login" onPress={this.props.login} />
          }
          <UsernameCreate
            userAuth={this.props.userAuth}
            verifyUsername={this.props.verifyUsername}
            promptUN={this.props.promptUN}
            updateUser={this.props.updateUser}
            updatePromptUN={this.props.updatePromptUN}
          />
        </ScrollView>
      </View>
    );
  }
}
