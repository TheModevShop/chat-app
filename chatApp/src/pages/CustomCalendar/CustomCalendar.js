'use strict';
import React, { Component } from 'react';
import _ from 'lodash';
import DaysOfTheWeek from './components/DaysOfTheWeek';
import HoursInTheDay from './components/HoursInTheDay';
import WeekSelector from './components/WeekSelector';
// import CalendarMonths from './components/CalendarMonths';
// import CalendarHeader from './components/CalendarHeader';
import moment from 'moment';
import {makeDays, buildRow} from './components/CalendarUtility';

import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

class CustomCalendar extends Component {
  constructor(...args) {
    super(...args)
    this.state = {
      activeWeek: 0,
    }
  }
  componentWillMount() {
    this.setState({hours: buildRow(), month: _.toArray(makeDays(moment(), 0, true))});

  }

  onChangeWeek(week) {
    this.setState({activeWeek: week});
  }


  render() {
    return (
       <View style={{marginTop: 0, flex: 1, flexDirection: 'column'}}>
        <WeekSelector activeWeek={this.state.activeWeek} onChangeWeek={this.onChangeWeek.bind(this)} weeks={this.state.month} />
        <DaysOfTheWeek />
        <HoursInTheDay hours={this.state.hours} week={this.state.month[this.state.activeWeek]} />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  
});

export default CustomCalendar;