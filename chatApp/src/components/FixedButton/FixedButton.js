import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import _ from 'lodash';
import * as constants from '../../styles/styleConstants';


export default class FixedButton extends Component {
  render() {
    const {title} = this.props
    const style = this.props.style || {};
    return (
      <View style={[{position: 'absolute', bottom: 0, left: 0, right: 0, height: 50,}]}>
        <TouchableHighlight onPress={this.props.onPress}>
          <View style={[{backgroundColor: 'red', height: 50, justifyContent: 'center', alignItems: 'center'}, style]}>
            <Text style={{fontFamily: constants.FONT_BOLD, fontSize: 16, color: '#fff'}}>{title}</Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

