import React from 'react';
import {
  Text,
  StatusBar,
  View,
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  title: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
    justifyContent: 'center',
    width: 200,
    overflow: 'hidden'
  },
  titleText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '400'
  },
  options: {
    backgroundColor: '#007aff',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingTop: 20,
    paddingBottom: 0,
    margin: 0,
    height: 70
  }
});

const Header = ({ title }) => {
  return (
    <View>
      <View>
        <StatusBar
          style="zIndex: 0"
          barStyle="light-content"
        />
      </View>
      <View style={styles.options}>
        <View style={styles.title}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
      </View>
    </View>
  );
};

export default Header;
