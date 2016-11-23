'use strict';
import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import Button from '../../Button/Button';
import ResponsiveImage from 'react-native-responsive-image';
import _ from 'lodash';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableHighlight,
  StyleSheet,
  image
} from 'react-native';

import textStyle from '../../../styles/textStyle';
import * as constants from '../../../styles/styleConstants';


class ConfirmBookSession extends Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  handlePress() {
    console.log('Pressed!');
  }

  render() {
    const booking = this.props.booking;
    const data = _.get(booking, 'data', {});
    console.log(booking)
    return (
      <View style={{flex: 1, position: 'relative', alignItems: 'center'}}>
        <Image style={{borderRadius: 50, height: 100, width: 100, marginTop: constants.PADDING_LARGE}} source={{uri: `https://graph.facebook.com/${_.get(booking, 'facebook_user_id')}/picture?width=200&height=200`}}/>
        <View style={{marginTop: 10}}>
          <View style={{paddingHorizontal: constants.PADDING_LARGE}}>
            <Text style={[textStyle.h1, textStyle.bold]}>{data.service_name}</Text>
            <Text style={[textStyle.h3, textStyle.bold]}>with {data.first_name} {data.last_name}</Text>
            <Text>{`${_.get(booking, 'raw_date')} from ${_.get(booking, 'start')} - ${_.get(booking, 'end')}`}</Text>
          </View>
        </View>
        <Button style={{position: 'absolute', bottom: 0, left: -30, right: -30, flex: 1}} cta="Book Now" type="regular"  onPress={() => this.handlePress()}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
 
});

export default branch(ConfirmBookSession, {
  cursors: {}
});