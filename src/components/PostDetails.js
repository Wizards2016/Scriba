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
import Trash from '../media/trash.png';
import API from '../util/APIService';

const styles = StyleSheet.create({
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
  timeAgoText: {
    fontSize: 12,
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    color: '#bbb',
    margin: 0,
    padding: 0
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

export default class PostDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: props.message,
      userVote: props.userVote,
      upArrowToggle: UpArrow,
      downArrowToggle: DownArrow
    };
    this.delayedVote = this.throttle(this.postVote, 1000);
  }

  componentWillMount() {
    this.updateArrow();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      message: nextProps.message,
      userVote: nextProps.message.userVote
    }, () => {
      this.updateArrow();
    });
  }

  updateArrow() {
    if (this.state.userVote) {
      this.setState({
        upArrowToggle: UpArrowHighlighted,
        downArrowToggle: DownArrow
      });
    } else if (this.state.userVote === false) {
      this.setState({
        upArrowToggle: UpArrow,
        downArrowToggle: DownArrowHighlighted
      });
    } else if(this.state.userVote === null){
      this.setState({
        upArrowToggle: UpArrow,
        downArrowToggle: DownArrow
      });
    }
  }

  throttle(func, wait) {
    let wasRecentlyInvoked = false;
    let doAgain = false;
    let timerOn = false;
    return () => {
      const context = this;
      if (!timerOn) {
        timerOn = true;
        setTimeout(() => {
          if (doAgain) {
            func.call(context);
          }
          wasRecentlyInvoked = false;
          doAgain = false;
          timerOn = false;
        }, wait);
      }
      if (!wasRecentlyInvoked) {
        func.call(context);
        wasRecentlyInvoked = true;
      } else if (wasRecentlyInvoked && !doAgain) {
        doAgain = true;
      }
    };
  };

  updateVote(clicked) {
    if (this.props.username && this.props.userAuth) {
      let up = 0;
      let down = 0;
      let newState = {};
      let newMessage = {};

      for(let key in this.state.message) {
        newMessage[key] = this.state.message[key];
      }
      if (clicked === 'up') {
        if (this.state.upArrowToggle === UpArrow) {
          up += 1;
          if (this.state.downArrowToggle === DownArrowHighlighted) {
            down -= 1;
          }
          this.setState({
            upArrowToggle: UpArrowHighlighted,
            downArrowToggle: DownArrow,
            userVote: true
          });
        } else if (this.state.upArrowToggle === UpArrowHighlighted) {
          up -= 1;
          this.setState({
            upArrowToggle: UpArrow,
            downArrowToggle: DownArrow,
            userVote: null
          });
        }
      } else if (clicked === 'down') {
        if (this.state.downArrowToggle === DownArrow) {
          down += 1;
          if (this.state.upArrowToggle === UpArrowHighlighted) {
            up -= 1;
          }
          this.setState({
            upArrowToggle: UpArrow,
            downArrowToggle: DownArrowHighlighted,
            userVote: false
          });
        } else if (this.state.downArrowToggle === DownArrowHighlighted) {
          down -= 1;
          this.setState({
            upArrowToggle: UpArrow,
            downArrowToggle: DownArrow,
            userVote: null
          });
        }
      }
      newMessage.upVotes = this.state.message.upVotes + up;
      newMessage.downVotes = this.state.message.downVotes + down;
      this.setState({
        message: newMessage
      }, () => {
        this.delayedVote();
      });
    } else {
      if(this.props.modalVisible && !this.props.userAuth){
        this.props.togglePostInfo();
        setTimeout(() => this.props.login(), 1000);
      } else {
        this.props.login();
      }
    }
  }

  postVote() {
    const data = {
      vote: this.state.userVote,
      messageId: this.state.message.id,
      userAuth: this.props.userAuth,
      displayName: this.props.username
    };

    data.delete = !!(this.state.userVote === null);

    API.post.vote(data);
  }

  deletePost() {
    const data = {
      delete: true,
      id: this.state.message.id,
      userAuth: this.props.userAuth,
      displayName: this.props.username
    };

    API.post.message(data)
    .then(() => {
      // refresh messages
      this.props.getMessages();
    })
    .catch(() => {
      console.log('error while deleting message');
    });
  }

  render() {
    const createdAt = this.state.message.createdAt;
    const username = this.state.message.UserDisplayName;
    return (
      <View style={styles.options}>
        <TimeAgo style={styles.timeAgoText} time={createdAt} interval={60000} />
        { this.props.static ?
          <View style={styles.buttons}>
            <TouchableOpacity onPress={() => { this.deletePost(); }}>
              <Image
                style={{ width: 20, height: 22 }}
                source={Trash}
                accessibilityLabel="Delete"
              />
            </TouchableOpacity>
            <Image
              style={{ width: 25, height: 25 }}
              source={UpArrowHighlighted}
              accessibilityLabel="Up votes"
            />
            <Text style={styles.vote}>{this.state.message.upVotes}</Text>
            <Image
              style={{ width: 25, height: 25 }}
              source={DownArrowHighlighted}
              accessibilityLabel="Down votes"
            />
            <Text style={styles.vote}>{this.state.message.downVotes}</Text>
          </View>
          :
          <View style={styles.buttons}>
            <TouchableOpacity onPress={() => { this.updateVote('up'); }}>
              <Image
                style={{ width: 20, height: 20 }}
                source={this.state.upArrowToggle}
                accessibilityLabel="Up vote"
              />
            </TouchableOpacity>
            <Text style={styles.vote}>{this.state.message.upVotes}</Text>
            <TouchableOpacity onPress={() => { this.updateVote('down'); }}>
              <Image
                style={{ width: 20, height: 20 }}
                source={this.state.downArrowToggle}
                accessibilityLabel="Down vote"
              />
            </TouchableOpacity>
            <Text style={styles.vote}>{this.state.message.downVotes}</Text>
          </View>
        }
      </View>
    );
  }
};
