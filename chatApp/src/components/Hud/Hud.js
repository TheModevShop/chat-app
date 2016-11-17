import React, { Component } from 'react';
import {
  Animated,
  Text,
  View,
  Image,
  ActivityIndicator
} from 'react-native';
import {View as AnimatedView, Text as AnimatedText} from 'react-native-animatable';
import * as constants from '../../styles/styleConstants';

class Hud extends Component {
  render() {
    const {title} = this.props
    return (
      <AnimatedView
        {...this.props}
        animation='fadeIn'
        duration={200}
        style={[constants.APP_FULLSCREEN]}
      >
        <View style={[constants.APP_FULLSCREEN, {justifyContent: 'center', alignItems: 'center'}]} >
          <View style={[constants.APP_FULLSCREEN, {backgroundColor: constants.ALUMINUM, opacity: 0.6, flex: 1}]} />
          <View style={{padding: 24, backgroundColor: constants.ALUMINUM, borderRadius: 8}}>
            <ActivityIndicator />
            <Text style={{marginTop: 8, fontFamily: constants.FONT_REGULAR, fontSize: 20, color: constants.DARKBLUE}}>{title}</Text>
          </View>
        </View>
      </AnimatedView>
    )
  }
}

export default Hud
