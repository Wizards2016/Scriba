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

    this.logout = this.logout.bind(this);
  }

  logout() {
    AsyncStorage.removeItem('id_token')
    .then(() => {
      AsyncStorage.getItem('id_token')
      .then(() => {
        this.props.updateUser(null, null);
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
          <Button title="Login" onPress={this.props.login} />
        }
      </ScrollView>
    );
  }
}
