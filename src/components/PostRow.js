import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import TimeAgo from 'react-native-timeago';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
});

const PostRow = ({ message }) => {
  const text = message.text;
  const createdAt = message.createdAt;

  return (
    <View>
      <Text style={styles.text}>
        {`${text}`}
      </Text>
      <TimeAgo time={createdAt} interval={60000}/>
    </View>
  );

}

export default PostRow;
