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


class AddListing extends Component {
  constructor(...args) {
    super(...args);
  }


  render() {
    return (
       <View style={{flex: 1}}>
        <Text>Add Listing</Text>
        
      </View>
    );
  }

}

export default branch(AddListing, {
  cursors: {
    view: ['addListing'] 
  }
});