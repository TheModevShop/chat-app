import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import _ from 'lodash';
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
  render () {
    const hoursAvailable = _.get(this.props, 'hoursAvailable');
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
        <View>
          
            <View>
              <View>6:00am - 3:00pm</View>
              <View>3:00pm - 12:00am</View>
            </View>

            <View>
              <View>
                {                  
                  _.map(amHours, (hour, i) => {
                    const active = !!_.find(hoursAvailable, {time: {start: hour}});
                    return (
                      <View>
                        <View>{moment(hour, 'H:mm').format('h:mm a')}</View>
                        <Switch onValueChange={this.toggleTime.bind(null, hour)} value={active} />
                      </View>
                    );
                  })
                 }
              </View>



              <View className="pm-hours">
                {
                  _.map(pmHours, (hour, i) => {
                    const active = !!_.find(hoursAvailable, {time: {start: hour}});
                    return (
                      <View>
                        <View>{moment(hour, 'H:mm').format('h:mm a')}</View>
                        <Switch onValueChange={this.toggleTime.bind(null, hour)} value={active} />
                      </View>
                    );
                  })
                 }
              </View>
            </View>
      
        </View>
    );
  },

  toggleTime(hour) {
    hour = moment(hour, 'h:mm a').format('H:mm');
    addTimeToAvailability(hour);
  }

});



export default branch(TimeAvailabilityToggle, {
  cursors: {
    view: ['facets','CalendarDetails']
  }
});
