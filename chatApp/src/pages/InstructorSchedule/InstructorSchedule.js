import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import Icon from 'react-native-vector-icons/Ionicons';

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


class InstructorSchedule extends Component {
  constructor(...args) {
    super(...args);
  }

  componentWillMount() {
  }

  componentDidUpdate(prevProps, prevState) {
    
  }

  render() {
    return (
       <View style={{flex: 1}}>
        <Text>Instructor Schedule</Text>
        
      </View>
    );
  }

}

export default branch(InstructorSchedule, {
  cursors: {
    view: ['instructorSchedule'] 
  }
});