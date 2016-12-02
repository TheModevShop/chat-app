import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import _ from 'lodash';
import TimePicker from '../../../components/TimePicker/TimePicker';
import globalStyles from '../../../styles/globalStyles';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity
} from 'react-native';


class SetAvailabilityOverlay extends Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  render() {
    return (
    <View style={[globalStyles.boxShadow, {flex: 1, backgroundColor: '#F4F4F4', shadowOpacity: 0.3}]}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: '#fff', marginBottom: 20,}}>
        <TouchableOpacity><Text>save</Text></TouchableOpacity>
        <TouchableOpacity><Text>cancel</Text></TouchableOpacity>
      </View>
      
      <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
        <TouchableOpacity style={[styles.toggleSwitch, styles.toggleSwitchLeft]}><Text>available</Text></TouchableOpacity>
        <View style={{maxWidth: 1, width: 1, backgroundColor: '#ccc'}}></View>
        <TouchableOpacity style={[styles.toggleSwitch, styles.toggleSwitchRight]}><Text>busy</Text></TouchableOpacity>
      </View>

      <TimePicker />

    </View>
    );
  }
}

let styles = StyleSheet.create({
  itemWrapper: {
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },

  toggleSwitch: {
    padding: 15,
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center'
  },

  toggleActive: {
    backgroundColor: '#fff'
  },

  toggleSwitchLeft: {
    borderRightWidth: 0,
  },

  toggleSwitchRight: {
    borderLeftWidth: 0,
  }
  
});


export default branch(SetAvailabilityOverlay, {
  cursors: {
   
  }
});