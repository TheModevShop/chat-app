'use strict';
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {branch} from 'baobab-react/higher-order';
import _ from 'lodash';
import ResponsiveImage from 'react-native-responsive-image';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

class SessionDetails extends Component {
  render() {
    const details = this.props.view;
    const loading = _.get(details, '$isLoading', false) || true;
    return (
       <View style={{marginTop: 0, flex: 1, flexDirection: 'column'}}>
        {
          details.$isLoading ?
          <View><Text>loading</Text></View> : details._id ?
          <View>
            <ResponsiveImage source={{uri: details.image}} initWidth="100%" initHeight="250"/>
            <View>
              <Text>{details.name}</Text> 
              <Text>Instructed by {details.instructor.name.first}</Text> 
            </View>
          </View> : null
        }
      </View>
    );
  }
}

export default branch(SessionDetails, {
  cursors: {
    view: ['facets','SessionDetails']
  }
});