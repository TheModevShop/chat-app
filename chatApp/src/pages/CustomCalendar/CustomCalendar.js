'use strict';
import React, { Component } from 'react';
import _ from 'lodash';
import DaysOfTheWeek from './components/DaysOfTheWeek';
// import CalendarMonths from './components/CalendarMonths';
// import CalendarHeader from './components/CalendarHeader';
import moment from 'moment';
import {makeDays} from './components/CalendarUtility';

import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

class CustomCalendar extends Component {

  componentDidMount() {
    console.log(makeDays(moment(), 0, true))
  }

  createMonths(date) {

  }

  

  render() {
    return (
       <View style={{marginTop: 0, flex: 1, flexDirection: 'column'}}>
        <DaysOfTheWeek />
      </View>
    );
  }
}

CustomCalendar.defaultProps = {
  weekOffset: 0,
  date: moment()
};


const styles = StyleSheet.create({
  
});

export default CustomCalendar;