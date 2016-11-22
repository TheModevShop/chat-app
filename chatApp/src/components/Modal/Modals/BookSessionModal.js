'use strict';
import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import _ from 'lodash';
import moment from 'moment';
import CalendarView from '../../Calendar/Calendar';
import NavBar from '../../../components/NavBar/NavBar';
import {setSessionListingFilter, setSessionDateRange, invalidateCalendarDayView, bookListingCalendar} from '../../../actions/SessionActions';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

class BookSessionModal extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      scroll: false
    }; 
  }

  render() {
    return (
      <View style={{flex: 1, position: 'relative'}}>
        <View style={{marginTop: 60}}>
          <View style={this.state.scroll ? {zIndex: 1} : {zIndex: 3}}>
             <CalendarView onSelectedDay={this.onSelectedDay.bind(this)} events={this.props.availability}/>
          </View>
         <ScrollView scrollEventThrottle={1} style={styles.scrollWrapper} onScroll={this.scrollEvent.bind(this)}>
            {
              _.map(this.props.calendarTimes, (booking, i) => {
                return (
                  <TouchableHighlight key={i}  onPress={this.bookSession.bind(this, booking)} style={{flex: 1}}>
                    <View style={styles.bookingWrapper}>
                     <View style={styles.bookingWrapperImage}>
                      <Image style={{height: 60, width: 60}} source={{uri: `https://graph.facebook.com/${_.get(booking, 'facebook_user_id')}/picture?width=200&height=200`}}/>
                     </View>
                     <View style={styles.bookingWrapperContent}>
                        <Text>{`${_.get(booking, 'name')}`}</Text>
                        <Text>{`${_.get(booking, 'start')} - ${_.get(booking, 'end')}`}</Text>
                      </View>
                    </View>
                  </TouchableHighlight>
                );
              })
            }
          </ScrollView>
        </View>
        <NavBar leftActionIcon={'ios-close'} title={'Book Session'} leftAction={this.props.goBack.bind(this)} />
      </View>
    );
  }

  bookSession(session) {
    bookListingCalendar(session);
  }

  onSelectedDay(date) {
    setSessionDateRange(moment(date).format(), moment(date).format());
    setSessionListingFilter(this.props.listingDetails._id);
    invalidateCalendarDayView();
  }

  scrollEvent(e) {
    if (e.nativeEvent.contentOffset.y > 0.1 && !this.state.scroll) {
      console.log('hit on')
      this.setState({scroll: true})
    } else if(this.state.scroll && e.nativeEvent.contentOffset.y <= 0.1) {
      console.log('hit off')
      this.setState({scroll: false})
    }
  }
}

const styles = StyleSheet.create({
  scrollWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
    paddingTop: 350,
  },
  bookingWrapper: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: "#fff",
    flex: 1
  },
  bookingWrapperImage: {
    height: 60,
    width: 60,
    marginRight: 10,
    borderRadius: 120,
    overflow: 'hidden'
  }
});

export default branch(BookSessionModal, {
  cursors: {
    availability: ['facets', 'ListingSessionsAvailability'],
    calendarTimes: ['facets', 'CalendarAvailabilityForDay'],
    listingDetails: ['listingDetails']
  }
});