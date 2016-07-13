'use strict';
import React, { Component } from 'react';
import _ from 'lodash';
import {branch} from 'baobab-react/higher-order';

// Components
import DaysOfTheWeek from './components/DaysOfTheWeek';
import HoursInTheDay from './components/HoursInTheDay';
import WeekSelector from './components/WeekSelector';

import moment from 'moment';
import * as Animatable from 'react-native-animatable';
import {makeDays, buildRow} from './components/CalendarUtility';

//Actions
import {buildSessionRequest} from '../../actions/SessionActions';

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
      bottomMargin: false
    }
  }
  componentWillMount() {
    this.setState({hours: buildRow(), month: _.toArray(makeDays(moment(), 0, true))});

  }

  onChangeWeek(week) {
    this.setState({activeWeek: week});
  }


  render() {
    const pannedDays = _.get(this.props, 'listingAvailability.pannedDays');
    return (
       <View style={{marginTop: 0, flex: 1, flexDirection: 'column'}}>
        <WeekSelector activeWeek={this.state.activeWeek} onChangeWeek={this.onChangeWeek.bind(this)} weeks={this.state.month} />
        <DaysOfTheWeek />
        <View style={{marginTop: 0, flex: 1, flexDirection: 'column', position: 'relative', marginBottom: this.state.bottomMargin ? 80 : 0}}>
          <HoursInTheDay 
            pannedDays={pannedDays || []}
            hours={this.state.hours} 
            activeWeek={this.state.activeWeek} 
            week={this.state.month[this.state.activeWeek]} />
        </View>

        {pannedDays ?
        <Animatable.View onAnimationEnd={this.onAnimationEnd.bind(this)} animation={`${pannedDays.length > 2 ? 'bounceInUp' : 'bounceOutDown'}`} duration={1700} style={styles.actionSheet} ref="view">
          <View style={styles.buttonWrapper}>
            <TouchableHighlight onPress={this.cancel.bind(this)} style={styles.button}><Text>Cancel</Text></TouchableHighlight>
            <TouchableHighlight onPress={this.save.bind(this)} style={styles.button}><Text>Save</Text></TouchableHighlight>
          </View>
        </Animatable.View> : null}
        
      </View>
    );
  }

  cancel() {

  }

  save() {
    buildSessionRequest(this.props.listingAvailability, this.props.listingSessions, this.props.listingDetails)
  }

  onAnimationEnd() {
    this.setState({bottomMargin: !this.state.bottomMargin})
  }


  // createSession(form) {
  //   const time = moment();
  //   return {
  //     notes: '',
  //     dateAndTime: time,
  //     date:  moment(time).format('YYYYMMDD'),
  //     time: {
  //       start: '13:00',
  //       end: '18:00'
  //     },      
  //     enrolled: [],
  //     listing: this.props.listingId
  //   }
  // }

}


const styles = StyleSheet.create({
  actionSheet: {
    position: 'absolute',
    bottom: -5,
    right: 0,
    left: 0,
    height: 80,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#000'
  },
  buttonWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 100,
    margin: 10,
    height: 45
  }
});

export default branch(CustomCalendar, {
  cursors: {
    listingDetails: ['facets','ListingDetails'],
    listingSessions: ['facets','ListingSessions'],
    listingAvailability: ['listingAvailability']
  }
});