'use strict';
import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import _ from 'lodash';
import moment from 'moment';
import CalendarView from '../../Calendar/Calendar';
import {setSessionListingFilter, setSessionDateRange, invalidateCalendarDayView, enrollInSession} from '../../../actions/SessionActions';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableHighlight,
  StyleSheet,
  Animated,
  PanResponder
} from 'react-native';

class BookSessionModal extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      scroll: false,
      pan: new Animated.ValueXY()
    };

    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: () => {
        this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
        this.state.pan.setValue({x: 0, y: 0});
      },

      onPanResponderMove: (evt, gestureState) => {
          let newdx = gestureState.dx, //DO SOMETHING WITH YOUR VALUES
              newdy = gestureState.dy;
              if (this.state.pan.y._value > -175 && this.state.pan.y._value <= 0) {
                Animated.event([null,{
                    dx: this.state.pan.x,
                    dy: this.state.pan.y
                }])(evt, {dx: newdx, dy: newdy});
              }
      },

      onPanResponderRelease: (e, {vx, vy}) => {
        this.state.pan.flattenOffset();
      }
    });
  }


  render() {
    let { pan } = this.state;
    let [translateX, translateY] = [pan.x, pan.y];
    let ss ={
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      top: 350,
      transform: [{translateX: 0}, {translateY}]
    }
    return (
      <View style={{flex: 1, position: 'relative'}}>
        <View>
          <CalendarView onSelectedDay={this.onSelectedDay.bind(this)} events={this.props.availability}/>
        </View>
        <Animated.View {...this._panResponder.panHandlers} style={ss}>
           <ScrollView scrollEnabled={false} scrollEventThrottle={1} onScroll={this.scrollEvent.bind(this)}>
            <View style={{flex: 1, position: 'relative'}}>
              {
                _.map(this.props.sessions, (booking, i) => {
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
            </View>
          </ScrollView>
        </Animated.View>
      </View>
    );
  }

  bookSession(session) {
    enrollInSession(session);
  }

  onSelectedDay(date) {
    setSessionDateRange(moment(date).format(), moment(date).format());
    setSessionListingFilter(this.props.listingDetails._id);
    invalidateCalendarDayView();
  }

  scrollEvent(e) {
    // Animated.spring(
    //    this.state.scrolled,         // Auto-multiplexed
    //    {toValue: {x: 0, y: -e.nativeEvent.contentOffset.y}} // Back to zero
    //  ).start();

    // if (e.nativeEvent.contentOffset.y > 0.1 && !this.state.scroll) {
    //   console.log('hit on')
    //   this.setState({scroll: true})
    // } else if(this.state.scroll && e.nativeEvent.contentOffset.y <= 0.1) {
    //   console.log('hit off')
    //   this.setState({scroll: false})
    // }
  }
}

const styles = StyleSheet.create({
  scrollWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    top: 350,
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
    sessions: ['facets', 'CalendarAvailabilityForDay'],
    listingDetails: ['listingDetails']
  }
});