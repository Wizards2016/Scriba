import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  StatusBar,
  Image
} from 'react-native';
import Analytics from '../util/Analytics';
import Marker from '../media/marker.png';
import UpArrowHighlighted from '../media/arrow_up_highlighted.png';
import DownArrowHighlighted from '../media/arrow_down_highlighted.png';

const styles = StyleSheet.create({
  welcome: {
    textAlign: 'center'
  },
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
  }
});

export default class UsernameCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.username !== undefined &&
        nextProps.userAuth !== undefined &&
        nextProps.username !== this.props.username &&
        nextProps.userAuth !== this.props.userAuth) {
      this.getUserStats(nextProps.username, nextProps.userAuth);
    }
  }

  getUserStats(username, userAuth) {
    new Analytics.UserStats(username, userAuth)
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
        :
        <Text>
        </Text>
      }
      </View>
    );
  }
}
