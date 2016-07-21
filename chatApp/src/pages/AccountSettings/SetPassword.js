'use strict';
import _ from 'lodash';
import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  TextInput
} from 'react-native';


// import SetPasswordForm from '../../components/Forms/SetPasswordForm';

class SetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{flex: 1, margin: 20}}>
       <Text>Set Password</Text>
      </View>
    );
  }
  
  submit() {

  }
}

export default branch(SetPassword, {
  cursors: {
    user: ['user']
  }
});