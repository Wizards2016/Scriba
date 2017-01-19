import React, { Component } from 'react';
import {
  Modal,
  Text,
  View,
  ScrollView,
  StyleSheet
} from 'react-native';
import MapView from 'react-native-maps';
import Button from 'react-native-button';
import Header from './Header';
import UpArrow from '../media/arrow_up.png';
import DownArrow from '../media/arrow_down.png';
import PostDetails from './PostDetails';
import Happy from '../media/map-happy.png';
import Funny from '../media/map-funny.png';
import Warning from '../media/map-warning.png';
import Nice from '../media/map-nice.png';
import Sad from '../media/map-sad.png';
import Secret from '../media/map-secret.png';
import General from '../media/map-general.png';

const styles = StyleSheet.create({
  modalContent: {
    flex: 1
  },
  map: {
    height: 300
  },
  container: {
    marginTop: 1,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    padding: 10,
    backgroundColor: '#fff'
  },
  post: {
    marginTop: 0,
    marginRight: 0,
    marginBottom: 12,
    marginLeft: 0,
    padding: 5,
    backgroundColor: '#fff'
  },
  text: {
    fontSize: 14,
    fontFamily: 'Avenir',
    margin: 0,
    padding: 0
  },
  usernameText: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Avenir',
    margin: 0,
    paddingBottom: 0
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
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      message: nextProps.message,
      userVote: nextProps.message.userVote
    });
  }

  render() {
    const message = this.props.message;
    const text = this.state.message.text;
    const username = this.state.message.UserDisplayName;
    let category = General;
    if (message.category === 'Happy'){
      category = Happy;
    } else if (message.category === 'Funny'){
      category = Funny;
    } else if (message.category === 'Nice'){
      category = Nice;
    } else if (message.category === 'Sad'){
      category = Sad;
    } else if (message.category === 'Warning'){
      category = Warning;
    } else if (message.category === 'Secret'){
      category = Secret;
    }
    return (
      <ScrollView style={{ flex: 1 }}>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={true}
        >
          <Header
            title={`${message.category || 'General'} post from ${username}`}
          />
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
                  image={category}
                  coordinate={{
                    latitude: this.props.message.latitude,
                    longitude: this.props.message.longitude
                  }}
                >
                </MapView.Marker>
              </MapView>
              <View style={styles.container}>
                <View style={styles.post}>
                  <Text style={styles.usernameText}>{`${this.state.message.UserDisplayName}`}</Text>
                  <Text style={styles.text}>{`${text}`}</Text>
                </View>
                <PostDetails
                  message={this.state.message}
                  userVote={this.state.userVote}
                  username={this.props.username}
                  userAuth={this.props.userAuth}
                  login={this.props.login}
                  togglePostInfo={this.props.toggleMapPostInfo || this.props.togglePostInfo}
                  modalVisible={this.props.modalVisible}
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
