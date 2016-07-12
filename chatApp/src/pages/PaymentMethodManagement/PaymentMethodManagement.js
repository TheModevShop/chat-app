'use strict';
import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import _ from 'lodash';
import ResponsiveImage from 'react-native-responsive-image';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

class PaymentMethodManagement extends Component {
  render() {
    
    return (
       <View style={{marginTop: 0, flex: 1, flexDirection: 'column'}}>
       
      </View>
    );
  }
}

export default branch(PaymentMethodManagement, {
  cursors: {
  }
});