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

// import ProfileForm from '../../components/Forms/ProfileForm';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{flex: 1, margin: 20}}>
       <Text>Profile</Text>
       <NavBar title='Payment Methods' />
      </View>
    );
  }
  
  submit() {

  }
}

export default branch(Profile, {
  cursors: {
    user: ['user']
  }
});