import React, { Component } from 'react';
import Prompt from 'react-native-prompt';

export default class UsernameCreate extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Prompt
        title="Enter a username"
        visible={this.props.promptUN}
        placeholder="create a unique username"
        onCancel={() => {
          this.props.updateUser(null, null);
          this.props.updatePromptUN(false);
        }}
        onSubmit={(value) => {
          this.props.verifyUsername(this.props.userAuth, value);
        }}
      />
    );
  }
}
