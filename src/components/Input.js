import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput
} from 'react-native';
import API from '../util/APIService';


const styles = StyleSheet.create({
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    height: 40,
    marginBottom: 49
  }
});

export default class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.postMessage = this.postMessage.bind(this);
  }

  postMessage(text) {
    const data = {
      userAuth: this.props.userAuth,
      displayName: this.props.username,
      text: text,
      latitude: this.props.location.latitude,
      longitude: this.props.location.longitude
    };
    if (data.userAuth && data.displayName) {
      // Clear the text input field
      this._textInput.setNativeProps({ text: '' });
      // Post the message to the database
      API.post.message(data)
        .then(() => {
          this.props.getMessages();
        });
    } else {
      this.props.login();
    }
  }

  render() {
    return (
      <TextInput
        ref={(component) => { this._textInput = component; }}
        style={styles.input}
        onSubmitEditing={(text) => { this.postMessage(text.nativeEvent.text); }}
        placeholder="Type a message"
      />
    );
  }
}
