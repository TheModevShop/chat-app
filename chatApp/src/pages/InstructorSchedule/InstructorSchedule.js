import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import Icon from 'react-native-vector-icons/Ionicons';
import InstructorBookingList from './InstructorBookingList';
import NavBar from '../../components/NavBar/NavBar';
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
         <View style={{flex: 1, marginTop: 60}}>
          <InstructorBookingList bookings={this.props.bookings} scrollEvent={this.scrollEvent.bind(this)} goToActiveListing={this.goToActiveListing.bind(this)}/>
        </View>
        <NavBar title={'My Bookings'} />
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