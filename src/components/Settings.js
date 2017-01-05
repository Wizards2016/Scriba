import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  AsyncStorage,
  ScrollView,
} from 'react-native';

const styles = StyleSheet.create({
  welcome: {
    textAlign: 'center'
  }
});

export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

  }

  login() {
    this.props.lock.show({}, (err, profile, token) => {
      if (err) {
        console.log(err);
        return;
      }

      this.props.updateUser(profile.userId);
      AsyncStorage.setItem('id_token', JSON.stringify(token))
    });
  }

  logout() {
    AsyncStorage.removeItem('id_token')
    .then(() => {
      AsyncStorage.getItem('id_token')
      .then(() => {
        this.props.updateUser(null);
      });
    });
  }

  render() {
    return (
      <ScrollView>
        <Text style={styles.welcome}>
          {`${this.props.userId === null ? 'Please log in to post messages.' : ''}`}
        </Text>
        { this.props.userId ?
          <Button title="Logout" onPress={this.logout.bind(this)} />
          :
          <Button title="Login" onPress={this.login.bind(this)} />
        }
      </ScrollView>
    );
  }
}
