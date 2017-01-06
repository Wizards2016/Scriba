import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  AsyncStorage,
  ScrollView
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

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login() {
    this.props.lock.show({ closable: true }, (err, profile, token) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(profile, token);
      this.props.updateUser(profile.extraInfo.username);
      AsyncStorage.setItem('id_token', JSON.stringify(token));
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
          {`${this.props.userAuth === null ? 'Please log in to post messages.' : ''}`}
        </Text>
        { this.props.userAuth ?
          <Button title="Logout" onPress={this.logout} />
          :
          <Button title="Login" onPress={this.login} />
        }
      </ScrollView>
    );
  }
}
