import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import Icon from 'react-native-vector-icons/Ionicons';
import {addService} from '../../actions/ListingActions';
import moment from 'moment';
import {
  StatusBar,
  StyleSheet,
  Animated,
  LayoutAnimation,
  Text,
  TextInput,
  View,
  Dimensions,
  ListView,
  Image,
  TouchableHighlight,
  Easing
} from 'react-native';


class BecomeAnInstructor extends Component {
  constructor(...args) {
    super(...args);
    this.state = {}
  }


  render() {
    return (
      <View style={{marginTop: 0, flex: 1, flexDirection: 'column'}}>
        <View style={{flex: 1}}>
          <Text>Add Listing</Text>      
          <TouchableHighlight onPress={this.onPress.bind(this)} underlayColor='#99d9f4'>
            <Text>Save</Text>
          </TouchableHighlight>
        </View>

        <NavBar rightAction={this.editAvailability.bind(this)} rightActionIcon={"ios-calendar-outline"} title={'Listing Details'} leftAction={this.props.goBack.bind(this)} />
      </View>
    );
  }


}

export default branch(BecomeAnInstructor, {
  cursors: {
    skills: ['facets', 'Skills'],
    user: ['user']
  }
});