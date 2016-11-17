'use strict';
import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import Button from '../../Button/Button';
import _ from 'lodash';
import textStyles from '../../../styles/textStyle';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableHighlight,
  StyleSheet
} from 'react-native';


class CompleteUserProfile extends Component {
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
        <Text style={[textStyles.h2]}>Complete profile</Text>
        <Text style={[textStyles.h3]}>Before creating a class to teach, 
please complete your profile and add a payment method for students to pay you.</Text>

        <Button cta="Complete Profile" type="regular"  onPress={() => this.handlePress()}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});

export default branch(CompleteUserProfile, {
  cursors: {}
});