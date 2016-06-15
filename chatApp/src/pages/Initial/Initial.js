'use strict';
import _ from 'lodash';
import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import { Actions } from 'react-native-router-flux';
import {
  Text,
  View,
  StyleSheet, TouchableHighlight
} from 'react-native';


class Initial extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{margin: 128}}>
       <Text>Loading</Text>
      </View>
    );
  }
}

export default branch(Initial, {
  cursors: {
    view: ['home']
  }
});