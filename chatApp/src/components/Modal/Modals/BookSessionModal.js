'use strict';
import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import _ from 'lodash';
import moment from 'moment';
import CalendarView from '../../Calendar/Calendar';
import {setSessionListingFilter, setSessionDateRange, invalidateListingCache, enrollInSession} from '../../../actions/SessionActions';
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
        <View style={this.state.scroll ? {zIndex: 1} : {zIndex: 3}}>
           <CalendarView onSelectedDay={this.onSelectedDay.bind(this)} events={this.props.availability}/>
        </View>
       <ScrollView scrollEventThrottle={1} style={styles.scrollWrapper} onScroll={this.scrollEvent.bind(this)}>
          {
            _.map(this.props.sessions, (session, i) => {
              return (
                <TouchableHighlight key={i}  onPress={this.bookSession.bind(this, session)} style={{flex: 1}}>
                  <View style={styles.sessionWrapper}>
                   <View style={styles.sessionWrapperImage}>
                    <Image style={{height: 60, width: 60}} source={{uri: `https://graph.facebook.com/${_.get(session, 'listing.instructor.facebookCredentials.userId')}/picture?width=60&height=60`}}/>
                   </View>
                   <View style={styles.sessionWrapperContent}>
                      <Text>{`${_.get(session, 'listing.instructor.name.first')} ${_.get(session, 'listing.instructor.name.last')}`}</Text>
                      <Text>{`${_.get(session, 'time.start')} - ${_.get(session, 'time.end')}`}</Text>
                    </View>
                  </View>
                </TouchableHighlight>
              );
            })
          }
        </ScrollView>
      </View>
    );
  }

  bookSession(session) {
    enrollInSession(session);
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
  scrollWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
    paddingTop: 350
  },
  sessionWrapper: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff'
  },
  sessionWrapperImage: {
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
    sessions: ['facets', 'AllSessionsFacet'],
    listingDetails: ['listingDetails']
  }
});