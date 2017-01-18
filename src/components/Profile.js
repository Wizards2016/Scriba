import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  StatusBar,
  Image
} from 'react-native';
import PostRow from './PostRow';
import PostDetails from './PostDetails';
import Analytics from '../util/Analytics';
import Marker from '../media/marker.png';
import UpArrowHighlighted from '../media/arrow_up_highlighted.png';
import DownArrowHighlighted from '../media/arrow_down_highlighted.png';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
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
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  postsContainer: {
    flex: 1,
    backgroundColor: '#ddd'
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
    } else if (nextProps.username !== undefined &&
        nextProps.username !== this.props.username) {
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
                source={Marker}
                accessibilityLabel="Posts"
              />
              <Text>{`${this.state.postStats.totalPosts}`}</Text>
            </View>
            <Text>{`Member since ${new Date(this.state.userStats.user.createdAt).getFullYear()}`}</Text>
          </View>
          :
          <Text>
          </Text>
        }
        { this.state.voteStats ?
          <View>
            <Text>Popular posts</Text>
            <View style={styles.postsContainer}>
              {
                this.state.voteStats.popular.slice(0, 5).map((message) => {
                  return (<PostRow
                    message={message}
                    static={true}
                  />);
                })
              }
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
