'use strict';
import React, { Component } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import {branch} from 'baobab-react/higher-order';
import _ from 'lodash';
import ResponsiveImage from 'react-native-responsive-image';
import ListingsByInstructorList from './ListingsByInstructorList';
import ListingCalendarView from './ListingCalendarView';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import * as Animatable from 'react-native-animatable';

//Actions 
import {setActiveListing} from '../../actions/ListingActions';

import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  ScrollView
} from 'react-native';

class SkillAvailability extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calendar: false,
      display: false
    };
  }

  // <TouchableHighlight onPress={() => this.setState({calendar: !this.state.calendar, display: true})}><Text>toggle</Text></TouchableHighlight>
  render() {
    return (
       <View style={{flex: 1, paddingTop: 60}}>
        <ListingsByInstructorList goBack={this.props.goBack} listings={this.props.listings} tabLabel="React" goToListingDetails={this.goToListingDetails.bind(this)} scrollEvent={this.scrollEvent.bind(this)} />
        
        {
          this.state.display ?
          <Animatable.View animation={`${this.state.calendar ? 'bounceInUp' : 'bounceOutDown'}`} duration={700} style={styles.actionSheet}>
            <View style={{}}>
              <ListingCalendarView skillAvailability={this.props.skillAvailability}/>
            </View>
          </Animatable.View> : null
        }
        <NavBar title={'Skill Instructors'} leftAction={this.props.goBack.bind(this)} />
      </View>
    );
  }
  scrollEvent(e, scroll) {
    
  }
 
  goToListingDetails(listingId) {
    setActiveListing(listingId);
    this.props.onNavigation({type: 'push', key: 'ListingDetails'})
  }
}

let styles = StyleSheet.create({
  actionSheet: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#000'
  },
  scrollWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
  },
  sessionWrapperContent: {

  }
});

export default branch(SkillAvailability, {
  cursors: {
    listings: ['facets','AllListings'],
    skillAvailability: ['facets', 'SkillAvailability'],
    sessions: ['facets', 'AllSessionsFacet']
  }
});

//calendar
//instructors

// scrollEvent(e, scroll) {
//     console.log(e.nativeEvent.contentOffset.y)
//     if (e.nativeEvent.contentOffset.y > 0.1 && !this.state.scroll) {
//       console.log('hit on')
//       this.setState({scroll: true})
//     } else if(this.state.scroll && e.nativeEvent.contentOffset.y <= 0.1) {
//       console.log('hit off')
//       this.setState({scroll: false})
//     }
//   }

// <ScrollView scrollEventThrottle={1} style={styles.scrollWrapper} onScroll={this.scrollEvent.bind(this)}>
//           {
//             _.map(this.props.sessions, (session, i) => {
//               return (
//                 <View key={i} style={styles.sessionWrapper}>
//                  <View style={styles.sessionWrapperImage}>
//                   <Image style={{height: 60, width: 60}} source={{uri: `https://graph.facebook.com/${_.get(session, 'listing.instructor.facebookCredentials.userId')}/picture?width=60&height=60`}}/>
//                  </View>
//                  <View style={styles.sessionWrapperContent}>
//                     <Text>{`${_.get(session, 'listing.instructor.name.first')} ${_.get(session, 'listing.instructor.name.last')}`}</Text>
//                     <Text>{`${_.get(session, 'time.start')} - ${_.get(session, 'time.end')}`}</Text>
//                   </View>
//                 </View>
//               );
//             })
//           }
//           </ScrollView>