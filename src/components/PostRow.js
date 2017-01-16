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
import UpArrowHighlighted from '../media/arrow_up_highlighted.png';
import DownArrowHighlighted from '../media/arrow_down_highlighted.png';
import PostInfo from './PostInfo';
import PostDetails from './PostDetails';
import API from '../util/APIService';

const styles = StyleSheet.create({
  container: {
    marginTop: 1,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    padding: 10,
    backgroundColor: '#fff'
  },
  post: {
    marginTop: 0,
    marginRight: 0,
    marginBottom: 12,
    marginLeft: 0,
    padding: 5,
    backgroundColor: '#fff'
  },
  options: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 0,
    paddingBottom: 5,
    margin: 0
  },
  text: {
    fontSize: 14,
    fontFamily: 'Avenir',
    margin: 0,
    padding: 0
  },
  usernameText: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Avenir',
    fontWeight: '500',
    margin: 0,
    paddingBottom: 0
  },
  timeAgoText: {
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    color: '#bbb',
    margin: 0,
    padding: 0
  },
  statistics: {
    margin: 0
  },
  vote: {
    marginRight: 0
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
      modalVisible: false,
      userVote: props.message.userVote,
      upArrowToggle: UpArrow,
      downArrowToggle: DownArrow
    };

    this.togglePostInfo = this.togglePostInfo.bind(this);
    this.renderPostInfo = this.renderPostInfo.bind(this);
  }

  componentWillMount() {
    this.setState({
      message: this.props.message
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      message: nextProps.message,
      userVote: nextProps.message.userVote
    });
  }

  togglePostInfo() {
    this.setState((prevState) => {
      return {
        modalVisible: !prevState.modalVisible
      };
    }, () => this.props.refreshMessages());
  }

  renderPostInfo() {
    if (this.state.modalVisible) {
      return (
        <PostInfo
          message={this.props.message}
          userVote={this.props.userVote}
          username={this.props.username}
          userAuth={this.props.userAuth}
          login={this.props.login}
          togglePostInfo={this.togglePostInfo}
          refreshMessages={this.props.refreshMessages}
        />
      );
    }
  }

  render() {
    const text = this.state.message.text;
    const createdAt = this.state.message.createdAt;
    const username = this.state.message.UserDisplayName;
    return (
    <View style={styles.container}>
      <View style={styles.post}>
        {this.renderPostInfo()}
        <TouchableOpacity
          onPress={() => {
            this.togglePostInfo();
          }}
        >
          <Text style={styles.usernameText}>{`${username}`}</Text>
          <Text style={styles.text}>{`${text}`}</Text>
        </TouchableOpacity>
      </View>
      <PostDetails
        message={this.state.message}
        userVote={this.state.userVote}
        username={this.props.username}
        userAuth={this.props.userAuth}
        login={this.props.login}
        togglePostInfo={this.togglePostInfo}
      />
    </View>
    );
  }
};
