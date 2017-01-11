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
      username: this.props.username,
      userAuth: this.props.userAuth,
      userVote: props.message.userVote,
      upArrowToggle: UpArrow,
      downArrowToggle: DownArrow

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

  componentWillMount(){
    this.updateArrow();
  }

  updateArrow(){
    console.log('THIS IS MESSAGE OBJECT', this.state.message)
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

  updateVote(clicked){
    var up = 0;
    var down = 0;
    var newState = {};
    var newMessage = {};
    for(var key in this.state.message){
        newMessage.key = this.state.message.key;
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
        //post vote to db on interval
      } else if(this.state.upArrowToggle === UpArrowHighlighted){
        up -= 1;
        this.setState({
          upArrowToggle: UpArrow,
          downArrowToggle: DownArrow,
          userVote: null
        });
        //post delete vote to db on interval
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

        //post vote to db on interval
      } else if(this.state.downArrowToggle === DownArrowHighlighted){
        down -= 1;
        this.setState({
          upArrowToggle: UpArrow,
          downArrowToggle: DownArrow,
          userVote: null
        });
        //post delete vote to db on interval
      }
    }
    newMessage.upVotes = this.state.message.upVotes + up;
    newMessage.downVotes = this.state.message.downVotes + down;
    this.setState({
      message: newMessage
    });
  }

  postVote(){
    //send vote state
    fetch('http://127.0.0.1:8000/votes', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          vote: this.state.userVote,
          messageId: this.props.message.id,
          userAuth: this.props.userAuth,
          UserDisplayName: this.props.displayName
        })
      })
      .then(() => { this.props.getMessages(); });
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
            <Text style={styles.vote}>0</Text>
          </View>
        </View>
      </View>
    );
  }

};
