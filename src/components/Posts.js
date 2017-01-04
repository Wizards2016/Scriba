import React, { Component } from 'react';
import {
  StyleSheet,
  ListView
} from 'react-native';
import PostRow from './PostRow';
import Header from './PostHeader';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  }
});

export default class Posts extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });

    this.state = {
      dataSource: ds.cloneWithRows(props.data)
    };
  }
  
  render() {
    return (
      <ListView
        contentContainerStyle={styles.container}
        dataSource={this.state.dataSource}
        renderRow={(data) => <PostRow message={data} />}
        renderHeader={() => <Header backToMap={this.props.backToMap}/>}
      />
    );
  }
}
