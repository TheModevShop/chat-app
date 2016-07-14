'use strict';
import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import {openChat} from '../../actions/ChatActions';
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



class ListingsList extends Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (_.get(nextProps, 'AllListingsFacet', []).length === _.get(this.props, 'AllListingsFacet', []).length) {
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
    const sessions = _.get(props, 'AllListingsFacet', []);
    if (sessions.length) {
      var ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 != r2
      });
      this.setState({
        dataSource: ds.cloneWithRows(sessions),
      });
    }
  }

  render() {
    return (
      this.state.dataSource ?
         <ListView
          dataSource={this.state.dataSource}
          onScroll={this.props.scrollEvent.bind(this)}
          renderRow={(rowData, i) => {
            return (
              <View key={1}>
                <Swiper height={228}>
                  <TouchableHighlight onPress={this.goToSkillAvailability.bind(this, rowData.skill._id)} underlayColor='#999'>
                    <View>
                       <ResponsiveImage source={{uri: rowData.image}} initWidth="100%" initHeight="250"/>
                       <View style={styles.backgroundImage}>
                          <Text style={styles.text}>{rowData.skill.name}</Text> 
                          <Text style={styles.subtext}>{ellipsize(rowData.description, 60)}</Text> 
                       </View>
                    </View>
                  </TouchableHighlight>
                  <TouchableHighlight onPress={this.goToSkillAvailability.bind(this, rowData.skill._id)} underlayColor='#999'>
                    <View>
                       <ResponsiveImage source={{uri: rowData.image}} initWidth="100%" initHeight="250"/>
                       <View style={styles.backgroundImage}>
                          <Text style={styles.text}>{rowData.name}</Text> 
                          <Text style={styles.subtext}>{ellipsize(rowData.description, 60)}</Text> 
                       </View>
                    </View>
                  </TouchableHighlight>
                </Swiper>
              </View>
            )
          }}        
        />
      : <View style={{margin: 128}}>
      <Text> loading</Text>
    </View>
    );
  }

  goToSkillAvailability(skillId) {
    setListingSkillFilter(skillId);
    this.props.goToSkillAvailability()
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

export default branch(ListingsList, {
  cursors: {
    AllListingsFacet: ['facets','AllListings'],
  }
});