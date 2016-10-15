import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import _ from 'lodash';
import NavBar from '../../components/NavBar/NavBar';
import TimeToggle  from '../../components/TimeToggle/TimeToggle.js';

import {
  StyleSheet,
  View,
  ScrollView
} from 'react-native';


class ToggleMyAvailability extends Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  render() {
    return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, marginTop: 60}}>
        <TimeToggle />
      </View>
      <NavBar title={'Set Availability'} />
    </View>
    );
  }

}

let styles = StyleSheet.create({
  
  
});


export default branch(ToggleMyAvailability, {
  cursors: {
   
  }
});