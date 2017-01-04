import React from 'react';
import {
  View,
  Text,
  StyleSheet
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

const Header = () => (
  <View style={styles.container}>
    <Text>
      This is the header
    </Text>
  </View>
);

export default Header;
