'use strict';
import _ from 'lodash';
import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  TextInput
} from 'react-native';

import AddPaymentMethod from './AddPaymentMethod';


class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const userId = _.get(this.props.user, 'details.facebookCredentials.userId');
    return (
      <View style={{flex: 1, margin: 0}}> 
        <View style={{height: 150, backgroundColor: '#ccc', alignItems: 'center', justifyContent: 'center'}}>
          <View style={{overflow: 'hidden', position: 'relative', borderWidth: 3, borderColor: '#fff', borderRadius: 100, backgroundColor: '#999', height: 90, width: 90}}>
          <Image style={{height: 90, width: 90, position: 'absolute'}} source={{uri: `https://graph.facebook.com/${userId}/picture?width=100&height=100`}}/>
          </View>
        </View>
        <View style={{flex: 1}}>
         <AddPaymentMethod />
        </View>

        
      </View>
    );
  }
}

export default branch(Settings, {
   cursors: {
    user: ['user']
  }
});