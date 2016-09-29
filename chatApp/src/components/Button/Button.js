import React, { Component } from 'react';
import * as constants from '../../styles/styleConstants';
import buttonStyles from '../../styles/buttonStyle';
import {
  Text,
  TouchableHighlight
} from 'react-native';

export default class Button extends Component {
  render() {
    const {
     disabled,
     cta
    } = this.props

    return (
      <TouchableHighlight style={[buttonStyles.bottomButton, disabled ? buttonStyles.buttonDisabled : {}]} onPress={!disabled ? this.props.onPress.bind(this) : () => {}} underlayColor={disabled ? '#ccc' : '#99d9f4'}>
        <Text style={[buttonStyles.buttonText, disabled ? buttonStyles.buttonDisabledText : {}]}>
          {cta}
        </Text>
      </TouchableHighlight>
    )
  }
}
