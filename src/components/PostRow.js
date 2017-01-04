import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import TimeAgo from 'react-native-timeago';

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    marginRight: 12,
    marginBottom: 12,
    marginLeft: 12,
    padding: 5,
    backgroundColor: '#c1d9ff'
  },
  options: {
    backgroundColor: '#e2edff',
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    padding: 2
  },
  text: {
    fontSize: 16
  },
  vote: {
    marginRight: 5
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
        <TouchableOpacity onPress={() => {console.log('Upvoted');}}>
            <Image
              style={{width: 20, height: 20}}
              source={require('../media/arrow_up.png')}
              accessibilityLabel="Up vote"
            />
          </TouchableOpacity>
          <Text style={styles.vote}>2</Text>
          <TouchableOpacity onPress={() => {console.log('Downvoted');}}>
            <Image
              style={{width: 20, height: 20}}
              source={require('../media/arrow_down.png')}
              accessibilityLabel="Down vote"
            />
          </TouchableOpacity>
          <Text style={styles.vote}>0</Text>
        </View>
      </View>
    </View>
  );
};

export default PostRow;
