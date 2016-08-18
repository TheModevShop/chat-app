import React, { Component } from 'react';
import * as constants from '../styles/styleConstants';
import {
  Text
} from 'react-native';
import _ from 'lodash'

export default class Ctext extends Component {
  render() {
    const {
      size = 16,
      weight,
      color = constants.COLOR_DARKBLUE,
      style = {}
    } = this.props

    const styles = {
      fontSize: size,
      fontFamily: weight === 'bold' ? constants.FONT_BOLD : weight === 'semibold' ?  constants.FONT_SEMIBOLD : constants.FONT_REGULAR,
      color: color
    };

    return (
      <Text
        numberOfLines={this.props.numberOfLines || 0}
        style={[styles, style]}>{this.props.children}</Text>
    )
  }
}
