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
      modalVisible: false,
      // username: this.props.username,
      // userAuth: this.props.userAuth,
      username: "ThomasCruise",
      userAuth: "Thomas Cruise",
      userVote: props.message.userVote,
      upArrowToggle: UpArrow,
      downArrowToggle: DownArrow

    };

    this.togglePostInfo = this.togglePostInfo.bind(this);
    this.delayedVote = this.debounce(this.postVote, 1000);
  }

  togglePostInfo() {
    this.setState((prevState) => {
      return {
        modalVisible: !prevState.modalVisible
      };
    });
  }

  componentWillMount(){
    this.updateArrow();
  }

  updateArrow(){
    if(this.state.userVote){
      this.setState({
        upArrowToggle: UpArrowHighlighted
      });
    } else if(this.state.userVote === false) {
      this.setState({
        downArrowToggle: DownArrowHighlighted
      });
    }
  }

  debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  postVote(){
    //send vote state
    console.log('posting the vote');
    fetch('http://127.0.0.1:8000/votes', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          vote: this.state.userVote,
          messageId: this.state.messageId,
          userAuth: this.state.userAuth,
          displayName: this.state.username
        })
      })
      .then(() => { 
        console.log('gettingmessages')
        this.props.getMessages();
      });
  }

  updateVote(clicked){
    var up = 0;
    var down = 0;
    var newState = {};
    var newMessage = {};
    for(var key in this.state.message){
        newMessage[key] = this.state.message[key];
    }
    if(clicked === 'up'){
      if(this.state.upArrowToggle === UpArrow){
        up += 1;
        if(this.state.downArrowToggle === DownArrowHighlighted){
          down -= 1;
        }
        this.setState({
          upArrowToggle: UpArrowHighlighted,
          downArrowToggle: DownArrow,
          userVote: true
        });
      } else if(this.state.upArrowToggle === UpArrowHighlighted){
        up -= 1;
        this.setState({
          upArrowToggle: UpArrow,
          downArrowToggle: DownArrow,
          userVote: null
        });
      }
    } else if(clicked === 'down') {
      if(this.state.downArrowToggle === DownArrow){
        down += 1;
        if(this.state.upArrowToggle === UpArrowHighlighted){
          up -= 1;
        }
        this.setState({
          upArrowToggle: UpArrow,
          downArrowToggle: DownArrowHighlighted,
          userVote: false
        });
      } else if(this.state.downArrowToggle === DownArrowHighlighted){
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
      this.delayedVote()
    });
  }

  postVote(){
    var remove = null;
    console.log('posting ', this.state.username, this.state.userAuth);
    if(this.state.userVote === null){
      remove = true;
    }
    fetch('http://127.0.0.1:8000/votes', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        vote: this.state.userVote,
        delete: remove,
        messageId: this.state.message.id,
        userAuth: this.state.userAuth,
        displayName: this.state.username
      })
    })
    .then(() => { });
  }

  render() {
    const text = this.state.message.text;
    const createdAt = this.state.message.createdAt;
    const username = this.state.message.UserDisplayName;
    console.log('MESSAGES AGAIN', this.state.message);
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
        </View>
      </View>
    );
  }

};
