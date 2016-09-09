import React, { Component, PropTypes } from 'react';
import {branch} from 'baobab-react/higher-order';
import moment from 'moment';
import _ from 'lodash';
import {addTimesToAvailability, addAvailability} from '../../actions/AvailabilityActions'
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Switch
} from 'react-native';

import styles from './time-toggle.js'


class TimeAvailabilityToggle extends Component {
  constructor(...args) {
    super(...args);
    this.state = {}
  }

  render () {
    const hoursAvailable = _.get(this.props, 'availability.selectedTimes');
    const startDay = moment().startOf('day').add(5.5, 'hours');
    const midDay = moment().startOf('day').add(14.5, 'hours');
    const amHours = [];
    const pmHours = [];

    for (var i = 0; i < 18; i++) {
      amHours.push(startDay.add(30, 'minutes').format('H:mm')); // Also looked up when saving
    };

    for (var i = 0; i < 18; i++) {
      pmHours.push(midDay.add(30, 'minutes').format('H:mm')); // Also looked up when saving
    };

    return (
        <View style={{backgroundColor: "#fff", flex: 1}}>
          
            <View>
              <View style={{backgroundColor: '#ccc', flexDirection: "row", flex: 1, alignItems: 'center', justifyContent: 'center', padding: 5, maxHeight: 40}}>
               <Text style={{flex: 1, textAlign: 'center'}}>6:00am - 3:00pm</Text>
               <Text style={{flex: 1, textAlign: 'center'}}>3:00pm - 12:00am</Text>
              </View>
            </View>

            <View style={{flexDirection: "row", flex: 1, alignItems: 'center', justifyContent: 'space-between', padding: 5}}>
             
              <View style={{flex: 1,  borderRightWidth: 1, borderRightColor: '#efefef'}}>
                {                  
                  _.map(amHours, (hour, i) => {
                    const active = _.indexOf(hoursAvailable, hour) > -1;
                    return (
                      <View key={`one-${i}`} style={{flexDirection: "row", flex: 1, alignItems: 'center', justifyContent: 'space-between', height: 60, padding: 10,  borderBottomWidth: 1, borderBottomColor: '#ccc'}}>
                        <Text>{moment(hour, 'H:mm').format('h:mm a')}</Text>
                        <Switch onValueChange={this.toggleTime.bind(null, hour)} value={active} />
                      </View>
                    );
                  })
                 }
              </View>

              <View style={{flex: 1}}>
                {
                  _.map(pmHours, (hour, i) => {
                    const active = _.indexOf(hoursAvailable, hour) > -1;
                    return (
                      <View key={`two-${i}`} style={{flexDirection: "row", flex: 1, alignItems: 'center', justifyContent: 'space-between', height: 60, padding: 10,  borderBottomWidth: 1, borderBottomColor: '#ccc'}}>
                        <Text>{moment(hour, 'H:mm').format('h:mm a')}</Text>
                        <Switch onValueChange={this.toggleTime.bind(null, hour)} value={active} />
                      </View>
                    );
                  })
                 }
              </View>

            </View>

            <TouchableOpacity onPress={this.saveAvailability.bind(this)} style={{backgroundColor: '#ccc', height: 50, width: 300, position: 'absolute', bottom: 0}}>
              <Text>Save Availability</Text>
            </TouchableOpacity>
      
        </View>
    );
  }

  toggleTime(hour) {
    hour = moment(hour, 'h:mm a').format('H:mm');
    addTimesToAvailability(hour);
  }

  saveAvailability() {
    addAvailability();
  }

};



export default branch(TimeAvailabilityToggle, {
  cursors: {
    view: ['facets','CalendarDetails'],
    availability: ['availability']
  }
});
