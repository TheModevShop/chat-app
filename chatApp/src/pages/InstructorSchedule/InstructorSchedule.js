import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import Icon from 'react-native-vector-icons/Ionicons';
import InstructorBookingList from './InstructorBookingList';

import {
  StatusBar,
  StyleSheet,
  Animated,
  LayoutAnimation,
  Text,
  TextInput,
  View,
  Dimensions,
  ListView,
  Image,
  TouchableHighlight,
  Easing
} from 'react-native';


class InstructorSchedule extends Component {
  constructor(...args) {
    super(...args);
  }

  componentWillMount() {
  }

  componentDidUpdate(prevProps, prevState) {
    
  }

  render() {
    return (
       <View style={{flex: 1}}>
        <Text>Bookings</Text>
        <InstructorBookingList scrollEvent={this.scrollEvent.bind(this)} goToActiveListing={this.goToActiveListing.bind(this)}/>
      </View>
    );
  }

  goToActiveListing(id) {
    setActiveListing(id);
    this.props.onNavigation({ type: 'push', key: 'SessionDetails' })
  }

  scrollEvent() {

  }

}

export default branch(InstructorSchedule, {
  cursors: {
    bookings: ['facets', 'MyUpcomingBookings']
  }
});