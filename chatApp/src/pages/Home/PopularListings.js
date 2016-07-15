'use strict';
import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import {setListingSkillFilter, setActiveListing} from '../../actions/ListingActions';
import ellipsize from 'ellipsize';
import _ from 'lodash';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ListView,
  PixelRatio,
  Image,
  TouchableHighlight
} from 'react-native';

import ResponsiveImage from 'react-native-responsive-image';
import Swiper from 'react-native-swiper';

var IMAGE_WIDTH = Dimensions.get('window').width;
var IMAGE_HEIGHT = IMAGE_WIDTH / 2;
var PIXEL_RATIO = PixelRatio.get();
var PARALLAX_FACTOR = 0.3;



class PopularListings extends Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  render() {
    return (
      <View key={1}>
        <Swiper height={228}>
          {
            _.map(this.props.popularListings, (listing, i) => {
              return (
                <TouchableHighlight key={`listing-${i}`} onPress={this.goToListing.bind(this, listing._id)} underlayColor='#999'>
                  <View>
                     <ResponsiveImage source={{uri: listing.image}} initWidth="100%" initHeight="250"/>
                     <View style={styles.backgroundImage}>
                        <Text style={styles.text}>{listing.name}</Text> 
                        <Text style={styles.subtext}>{listing.description}</Text> 
                     </View>
                  </View>
                </TouchableHighlight>
              )
            })
          }
        </Swiper>
      </View>
    );
  }

  goToListing(listingId) {
    setListingSkillFilter(listingId);
    this.props.goToListing()
  }

  componentWillUnmount() {
    console.log('unmount 22222')
  }
}

let styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
    position: 'relative'
  },
  backgroundImage: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    height: 250,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 32,
    paddingBottom: 5,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowRadius: 2,
    textShadowOffset: {
      width: 1,
      height: 1
    }
  },
  subtext: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 17,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowRadius: 1,
    textShadowOffset: {
      width: 1,
      height: 1
    }
  }
});

export default PopularListings;