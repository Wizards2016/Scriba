import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import TimeAgo from 'react-native-timeago';
import UpArrow from '../media/arrow_up.png';
import DownArrow from '../media/arrow_down.png';
import PostInfo from './PostInfo';

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

export default class PostRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: props.message,
      modalVisible: false
    };

    this.togglePostInfo = this.togglePostInfo.bind(this);
  }

  togglePostInfo() {
    this.setState((prevState) => {
      return {
        modalVisible: !prevState.modalVisible
      };
    });
  }

  render() {
    const text = this.state.message.text;
    const createdAt = this.state.message.createdAt;
    const username = this.state.message.UserDisplayName;
    return (
      <View style={styles.container}>
        <PostInfo
          visible={this.state.modalVisible}
          message={this.state.message}
          togglePostInfo={this.togglePostInfo}
        />
        <TouchableOpacity onPress={() => {
          this.togglePostInfo();
        }}>
          <Text style={styles.text}>
            {`${username}`}
            {`\n`}
            {`${text}`}
          </Text>
        </TouchableOpacity>
        <View style={styles.options}>
          <TimeAgo time={createdAt} interval={60000} />
          <View style={styles.buttons}>
            <TouchableOpacity onPress={() => { console.log('Upvoted'); }}>
              <Image
                style={{ width: 20, height: 20 }}
                source={UpArrow}
                accessibilityLabel="Up vote"
              />
            </TouchableOpacity>
            <Text style={styles.vote}>2</Text>
            <TouchableOpacity onPress={() => { console.log('Downvoted'); }}>
              <Image
                style={{ width: 20, height: 20 }}
                source={DownArrow}
                accessibilityLabel="Down vote"
              />
            </TouchableOpacity>
            <Text style={styles.vote}>0</Text>
          </View>
        </View>
      </View>
    );
  }

};
