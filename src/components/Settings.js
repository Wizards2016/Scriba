import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  AsyncStorage,
  ScrollView,
  View,
  StatusBar
} from 'react-native';
import UsernameCreate from './UsernameCreate';
import Analytics from '../util/Analytics';

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
    alignItems: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingTop: 20,
    paddingBottom: 0,
    margin: 0,
    height: 70
  },
  buttonsLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: 60,
    paddingLeft: 20,
    paddingTop: 5,
    height: 20
  },
  buttonsRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: 60,
    height: 20,
    paddingRight: 20,
    paddingTop: 5
  },
});

export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.logout = this.logout.bind(this);
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

  logout() {
    AsyncStorage.removeItem('id_token')
    .then(() => {
      AsyncStorage.getItem('id_token')
      .then(() => {
        this.props.updateUser(null, null);
        this.props.getMessages();
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <StatusBar
            style="zIndex: 0"
            barStyle="light-content"
          />
        </View>
        <View style={styles.options}>
          <View style={styles.title}>
            <Text style={styles.titleText}>{this.props.username ? `${this.props.username}` : 'Welcome'}</Text>
          </View>
        </View>
        <ScrollView style={styles.container}>
          <Text style={styles.welcome}>
            {`${this.props.userAuth === null ? 'Please log in to post messages.' : ''}`}
          </Text>
          { this.state.userStats ?
            <Text>
              {`Welcome, ${this.state.userStats.user.displayName}\n`}
              {`Upvotes: ${this.state.voteStats.upVotes}\n`}
              {`Downvotes: ${this.state.voteStats.downVotes}\n`}
              {`Total posts: ${this.state.postStats.totalPosts}`}
            </Text>
            :
            <Text>
            </Text>
          }
          { this.props.userAuth ?
            <Button title="Logout" onPress={this.logout} />
            :
            <Button title="Login" onPress={this.props.login} />
          }
          <UsernameCreate
            userAuth={this.props.userAuth}
            verifyUsername={this.props.verifyUsername}
            promptUN={this.props.promptUN}
            updateUser={this.props.updateUser}
            updatePromptUN={this.props.updatePromptUN}
          />
        </ScrollView>
      </View>
    );
  }
}
