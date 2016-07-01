'use strict';
import React, { Component } from 'react';
import _ from 'lodash';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Dimensions
} from 'react-native';

class DaysOfTheWeek extends Component {
  render() {
    return (
       <View style={styles.daysWrapper}>
        <View style={styles.days}><Text>h</Text></View>
        <View style={styles.days}><Text>s</Text></View>
        <View style={styles.days}><Text>m</Text></View>
        <View style={styles.days}><Text>t</Text></View>
        <View style={styles.days}><Text>w</Text></View>
        <View style={styles.days}><Text>t</Text></View>
        <View style={styles.days}><Text>f</Text></View>
        <View style={styles.days}><Text>s</Text></View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  daysWrapper: {
    flexDirection: 'row',
    height: 40
  },
  days: {
    width: Dimensions.get('window').width / 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
  
});

export default DaysOfTheWeek;