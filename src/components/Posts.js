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
import NavigationBar from 'react-native-navigation-bar';
import UpArrow from '../media/arrow_up.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    marginTop: 0,
    padding: 0,
    zIndex: -1
  },
  text: {
    textAlign: 'center',
    justifyContent: 'center'
  },
  title: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 1,
    color: '#fff',
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
    color: '#fff',
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingTop: 20,
    margin: 0,
    fontSize: 16,
    height: 70
  },
  buttonsLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: 40,
    height: 20
  },
  buttonsRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: 40,
    height: 20
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
            <Text style={styles.titleText}>POSTS</Text>
          </View>
          <View style={styles.buttonsRight}>
            <TouchableOpacity onPress={() => { console.log(':)'); }}>
              <Image
                style={{ width: 20, height: 20 }}
                source={UpArrow}
                accessibilityLabel="Time"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { console.log(':)'); }}>
              <Image
                style={{ width: 20, height: 20 }}
                source={UpArrow}
                accessibilityLabel="Hot"
              />
            </TouchableOpacity>
          </View>
        </View>
          <ScrollView
            style={styles.scrollView}
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
      </View>
    );
  }
}
