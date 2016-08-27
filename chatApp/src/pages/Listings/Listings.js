import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import Icon from 'react-native-vector-icons/Ionicons';
import ListingsList from './ListingsList';
import {setActiveListing} from '../../actions/ListingActions';

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
        <ListingsList scrollEvent={this.scrollEvent.bind(this)} goToActiveListing={this.goToActiveListing.bind(this)}/>
      </View>
    );
  }

  goToActiveListing(id) {
    setActiveListing(id);
    this.props.onNavigation({ type: 'push', key: 'SessionDetails' })
  }

  scrollEvent() {

  }

}

export default branch(Listings, {
  cursors: {
    view: ['listings'],
  }
});