import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import _ from 'lodash';
import NavBar from '../../components/NavBar/NavBar';
import TimeToggle  from '../../components/TimeToggle/TimeToggle.js';
import {addDayToAvailability} from '../../actions/AvailabilityActions'
import FullTappableRow from '../../components/FullTappableRow/FullTappableRow';
import Button from '../../components/Button/Button';
import SetAvailabilityOverlay from './components/SetAvailabilityOverlay'

import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableHighlight
} from 'react-native';


class ChooseDaysToSetAvailability extends Component {
  constructor(...args) {
    super(...args);
    this.state = {};
    this.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  }

  render() {
    return (
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1, marginTop: 60}}>
        {
          _.map(this.days, (day, i) => {
            const dow = day === 'Sunday' ? 0 : i+1;
            const active = _.indexOf(this.props.selectedDays, dow) > -1;
            return (
              <FullTappableRow key={i} active={active} hideIcon={true} title={day} onPress={this.toggleDay.bind(this, dow)} />
            )
          })
        }
      </ScrollView>
      
      <View style={{flex: 1, position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: '#fff'}}>
        <SetAvailabilityOverlay/>
      </View>

      <NavBar title={'Choose Availability'} />
    </View>
    );
  }
// <Button cta="Contine" onPress={this.constinueToTimes.bind(this)} />
  toggleDay(dow) {
    addDayToAvailability(dow);
  }

  constinueToTimes() {
    this.props.onNavigation({ type: 'push', key: 'ToggleMyAvailability' });
  }

}

let styles = StyleSheet.create({
  itemWrapper: {
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  }
  
});


export default branch(ChooseDaysToSetAvailability, {
  cursors: {
   selectedDays: ['availability', 'selectedDays']
  }
});