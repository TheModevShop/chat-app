'use strict';
import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import Button from '../../Button/Button';
import ResponsiveImage from 'react-native-responsive-image';
import _ from 'lodash';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableHighlight,
  StyleSheet,
  image
} from 'react-native';

import {bookListingCalendar} from '../../../actions/SessionActions';
import textStyle from '../../../styles/textStyle';
import * as constants from '../../../styles/styleConstants';
import {openHud, closeHud} from '../../../actions/ModalActions';


class BookingNeedsCompletion extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      loading: false
    };
  }

  goToSession() {
    
  }

  render() {
    const bookings = this.props.BookingsThatNeedCompletion;
    const numberOfBookings = _.get(bookings, 'length', 0);
    return (
      <View style={{flex: 1, position: 'relative', alignItems: 'center'}}> 
        <View style={{marginTop: 10}}>
          <View style={{paddingHorizontal: constants.PADDING_LARGE}}>
            <Text style={[textStyle.h1, textStyle.bold]}>you have {numberOfBookings} {numberOfBookings === 1 ? 'booking' : 'bookings'} that need attention</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
 
});

export default branch(BookingNeedsCompletion, {
  cursors: {
    BookingsThatNeedCompletion: ['facets', 'BookingsThatNeedCompletion']
  }
});