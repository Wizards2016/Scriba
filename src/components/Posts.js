import React, { Component } from 'react';
import {
  StyleSheet,
  ListView,
  ScrollView,
  RefreshControl,
  Text
} from 'react-native';
import PostRow from './PostRow';
import PostSorting from '../util/PostSorting';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  text: {
    textAlign: 'center'
  }
});

const ds = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1 !== row2
});

export default class Posts extends Component {
  constructor(props) {
    super(props);

    // Sort posts by time
    const sortedPosts = PostSorting.sortByTime(props.data);

    this.state = {
      dataSource: ds.cloneWithRows(sortedPosts),
      refreshing: false
    };

    this.updateRefreshing = this.updateRefreshing.bind(this);
    this.refreshMessages = this.refreshMessages.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const sortedPosts = PostSorting.sortByTime(nextProps.data);

    this.setState({
      dataSource: ds.cloneWithRows(sortedPosts)
    });
  }

  refreshMessages() {
    this.setState({ refreshing: true });
    this.props.getMessages(this.updateRefreshing);
  }

  updateRefreshing() {
    this.setState({
      refreshing: false
    });
  }

  render() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.refreshMessages}
          />
        }
      >

        { this.props.data.length > 0 ?
          <ListView
            enableEmptySections={true}
            automaticallyAdjustContentInsets={false}
            contentContainerStyle={styles.container}
            dataSource={this.state.dataSource}
            renderRow={data => 
              <PostRow 
                message={data}
                username={this.props.username}
                userAuth={this.props.userAuth}
                login={this.props.login} 
              />}
          />
          :
          <Text style={styles.text}>
            There are no visible messages nearby.
          </Text>
        }
      </ScrollView>
    );
  }
}
