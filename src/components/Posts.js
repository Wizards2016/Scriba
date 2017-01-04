import React, { Component } from 'react';
import {
  View,
  Button
} from 'react-native';

export default class Posts extends Component {
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        {this.props.posts}
        <Button title="Back to Map" onPress={this.props.backToMap} />
      </View>
    );
  }
}
