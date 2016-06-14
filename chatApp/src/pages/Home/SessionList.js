'use strict';
import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import { Actions } from 'react-native-router-flux';
import {openChat} from '../../actions/ChatActions';
import {setActiveSession} from '../../actions/SessionActions';
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

var IMAGE_WIDTH = Dimensions.get('window').width;
var IMAGE_HEIGHT = IMAGE_WIDTH / 2;
var PIXEL_RATIO = PixelRatio.get();
var PARALLAX_FACTOR = 0.3;

// var images = ['http://images.unsplash.com/photo-1453733190371-0a9bedd82893?format=auto&auto=compress&dpr=2&crop=entropy&fit=crop&w=1266&h=950&q=80',
// 'http://images.unsplash.com/photo-1431068799455-80bae0caf685?format=auto&auto=compress&dpr=2&crop=entropy&fit=crop&w=1266&h=844&q=80',
// 'http://images.unsplash.com/photo-1416339442236-8ceb164046f8?format=auto&auto=compress&dpr=2&crop=entropy&fit=crop&w=1266&h=915&q=80',
// 'http://images.unsplash.com/photo-1452457750107-cd084dce177d?format=auto&auto=compress&dpr=2&crop=entropy&fit=crop&w=1266&h=917&q=80',
// 'http://images.unsplash.com/photo-1453806839674-d1a9087ca1ed?format=auto&auto=compress&dpr=2&crop=entropy&fit=crop&w=1266&h=844&q=80']



class Home extends Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (_.get(nextProps, 'AllSessionsFacet', []).length === _.get(this.props, 'AllSessionsFacet', []).length) {
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
    const sessions = _.get(props, 'AllSessionsFacet', []);
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
    const goToPageTwo = () => Actions.conversations({text: 'Hello World!'});
    return (
      this.state.dataSource ?
         <ListView
          dataSource={this.state.dataSource}
          onScroll={this.props.scrollEvent.bind(this)}
          renderRow={(rowData, i) => {
            return (
              <View style={styles.wrapper} key={1}>
                <TouchableHighlight onPress={this.onPress.bind(this, rowData._id)} underlayColor='#999'>
                  <View>
                     <ResponsiveImage source={{uri: rowData.image}} initWidth="100%" initHeight="250"/>
                     <View style={styles.backgroundImage}>
                        <Text style={styles.text}>Test</Text> 
                        <Text style={styles.subtext}>sub title test for image</Text> 
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

  onPress(id) {
    setActiveSession(id);
    Actions.sessionDetails()
  }

  goToChat(conversation) {
    openChat(conversation);
    Actions.conversations()
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
    paddingBottom: 5
  },
  subtext: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 17
  }
});

export default branch(Home, {
  cursors: {
    AllSessionsFacet: ['facets','AllSessionsFacet'],
  }
});