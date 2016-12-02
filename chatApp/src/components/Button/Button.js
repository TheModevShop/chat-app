import React, { Component } from 'react';
import * as constants from '../../styles/styleConstants';
import buttonStyles from '../../styles/buttonStyle';
import {
  Text,
  TouchableHighlight,
  ActivityIndicator,
  View
} from 'react-native';

export default class Button extends Component {
  render() {
    const {
     disabled,
     cta,
     type
    } = this.props

    return (
      <TouchableHighlight style={[buttonStyles.bottomButton, disabled ? buttonStyles.buttonDisabled : {}, type === 'regular' ? buttonStyles.regularButton : {}, this.props.style || {}]} onPress={!disabled ? this.props.onPress.bind(this) : () => {}} underlayColor={disabled ? '#ccc' : '#99d9f4'}>
        {
          this.props.loading ?
          <View style={{flex: 1, position: 'relative'}}>
            <ActivityIndicator />
          </View> :
          <Text style={[buttonStyles.buttonText, disabled ? buttonStyles.buttonDisabledText : {}]}>
            {cta}
          </Text>
        }
      </TouchableHighlight>
    )
  }
}
