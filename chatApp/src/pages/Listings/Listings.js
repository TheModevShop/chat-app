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


class Listings extends Component {
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
        <Text>Listings</Text>
        
      </View>
    );
  }

}

export default branch(Listings, {
  cursors: {
    view: ['listings'] 
  }
});