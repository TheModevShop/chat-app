'use strict';
import _ from 'lodash';
import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import * as constants from '../../styles/styleConstants';
import {
  Text,
  View,
  StyleSheet, 
  ActivityIndicator
} from 'react-native';


class Initial extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={[constants.APP_FULLSCREEN, {justifyContent: 'center', alignItems: 'center'}]}>
       <ActivityIndicator />
      </View>
    );
  }
}

export default branch(Initial, {
  cursors: {
    view: ['home']
  }
});