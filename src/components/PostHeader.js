import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#4286f4',
    height: 50,
    marginBottom: 12
  }
});

const Header = (props) => (
  <View style={styles.container}>
    <Button title="Back to Map" onPress={props.backToMap} />
  </View>
);

export default Header;
