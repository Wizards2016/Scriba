import React, { Component } from 'react';
import {
  Modal,
  ScrollView,
  Text,
  StatusBar,
} from 'react-native';
import Button from 'react-native-button';
import API from '../util/APIService';

export default class ManagePosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: null,
      userAuth: null
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('got some props:', nextProps);
    this.setState({
      userAuth: 'hello'
    }, () => {
      console.log('we did something');
    });
    // const data = {
    //   displayName: nextProps.username
    // };
    // // Get messages for this user
    // API.get.message(data)
    // .then((messages) => {
    //   this.setState({
    //     messages: messages,
    //     userAuth: nextProps.userAuth
    //   }, () => {
    //     console.log('state:', this.state);
    //   });
    // })
    // .catch(error => console.log('Got an error while fetching messages:', error));
  }

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={true}
        >
          <StatusBar
            style="zIndex: 0"
            barStyle="dark-content"
          />
            { this.state.messages ?
              <Text>
                {`${this.state.userAuth} has ${this.state.messages.length} messages`}
              </Text>
              :
              <Text>
                Loading . . .
              </Text>
            }
          <Button
            accessibilityLabel="Return to profile"
            onPress={this.props.toggleManagePosts}
            containerStyle={{
              padding: 10,
              height: 45,
              overflow: 'hidden',
              borderRadius: 4,
              backgroundColor: '#4b89ed',
              margin: 5
            }}
            style={{ color: 'white' }}
            >
            Return to profile
          </Button>
        </Modal>
      </ScrollView>
    );
  }
}
