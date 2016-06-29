'use strict';
import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import _ from 'lodash';
import ResponsiveImage from 'react-native-responsive-image';
import {resetActiveListing} from '../../actions/ListingActions';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

class ListingDetails extends Component {
  render() {
    const details = this.props.view;
    const loading = _.get(details, '$isLoading', false);
    return (
       <View style={{marginTop: 0, flex: 1, flexDirection: 'column'}}>
        {
          loading ?
          <View><Text>loading</Text></View> : details._id ?
          <View>
            <ResponsiveImage source={{uri: details.image}} initWidth="100%" initHeight="250"/>
            <View>
              <Text>{details.name}</Text> 
              <Text>Instructed by</Text> 
              <TouchableHighlight onPress={this.props.goBack.bind(this)} underlayColor='#999'><Text>Back</Text></TouchableHighlight>
              <TouchableHighlight onPress={this.addSessionForListing.bind(this)} underlayColor='#999'><Text>Add Session For Listing</Text></TouchableHighlight>
            </View>
          </View> : null
        }
      </View>
    );
  }

  componentWillUnmount() {
    //resetActiveListing()
  }

  addSessionForListing(id) {
    this.props.onNavigation({ type: 'push', key: 'AddSessionForListing' })
  }
}

export default branch(ListingDetails, {
  cursors: {
    view: ['facets','ListingDetails']
  }
});