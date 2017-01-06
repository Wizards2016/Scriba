import React, { Component } from 'react';
import {
  Modal,
  Text,
  Button,
  View,
  ScrollView,
  StyleSheet
} from 'react-native';
import MapView from 'react-native-maps';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  modalContent: {
    flex: 1,
    margin: 10,
    marginTop: 20
  },
  map: {
    height: 300
  }
});

export default class PostInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.props.visible}
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
            <Text>{`${this.props.message.text} at location ${this.props.message.latitude}, ${this.props.message.longitude}`}</Text>
            <Button
              title="Return to posts"
              accessibilityLabel="Return to posts"
              onPress={this.props.togglePostInfo}
              color="#841584"
            />

          </View>
         </View>
        </Modal>
      </ScrollView>
    );
  }
}
