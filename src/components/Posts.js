import React from 'react';
import {
  View,
  Button
} from 'react-native';

export default class Posts {
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        {this.props.posts}
        <Button title="Back to Map" onPress={this.props.backToMap} />
      </View>
    );
  }
}
