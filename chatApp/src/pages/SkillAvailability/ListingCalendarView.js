'use strict';
import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import _ from 'lodash';
import Calendar from 'react-native-calendar';
import moment from 'moment';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ListView,
  PixelRatio,
  Image,
  TouchableHighlight
} from 'react-native';


class ListingCalendarView extends Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  
  render() {
    console.log(this.props.skillAvailability)
    return (
    <View>
      <Calendar
        scrollEnabled={false}              // False disables swiping. Default: True
        showControls={true}               // False hides prev/next buttons. Default: False
        titleFormat={'MMMM YYYY'}         // Format for displaying current month. Default: 'MMMM YYYY'
        prevButtonText={'Prev'}           // Text for previous button. Default: 'Prev'
        nextButtonText={'Next'}           // Text for next button. Default: 'Next'
        onDateSelect={(date) => this.onDateSelect(date)} // Callback after date selection
        onTouchPrev={this.onTouchPrev}    // Callback for prev touch event
        onTouchNext={this.onTouchNext}    // Callback for next touch event
        onSwipePrev={this.onSwipePrev}    // Callback for back swipe event
        onSwipeNext={this.onSwipeNext}    // Callback for forward swipe event
        eventDates={this.props.skillAvailability.length ? this.props.skillAvailability : []}       // Optional array of moment() parseable dates that will show an event indicator
        startDate={moment().format()} // The first month that will display. Default: current month
        today={moment().format()}       
        selectedDate={moment().format()}       // Day to be selected
        customStyle={{day: {fontSize: 15, textAlign: 'center'}}} // Customize any pre-defined styles
        weekStart={0} // Day on which week starts 0 - Sunday, 1 - Monday, 2 - Tuesday, etc, Default: 1
       />
    </View>
    );
  }
  onDateSelect(date) {

  }

  onTouchPrev() {

  }
  onTouchNext() {

  }
  onSwipePrev() {

  }
  onSwipeNext() {

  }


}

let styles = StyleSheet.create({
  
});

export default ListingCalendarView