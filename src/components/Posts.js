import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  ListView,
  ScrollView,
  RefreshControl,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import PostRow from './PostRow';
import PostSorting from '../util/PostSorting';
import UpArrow from '../media/arrow_up.png';
import Clock from '../media/clock.png';
import Thumbs from '../media/thumbs.png';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    flex: 1,
    margin: 0,
    marginBottom: 50,
    padding: 0,
    zIndex: -1,
    backgroundColor: '#ddd'
  },
  text: {
    textAlign: 'center',
    justifyContent: 'center'
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
    fontWeight: '400',
    fontFamily: 'Avenir'
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
      sortBy: 'time',
      title: 'Latest',
      refreshing: false
    };
    this.updateRefreshing = this.updateRefreshing.bind(this);
    this.refreshMessages = this.refreshMessages.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(this.state.sortBy === 'time'){
      var title = 'Latest';
      var sortedPosts = PostSorting.sortByTime(nextProps.data);
    } else if(this.state.sortBy === 'votes'){
      var title = 'Popular';
      var sortedPosts = PostSorting.sortByVotes(nextProps.data);
    }
    this.setState({
      dataSource: ds.cloneWithRows(sortedPosts),
      title: title
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
      <View style={styles.container}>
        <View>
          <StatusBar
            style="zIndex: 0"
            barStyle="light-content"
          />
        </View>
        <View style={styles.options}>
          <View style={styles.buttonsLeft}>
          </View>
          <View style={styles.title}>
            <Text style={styles.titleText}>{this.state.title}</Text>
          </View>
          <View style={styles.buttonsRight}>
            <TouchableOpacity onPress={() => { 
              this.setState({sortBy: 'time'}, this.props.getMessages);
            }}>
              <Image
                style={{ width: 20, height: 20, marginRight: 2 }}
                source={Clock}
                accessibilityLabel="Time"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              this.setState({sortBy: 'votes'}, this.props.getMessages); 
            }}>
              <Image
                style={{ width: 20, height: 20, marginLeft: 2 }}
                source={Thumbs}
                accessibilityLabel="Hot"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.container}>
          <ScrollView
            style={styles.scrollView}
            automaticallyAdjustContentInsets={false}
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
                dataSource={this.state.dataSource}
                renderRow={data => {
                  return (
                  <PostRow
                    message={data}
                    username={this.props.username}
                    userAuth={this.props.userAuth}
                    login={this.props.login}
                    getMessages={this.props.getMessages}
                  />)}}
              />
              :
              <Text style={styles.text}>
                There are no visible messages nearby.
              </Text>
            }
          </ScrollView>
        </View>
      </View>
    );
  }
}
