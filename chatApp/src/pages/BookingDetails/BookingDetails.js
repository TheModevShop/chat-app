'use strict';
import React, { Component } from 'react';
import Button from '../../components/Button/Button';
import {branch} from 'baobab-react/higher-order';
import NavBar from '../../components/NavBar/NavBar';
import _ from 'lodash';
import ResponsiveImage from 'react-native-responsive-image';
import {resetActiveListing, favoriteListing} from '../../actions/ListingActions';
import {openModal} from '../../actions/ModalActions';
import MapViewPreview from '../../components/MapViewPreview/MapViewPreview.js';
import {openNewChatWithAgent} from '../../actions/ChatActions';
import {cancelBooking, dropBooking, completeBooking} from '../../actions/BookingActions';

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

class BookingDetails extends Component {
  constructor(...args) {
    super(...args);
    this.state = {}
  }

  render() {
    const details = this.props.view || {};
    const loading = _.get(details, '$isLoading', false);

    const service = _.get(details, 'service', {});
    const skill = _.get(service, 'skill', {});
    const agent = details;
    const resource = _.get(details, 'resource', {});

    const isInstructor = _.get(this.props, 'user.details.id', '') === _.get(details, 'instructor.id', null);
    const image = details.image && details.image !== 'test' ? details.image : skill.image;

    console.log(this.props)

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
                <Text style={[textStyle.h1, textStyle.bold]}>{service.service_name}</Text>
              </View>
              <MapViewPreview y={service.y} x={service.x} disabled={true} />
              <View>
                <Text>{service.name}</Text> 
                <Text>Instructed by {agent.first_name} {agent.last_name}</Text> 
                
                {
                  !isInstructor ? // CHANGE
                  <View>
                    <Text>Inst action</Text>
                  </View> : 
                  <View>
                     <Text>user action</Text>
                  </View>
                }
              </View>
            </View>
          </ScrollView> : null
        }
        {
          details.booking_status === 'cancelled' ?
          <Button cta="Cancelled" disabled={true} style={{backgroundColor: 'red'}} /> :
          moment().isAfter(moment(details.end)) ?
          <Button cta="Cancel Booking" onPress={this.cancelBooking.bind(this)} /> :
          <Button cta="Complete Booking" onPress={this.completeBooking.bind(this)} />
        }
        <NavBar title={'Booking Details'} leftAction={this.props.goBack.bind(this)} />
      </View>
    );
  }


  messageAgent(agent) {
    openNewChatWithAgent(agent);
    this.props.onNavigation({ type: 'push', key: 'Chat' })
  }

  cancelBooking() {
    cancelBooking(_.get(this.props, 'view.id'));
  }

  dropBooking() {
    dropBooking(_.get(this.props, 'view.id'));
  }

  completeBooking() {
    completeBooking(_.get(this.props, 'view.id'));
  }

}

export default branch(BookingDetails, {
  cursors: {
    view: ['facets','BookingDetails'],
    user: ['user'],
  }
});