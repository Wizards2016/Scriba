import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput
} from 'react-native';


const styles = StyleSheet.create({
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    height: 40,
    marginBottom: 48
  }
});

export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  postMessage(text) {
    // Clear the text input field
    this._textInput.setNativeProps({ text: '' });

    // Post the message to the database
    fetch('http://127.0.0.1:8000/messages', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: text,
        latitude: this.props.position.latitude,
        longitude: this.props.position.longitude,
        userAuth: this.props.userAuth
      })
    })
    .then(() => {
      this.props.updateMessages();
    });
  }

  render() {
    return (
      <TextInput 
        ref={(component) => { this._textInput = component; }}
        style={styles.input}
        onSubmitEditing={(text) => { this.postMessage( text.nativeEvent.text  ) }}
        placeholder="Type a message"
      />
    );
  }
}
