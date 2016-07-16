'use strict';
import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import _ from 'lodash';
import moment from 'moment';
import CalendarView from '../../Calendar/Calendar';
import {setSessionListingFilter, setSessionDateRange, invalidateListingCache} from '../../../actions/SessionActions';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet
} from 'react-native';

class BookSessionModal extends Component {
  constructor(...args) {
    super(...args);
    this.state = {}; 
  }

  render() {
    return (
       <View style={{flex: 1, position: 'relative'}}>
         <CalendarView onSelectedDay={this.onSelectedDay.bind(this)} events={this.props.availability}/>
         <ScrollView scrollEventThrottle={1} style={styles.scrollWrapper} onScroll={this.scrollEvent.bind(this)}>
            {
              _.map(this.props.sessions, (session, i) => {
                return (
                  <View key={i} style={styles.sessionWrapper}>
                   <View style={styles.sessionWrapperImage}>
                    <Image style={{height: 60, width: 60}} source={{uri: `https://graph.facebook.com/${_.get(session, 'listing.instructor.facebookCredentials.userId')}/picture?width=60&height=60`}}/>
                   </View>
                   <View style={styles.sessionWrapperContent}>
                      <Text>{`${_.get(session, 'listing.instructor.name.first')} ${_.get(session, 'listing.instructor.name.last')}`}</Text>
                      <Text>{`${_.get(session, 'time.start')} - ${_.get(session, 'time.end')}`}</Text>
                    </View>
                  </View>
                );
              })
            }
          </ScrollView>
      </View>
    );
  }

  onSelectedDay(date) {
    setSessionDateRange(moment(date).format('YYYYMMDD'), moment(date).format('YYYYMMDD'));
    setSessionListingFilter(this.props.listingDetails._id);
    invalidateListingCache();
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
  container: {
  }
});

export default branch(BookSessionModal, {
  cursors: {
    availability: ['facets', 'ListingSessionsAvailability'],
    sessions: ['facets', 'AllSessionsFacet'],
    listingDetails: ['listingDetails']
  }
});