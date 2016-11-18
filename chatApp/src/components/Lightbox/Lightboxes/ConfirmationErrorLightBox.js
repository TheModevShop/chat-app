'use strict';
import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import Button from 'react-native-button';
import _ from 'lodash';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableHighlight,
  StyleSheet
} from 'react-native';


class ConfirmationErrorLightBox extends Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  handlePress() {
    console.log('Pressed!');
  }

  render() {
    return (
      <View style={{flex: 1, position: 'relative', justifyContent: 'center', alignItems: 'center'}}>
        <Button
          containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: '#ccc'}}
          style={{fontSize: 20, color: '#999'}}
          styleDisabled={{color: 'red'}}
          onPress={() => this.handlePress()}>
          Press Me!
        </Button>
      </View>
    );
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
    paddingTop: 350,
  }
});

export default branch(ConfirmationErrorLightBox, {
  cursors: {}
});