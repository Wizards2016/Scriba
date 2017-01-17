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
import Analytics from '../util/Analytics';

const styles = StyleSheet.create({
  welcome: {
    textAlign: 'center'
  },
  container: {
    flex: 1
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.username !== undefined &&
        nextProps.userAuth !== undefined) {
      this.getUserStats(nextProps.username, nextProps.userAuth);
    }
  };

  getUserStats(username, userAuth) {
    new Analytics.UserStats(username, userAuth)
    .then(userStats => this.setState({ userStats: userStats }));
  }

  render() {
    return (
      <ScrollView>
        <Text style={styles.welcome}>
          {`${this.props.userAuth === null ? 'Please log in to post messages.' : ''}`}
        </Text>
        { this.state.userStats ?
          <Text>
            {`Upvotes: ${this.state.userStats.user.upVotes}\n`}
            {`Downvotes: ${this.state.userStats.user.downVotes}`}
          </Text>
          :
          <Text>
            {`Welcome, ${this.props.username}`}
          </Text>
        }
        { this.props.userAuth ?
          <Button title="Logout" onPress={this.logout} />
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
    );
  }
}
