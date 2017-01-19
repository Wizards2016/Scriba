import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  AsyncStorage,
  ScrollView,
  View
} from 'react-native';
import UsernameCreate from './UsernameCreate';
import Profile from './Profile';
import ManagePosts from './ManagePosts';
import Header from './Header';

const styles = StyleSheet.create({
  welcome: {
    textAlign: 'center'
  },
  container: {
    flex: 1
  },
  settingsButtons: {
    marginTop: 1
  }
});

export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      managePosts: false
    };

    this.logout = this.logout.bind(this);
    this.toggleManagePosts = this.toggleManagePosts.bind(this);
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

  toggleManagePosts() {
    this.setState((prevState) => {
      return {
        managePosts: !prevState.managePosts
      };
    });
  }

  renderManagePosts() {
    if (this.state.managePosts) {
      return (
        <ManagePosts
          userAuth={this.props.userAuth}
          username={this.props.username}
          toggleManagePosts={this.toggleManagePosts}
          getMessages={this.props.getMessages}
        />
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          title={this.props.username ? `${this.props.username}` : 'Welcome'}
        />
        {this.renderManagePosts()}
        <ScrollView style={styles.container}>
          <Text style={styles.welcome}>
            {`${this.props.userAuth === null ? 'Please log in to post messages.' : ''}`}
          </Text>
          <Profile
            userAuth={this.props.userAuth}
            username={this.props.username}
          />
          { this.props.userAuth ?
            <View style={styles.settingsButtons}>
              <Button title="Manage Posts" onPress={this.toggleManagePosts}/>
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
