import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import TimeAgo from 'react-native-timeago';

const styles = StyleSheet.create({
  container: {
    marginLeft: 12,
    marginRight: 12
  },
  options: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap'
  },
  text: {
    fontSize: 16
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  }
});

const PostRow = ({ message }) => {
  const text = message.text;
  const createdAt = message.createdAt;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {`${text}`}
      </Text>
      <View style={styles.options}>
        <TimeAgo time={createdAt} interval={60000}/>
        <View style={styles.buttons}>
          <Image
            style={{width: 20, height: 20}}
            source={require('../media/arrow_up.png')}
          />
          <Image
            style={{width: 20, height: 20}}
            source={require('../media/arrow_down.png')}
          />
        </View>
      </View>
    </View>
  );

}

export default PostRow;
