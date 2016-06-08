'use strict';
import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import { Actions } from 'react-native-router-flux';
import {openChat} from '../../actions/ChatActions';
import _ from 'lodash';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ListView,
  PixelRatio,
  Image
} from 'react-native';

import ResponsiveImage from 'react-native-responsive-image';

var IMAGE_WIDTH = Dimensions.get('window').width;
var IMAGE_HEIGHT = IMAGE_WIDTH / 2;
var PIXEL_RATIO = PixelRatio.get();
var PARALLAX_FACTOR = 0.3;

var IMAGE_URI_PREFIX = 'http://loremflickr.com/' + (IMAGE_WIDTH * PIXEL_RATIO) + '/' + Math.round(IMAGE_HEIGHT * (1 + PARALLAX_FACTOR * 2) * PIXEL_RATIO) + '/'


class Home extends Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  componentWillMount() {
    this.registerList(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.registerList(nextProps);
  }

  registerList(props) {
    const users = _.get(props, 'AllConversations', []);
    if (users.length) {
      var ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 != r2
      });
      this.setState({
        dataSource: ds.cloneWithRows(users),
      });
    }
  }

  render() {
    const goToPageTwo = () => Actions.conversations({text: 'Hello World!'});
    return (
      this.state.dataSource ?
       <ListView
        style={{marginTop: 60}}
        dataSource={this.state.dataSource}
        renderRow={(rowData) => {
          return (
            <View>
               <ResponsiveImage source={{uri: IMAGE_URI_PREFIX}} initWidth="100%" initHeight="250"/>
               <Text style={styles.backgroundImage}>Text 1</Text>
            </View>
          )
        }}        
      /> : <View style={{margin: 128}}>
      <Text> loading</Text>
    </View>
    );
  }

  goToChat(conversation) {
    openChat(conversation);
    Actions.conversations({text: 'Hello World!'})
  }
}

let styles = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});

export default branch(Home, {
  cursors: {
    view: ['home'],
    AllConversations: ['facets','AllConversations'],
    users: ['facets', 'Users']
  }
});