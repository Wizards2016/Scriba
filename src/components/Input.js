import React, { Component } from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableHighlight,
  Picker,
  KeyboardAvoidingView,
  StyleSheet
} from 'react-native';
import API from '../util/APIService';

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    let Item = Picker.Item;
    return (
      <TextInput
        ref={(component) => { this._textInput = component; }}
        value={this.props.value}
        style={this.props.style}
        placeholder={this.props.placeholder}
        onChangeText={(text) => {
          console.log(text);
          this.props.updateValue(text);
        }}
        onFocus={this.props.updateBehavior}
      />
    );
  }
}
