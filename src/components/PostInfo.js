import React, { Component } from 'react';
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  ScrollView,
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  modalContent: {
    flex: 1,
    margin: 10,
    marginTop: 20
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
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={styles.modalContent}>
          <View>
            <Text>{`${this.props.message.text} at location ${this.props.message.latitude}, ${this.props.message.longitude}`}</Text>

          </View>
         </View>
        </Modal>
      </ScrollView>
    );
  }
}
