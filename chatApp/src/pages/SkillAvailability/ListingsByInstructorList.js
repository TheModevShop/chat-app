'use strict';
import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import ellipsize from 'ellipsize';
import _ from 'lodash';
import sessionItemStyle from '../../styles/sessionItemStyle';
import globalStyles from '../../styles/globalStyles';
import * as constants from '../../styles/styleConstants';

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
            console.log(listing)
            return (
              <View style={[styles.wrapper]} key={1}>
                <TouchableHighlight style={[{borderRadius: 5, backgroundColor: '#fff'}, globalStyles.boxShadow]} onPress={this.props.goToListingDetails.bind(this, listing.calendar_id)} underlayColor='#999'>
                  <View>
                    <ResponsiveImage source={{uri: listing.image}} initWidth="100%" initHeight="90"/>
                    <View style={styles.contentWrapper}>
                      <Image style={{height: 60, width: 60}} source={{uri: `https://graph.facebook.com/${_.get(listing, 'facebook_user_id')}/picture?width=200&height=200`}}/>
                      <Text style={{fontFamily: 'Avenir-Black'}}>{`${_.get(listing, 'first_name')} ${_.get(listing, 'last_name')}`}</Text>
                      <Text>{`${_.get(listing, 'service_price')}`}</Text>
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
    paddingLeft: constants.PADDING_SMALL,
    paddingRight: constants.PADDING_SMALL,
    paddingTop: constants.PADDING_SMALL,
  },
  contentWrapper: {
    paddingLeft: constants.PADDING_SMALL,
    paddingRight: constants.PADDING_SMALL,
    paddingTop: constants.PADDING_SMALL,
    paddingBottom: constants.PADDING_SMALL
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
  contentTitle: {
    fontFamily: constants.FONT_BOLD,
  },
  subTitle: {
    color: constants.GRAY
  }
});


export default branch(ListingsList, {
  cursors: {
  }
});