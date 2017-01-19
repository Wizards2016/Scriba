import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import UpArrow from '../media/arrow_up.png';
import DownArrow from '../media/arrow_down.png';
import PostInfo from './PostInfo';
import PostDetails from './PostDetails';

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
    margin: 0,
    paddingBottom: 0
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
          modalVisible={this.state.modalVisible}
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
      { this.props.static ?
        <View style={styles.post}>
          <Text style={styles.text}>{`${text}`}</Text>
        </View>
        :
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
      }
      { this.props.static ?
        <PostDetails
          message={this.state.message}
          static={this.props.static}
          username={this.props.username}
          userAuth={this.props.userAuth}
          getMessages={this.props.getMessages}
        />
        :
        <PostDetails
          message={this.state.message}
          userVote={this.state.userVote}
          username={this.props.username}
          userAuth={this.props.userAuth}
          login={this.props.login}
          togglePostInfo={this.togglePostInfo}
        />
      }
    </View>
    );
  }
};
