import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import Icon from 'react-native-vector-icons/Ionicons';
import ListingsList from './ListingsList';

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
    console.log(this.props.MyListings)
    return (
       <View style={{flex: 1}}>
        <Text>Listings</Text>
        <ListingsList />
      </View>
    );
  }

}

export default branch(Listings, {
  cursors: {
    view: ['listings'],
    MyListings: ['facets','MyListings'],
  }
});