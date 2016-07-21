import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  View
} from 'react-native';
import _ from 'lodash'
import Icon from 'react-native-vector-icons/Ionicons';

import * as styleConstants from '../../styles/styleConstants';

const {height: deviceHeight, width: deviceWidth} = Dimensions.get('window');

export default class NavBar extends Component {
  render() {
    const {title} = this.props
    return (
      <View style={{position: 'absolute', top: 0, right:0, left: 0}}>
        <View style={{height: 20, backgroundColor: '#fff'}}></View>
        <View style={[styles.navBar]}>
          <Text style={[styles.navBarTitle, {flex: 1, textAlign: 'center'}]}>{title}</Text>
          {
            this.props.leftAction ?
            this.leftAction() : null
          }
        </View>
      </View>
    )
  }
  leftAction() {
    const {leftAction} = this.props
    return (
      <TouchableOpacity onPress={leftAction} style={{position: 'absolute', left: 16, top: 0, bottom: 0}}>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 45}}>
          <Icon name={this.props.leftActionIcon || 'ios-arrow-back'} size={25} color="#999" />
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  navBar: {
    height: 45,
    backgroundColor: '#fff',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  navBarTitle: {
    fontFamily: styleConstants.SEMIBOLD,
    fontSize: 17,
    color: styleConstants.DARKBLUE
    // flex: 1
  }
})
