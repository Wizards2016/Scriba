import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import Analytics from '../util/Analytics';
import PostsIcon from '../media/posts-icon.png';
import UpArrowHighlighted from '../media/arrow_up_highlighted.png';
import DownArrowHighlighted from '../media/arrow_down_highlighted.png';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userStats: null,
      voteStats: null,
      postStats: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.username === null) {
      this.setState({
        userStats: null,
        voteStats: null,
        postStats: null
      });
    } else if (nextProps.username !== undefined) {
      this.getUserStats(nextProps.username);
    }
  }

  getUserStats(username) {
    new Analytics.UserStats(username)
    .then(userStats => this.setState({
      userStats: userStats,
      voteStats: userStats.getVoteStats(),
      postStats: userStats.getPostStats()
    }));
  }

  render() {
    return (
      <View style={styles.container}>
        { this.state.userStats ?
          <View>
            <Text style={{ textAlign: 'center' }}>
              {`Member since ${new Date(this.state.userStats.user.createdAt).getFullYear()}`}
            </Text>
            <View style={styles.statsContainer}>
              <Image
                style={{ width: 40, height: 40 }}
                source={UpArrowHighlighted}
                accessibilityLabel="Up votes"
              />
              <Text>{`${this.state.voteStats.upVotes}\n`}</Text>
              <Image
                style={{ width: 40, height: 40 }}
                source={DownArrowHighlighted}
                accessibilityLabel="Down votes"
              />
              <Text>{`${this.state.voteStats.downVotes}\n`}</Text>
              <Image
                style={{ width: 40, height: 40 }}
                source={PostsIcon}
                accessibilityLabel="Posts"
              />
              <Text>{`${this.state.postStats.totalPosts}`}</Text>
            </View>
          </View>
          :
          <Text>
          </Text>
        }
      </View>
    );
  }
}
