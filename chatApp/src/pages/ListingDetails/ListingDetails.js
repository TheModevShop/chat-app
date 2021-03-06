'use strict';
import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import NavBar from '../../components/NavBar/NavBar';
import _ from 'lodash';
import ResponsiveImage from 'react-native-responsive-image';
import {resetActiveListing, favoriteListing} from '../../actions/ListingActions';
import {openModal} from '../../actions/ModalActions';
import MapViewPreview from '../../components/MapViewPreview/MapViewPreview.js';
import {openNewChatWithAgent} from '../../actions/ChatActions';
import Button from '../../components/Button/Button';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableHighlight
} from 'react-native';

import textStyle from '../../styles/textStyle';
import * as constants from '../../styles/styleConstants';

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

    let equipment = _.get(service, 'equipment', []);
    equipment = _.groupBy(equipment, 'provided');


    return (
       <View style={{marginTop: 0, flex: 1, flexDirection: 'column'}}>
        {
          loading ?
          <View><Text>loading</Text></View> : details.id ?
          <ScrollView style={{marginTop: 60}}>
            <ResponsiveImage source={{uri: image}} initWidth="100%" initHeight="250"/>
            <View style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 130,
              height: 150,
              alignItems:'center',
              justifyContent: 'flex-end',
              zIndex: 2
            }}>
              <Image style={{borderRadius: 75, height: 150, width: 150}} source={{uri: `https://graph.facebook.com/${_.get(agent, 'facebook_user_id')}/picture?width=200&height=200`}}/>
            </View>

            <View style={{
                marginTop: 50
              }}>

              <View style={{paddingHorizontal: constants.PADDING_LARGE}}>
                <Text style={[textStyle.h1, textStyle.bold]}>{_.get(service, 'skill.name')}: {service.service_name}</Text>
                <Text style={[textStyle.h3, textStyle.bold]}>with {agent.first_name} {agent.last_name}</Text>
                <Text style={[textStyle.h4 , {marginTop: constants.PADDING_LARGE}]}>{service.service_description}</Text>
              </View>

              {
                _.get(equipment, 'true.length') ?
                <View style={{paddingTop: constants.PADDING_LARGE, paddingHorizontal: constants.PADDING_LARGE}}>
                  <Text style={[textStyle.h4, textStyle.bold]}>Items Provided:</Text>
                  <View>
                    {
                      _.map(equipment.true, (item, i) => {
                        return (
                          <Text key={`${i}-provided`} style={[textStyle.h4]}>• {item.item}</Text>
                        );
                      })
                    }
                  </View>
                </View> : null
              }


              {
                _.get(equipment, 'false.length') ?
                <View style={{paddingTop: constants.PADDING_LARGE, paddingHorizontal: constants.PADDING_LARGE}}>
                  <Text style={[textStyle.h4, textStyle.bold]}>Please Bring:</Text>
                  <View>
                    {
                      _.map(equipment.false, (item, i) => {
                        return (
                          <Text key={`${i}-not-provided`} style={[textStyle.h4]}>• {item.item}</Text>
                        );
                      })
                    }
                  </View>
                </View> : null
              }


              <View style={{marginTop: 50, marginBottom: 50}}>
                <MapViewPreview y={service.y} x={service.x} disabled={true} />
              </View>

              <View>
                
                {
                  isInstructor ? // CHANGE
                  <View>
                    <TouchableHighlight onPress={this.messageAgent.bind(this, agent)} underlayColor='#999'><Text>Message</Text></TouchableHighlight>
                    <TouchableHighlight onPress={this.viewAvailability.bind(this)} underlayColor='#999'><Text>Book Now</Text></TouchableHighlight>
                    <TouchableHighlight onPress={this.addSessionForListing.bind(this)} underlayColor='#999'><Text>Add Session For Listing</Text></TouchableHighlight>
                    <TouchableHighlight onPress={this.setAvailability.bind(this)} underlayColor='#999'><Text>Add Session For Listing</Text></TouchableHighlight>
                    <TouchableHighlight onPress={this.favoriteListing.bind(this)} underlayColor='#999'><Text>Favorite Listing</Text></TouchableHighlight>
                  </View> : null
                }
              </View>
            </View>
          </ScrollView> : null
        }
        <Button cta="Book Session" onPress={this.viewAvailability.bind(this)} />
        <NavBar rightAction={this.editAvailability.bind(this)} rightActionIcon={"ios-calendar-outline"} title={'Listing Details'} leftAction={this.props.goBack.bind(this)} />
      </View>
    );
  }

  editAvailability() {
    this.props.toggleTimeToggle();
  }

  messageAgent(agent) {
    openNewChatWithAgent(agent);
    this.props.onNavigation({ type: 'push', key: 'Chat' })
  }

  favoriteListing() {
    favoriteListing(this.props.view.id)
  }

  viewAvailability() {
    this.props.bookSession();
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