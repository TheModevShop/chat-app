'use strict';
import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import _ from 'lodash';
import ResponsiveImage from 'react-native-responsive-image';
import ListingsByInstructorList from './ListingsByInstructorList';
import ListingCalendarView from './ListingCalendarView';

import {resetActiveListing} from '../../actions/ListingActions';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

class SkillAvailability extends Component {
  render() {
    console.log(this.props.sessions)
    return (
       <ScrollableTabView>
        <ListingsByInstructorList listings={this.props.listings} tabLabel="React" goToSessionDetails={this.props.onNavigation.bind(this, {type: 'push', key: 'SkillAvailability'})} scrollEvent={this.scrollEvent.bind(this)} />
        <ListingCalendarView skillAvailability={this.props.skillAvailability} tabLabel="calendar"/>
      </ScrollableTabView>
    );
  }
  scrollEvent() {

  }
}

export default branch(SkillAvailability, {
  cursors: {
    listings: ['facets','AllListings'],
    skillAvailability: ['facets', 'SkillAvailability'],
    sessions: ['facets', 'AllSessionsFacet']
  }
});

//calendar
//instructors