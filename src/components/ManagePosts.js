import React, { Component } from 'react';
import {
  Modal,
  ScrollView,
  Text,
  StatusBar,
  ListView,
  View,
  StyleSheet
} from 'react-native';
import Button from 'react-native-button';
import API from '../util/APIService';
import PostRow from './PostRow';
import Header from './Header';

const styles = StyleSheet.create({
  centerText: {
    textAlign: 'center'
  },
  container: {
    flex: 1
  }
});

const ds = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1 !== row2
});

export default class ManagePosts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: null,
      dataSource: null
    };
  }

  componentWillMount() {
    this.getUserMessages();
  }

  componentWillReceiveProps() {
    this.getUserMessages();
  }

  getUserMessages() {
    const data = {
      displayName: this.props.username
    };
    // Get messages for this user
    API.get.message(data)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        return [];
      }
    })
    .then((messages) => {
      this.setState({
        messages: messages,
        userAuth: this.props.userAuth,
        dataSource: ds.cloneWithRows(messages)
      });
    })
    .catch(error => console.log('Got an error while fetching messages:', error));
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={true}
        >
          <Header
            title={'Manage Posts'}
          />
          <View style={styles.container}>
          { this.state.dataSource && this.state.dataSource.length > 0 ?
            <ListView
              enableEmptySections={true}
              automaticallyAdjustContentInsets={false}
              dataSource={this.state.dataSource}
              renderRow={data => {
                return (
                <PostRow
                  message={data}
                  static={true}
                  username={this.props.username}
                  userAuth={this.props.userAuth}
                  getMessages={this.props.getMessages}
                />)}}
            />
            :
            <Text style={styles.centerText}>
              You don't have any posts.
            </Text>
          }
          </View>
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
