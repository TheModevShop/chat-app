'use strict';
import _ from 'lodash';
import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import {
  Text,
  View,
  StyleSheet, TouchableHighlight
} from 'react-native';



class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{flexDirection: 'Row', flex: 1, height: 50, borderBottomWidth: 1, borderBottomColor: '#ccc'}}>
        <View style={{flex: 1}}>{this.renderLeft.bind(this)}</View>
        <View style={{flex: 2}}>{this.props.title}</View>
        <View style={{flex: 1}}>{this.renderRight.bind(this)}</View>
      </View>
    );
  }
  renderLeft() {
    return (
      <TouchableHighlight onPress={this.props.onLeftButtonPress.bind(this)} style={{flex: 1}}>{this.props.leftButton}</TouchableHighlight>
    )
  }
  renderRight() {}
}

export default branch(Header, {
  cursors: {
    header: ['header']
  }
});