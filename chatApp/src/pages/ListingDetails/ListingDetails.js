'use strict';
import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import NavBar from '../../components/NavBar/NavBar';
import _ from 'lodash';
import ResponsiveImage from 'react-native-responsive-image';
import {resetActiveListing, favoriteListing} from '../../actions/ListingActions';
import {openModal} from '../../actions/ModalActions';
import MapViewPreview from '../../components/MapViewPreview/MapViewPreview.js';
import TimeAvailabilityToggle  from '../../components/TimeToggle/TimeToggle.js';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableHighlight
} from 'react-native';

class ListingDetails extends Component {
  constructor(...args) {
    super(...args);
    this.state = {}
  }

  render() {
    const details = this.props.view;
    const loading = _.get(details, '$isLoading', false);

    const service = _.get(details, 'service', {});
    const skill = _.get(service, 'skill', {});
    const agent = _.get(details, 'agent', {});
    const resource = _.get(details, 'resource', {});

    const isInstructor = _.get(this.props, 'user.details.id', '') === _.get(details, 'instructor.id', null);
    const image = service.image && service.image !== 'test' ? service.image : skill.image;

    return (
       <View style={{marginTop: 0, flex: 1, flexDirection: 'column'}}>
        {
          loading ?
          <View><Text>loading</Text></View> : details.id ?
          <ScrollView style={{marginTop: 60}}>
            <ResponsiveImage source={{uri: image}} initWidth="100%" initHeight="250"/>
            <TouchableHighlight onPress={this.editAvailability.bind(this)} underlayColor='#999'><Text>Edit Availability</Text></TouchableHighlight>
            <Text>{service.service_name}</Text>
            <Image style={{height: 60, width: 60}} source={{uri: `https://graph.facebook.com/${_.get(agent, 'facebook_user_id')}/picture?width=200&height=200`}}/>
            <MapViewPreview disabled={true} />
            <View>
              <Text>{service.name}</Text> 
              <Text>Instructed by</Text> 
              <TouchableHighlight onPress={this.props.goBack.bind(this)} underlayColor='#999'><Text>Back</Text></TouchableHighlight>
              
              {
                !isInstructor ? // CHANGE
                <View>
                  <TouchableHighlight onPress={this.viewAvailability.bind(this)} underlayColor='#999'><Text>Book Now</Text></TouchableHighlight>
                  <TouchableHighlight onPress={this.addSessionForListing.bind(this)} underlayColor='#999'><Text>Add Session For Listing</Text></TouchableHighlight>
                  <TouchableHighlight onPress={this.setAvailability.bind(this)} underlayColor='#999'><Text>Add Session For Listing</Text></TouchableHighlight>
                  <TouchableHighlight onPress={this.favoriteListing.bind(this)} underlayColor='#999'><Text>Favorite Listing</Text></TouchableHighlight>

                </View> : 
                <View>
                  <TouchableHighlight onPress={this.viewAvailability.bind(this)} underlayColor='#999'><Text>Book Now</Text></TouchableHighlight>
                </View>
              }
            </View>
          </ScrollView> : null
        }
        <NavBar rightAction={this.editAvailability.bind(this)} rightActionIcon={"ios-calendar-outline"} title={'Listing Details'} leftAction={this.props.goBack.bind(this)} />
        {
          this.state.toggle ?
          <View style={{flex: 1, position: 'absolute', top: 60, bottom: 0, left: 0, right: 0}}>
            <TimeAvailabilityToggle />
          </View> : null
        }
      </View>
    );
  }

  editAvailability() {
    this.setState({toggle: !this.state.toggle})
  }

  componentWillUnmount() {
    //resetActiveListing()
  }

  favoriteListing() {
    favoriteListing(this.props.view.id)
  }

  viewAvailability() {
    openModal({
      type: 'bookSessionModal', 
    });
  }

  setAvailability() {
    this.props.onNavigation({ type: 'push', key: 'setListingAvailability' })
  }

  addSessionForListing(id) {
    this.props.onNavigation({ type: 'push', key: 'AddSessionForListing' })
  }
}

export default branch(ListingDetails, {
  cursors: {
    view: ['facets','ListingDetails'],
    user: ['user'],
  }
});