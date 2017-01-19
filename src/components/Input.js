import React, { Component } from 'react';
import {
  TextInput
} from 'react-native';

export default class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
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
