'use strict';
import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import ellipsize from 'ellipsize';
import _ from 'lodash';
import sessionItemStyle from '../../styles/sessionItemStyle';
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

var IMAGE_WIDTH = Dimensions.get('window').width;
var IMAGE_HEIGHT = IMAGE_WIDTH / 2;
var PIXEL_RATIO = PixelRatio.get();
var PARALLAX_FACTOR = 0.3;

class ListingsList extends Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (_.get(nextProps, 'listings', []).length === _.get(this.props, 'listings', []).length) {
      return false
    }
    return true;
  }

  componentWillMount() {
    this.registerList(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.registerList(nextProps);
  }

  registerList(props) {
    const listings = _.get(props, 'listings', []);
    if (listings.length) {
      var ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 != r2
      });
      this.setState({
        dataSource: ds.cloneWithRows(listings),
      });
    }
  }

  render() {
    return (
      this.state.dataSource ?
         <ListView
          dataSource={this.state.dataSource}
          onScroll={this.props.scrollEvent.bind(this)}
          renderRow={(listing, i) => {
            return (
              <View key={1}>
                <TouchableHighlight underlayColor='#999' onPress={this.props.goToListingDetails.bind(this, listing.calendarId)}>
                  <View key={i} style={sessionItemStyle.sessionWrapper}>
                   <View style={sessionItemStyle.sessionWrapperImage}>
                    <Image style={{height: 60, width: 60}} source={{uri: `https://graph.facebook.com/${_.get(listing, 'facebookUserId')}/picture?width=60&height=60`}}/>
                   </View>
                   <View style={sessionItemStyle.sessionWrapperContent}>
                      <Text style={{fontFamily: 'Avenir-Black'}}>{`${_.get(listing, 'firstName')} ${_.get(listing, 'lastName')}`}</Text>
                      <Text>{`${_.get(listing, 'servicePrice')}`}</Text>
                    </View>
                  </View>
                </TouchableHighlight>
              </View>
            )
          }}        
        />
      : <View style={{margin: 128}}>
      <Text> loading</Text>
    </View>
    );
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

export default branch(ListingsList, {
  cursors: {
  }
});