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

  }

  render() {
    let Item = Picker.Item;
    return (
      <TextInput
        multiline={this.props.multiline}
        value={this.props.value}
        style={this.props.style}
        placeholder={this.props.placeholder}
        onChangeText={(text) => {
          this.props.updateValue(text);
        }}
        onFocus={this.props.focus}
      />
    );
  }
}
