import React, { Component } from 'react';
import {
  Modal,
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import MapView from 'react-native-maps';
import TimeAgo from 'react-native-timeago';
import Button from 'react-native-button';
import UpArrow from '../media/arrow_up.png';
import DownArrow from '../media/arrow_down.png';
import UpArrowHighlighted from '../media/arrow_up_highlighted.png';
import DownArrowHighlighted from '../media/arrow_down_highlighted.png';
import PostDetails from './PostDetails';

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    margin: 10,
    marginTop: 20
  },
  map: {
    height: 300
  },
  container: {
    marginTop: 12,
    marginBottom: 12,
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
  voteContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  }
});

export default class PostInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: this.props.message,
      userVote: props.userVote,
      upArrowToggle: UpArrow,
      DownArrowToggle: DownArrow
    }

    // this.togglePostInfo = this.togglePostInfo.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      message: nextProps.message,
      userVote: nextProps.message.userVote
    });
  }

  render() {
    const message = this.props.message;

    return (
      <ScrollView style={{ flex: 1 }}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={true}
          >
         <View style={styles.modalContent}>
          <View>
            <MapView
              style={styles.map}
              region={{
                latitude: this.props.message.latitude,
                longitude: this.props.message.longitude,
                latitudeDelta: 0.003,
                longitudeDelta: 0.004
              }}
            >
              <MapView.Marker
                coordinate={{
                  latitude: this.props.message.latitude,
                  longitude: this.props.message.longitude
                }}
              >
              </MapView.Marker>
            </MapView>

            <View style={styles.container}>
              <Text style={styles.text}>
                {`${message.text}`}
              </Text>
              <PostDetails 
                message={this.state.message}
                userVote={this.state.userVote}
                username={this.props.username}
                userAuth={this.props.userAuth}
                login={this.props.login}
                togglePostInfo={this.props.toggleMapPostInfo || this.props.togglePostInfo}
              />
            </View>
          </View>
         </View>
          <Button
            accessibilityLabel="Return to posts"
            onPress={this.props.toggleMapPostInfo || this.props.togglePostInfo}
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
          Return to posts
        </Button>
        </Modal>
      </ScrollView>
    );
  }
}
