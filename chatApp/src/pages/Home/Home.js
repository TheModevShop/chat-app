'use strict';
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {branch} from 'baobab-react/higher-order';
import SessionList from './SessionList';
import Search from '../Search/Search';
import {
  StatusBar,
  StyleSheet,
  Animated,
  LayoutAnimation,
  Text,
  TextInput,
  View,
  ScrollView,
  Dimensions,
  ListView,
  PixelRatio,
  Image,
  TouchableHighlight
} from 'react-native';

var WINDOW_WIDTH = Dimensions.get('window').width;
var WINDOW_Height = Dimensions.get('window').height;


class Home extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      br: 3,
      right: 25,
      left: 25,
      top: 25,
      search: new Animated.Value(WINDOW_Height),
      searchOpen: false,
      query: ''
    };
  }

  componentWillMount() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  }

  render() {
    return (
       <View style={{marginTop: 0, flex: 1, flexDirection: 'column'}}>
        <StatusBar hidden={this.state.searchOpen} />
        <SessionList scrollEvent={this.scrollEvent.bind(this)} />
        <TouchableHighlight style={{position: 'absolute', left: this.state.left, right: this.state.right, top: this.state.top, flex: 1, borderRadius: this.state.br, backgroundColor: '#fff', height: 50}} onPress={this.onPress.bind(this)} underlayColor='#99d9f4'>
          <View style={{marginTop: 0, flex: 1, flexDirection: 'column'}}>
            {
              this.state.searchOpen ?
              <TextInput
                style={{flex: 4, height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(query) => this.setState({query})}
                value={this.state.query}
              /> : null
            }
          </View> 
        </TouchableHighlight>
        <Animated.View                         // Base: Image, Text, View
          style={{
            position: 'absolute',
            height: WINDOW_Height,
            backgroundColor: 'red',
            bottom: 0,
            left: 0,
            right: 0,
            transform: [                        
              {translateY: this.state.search}
            ]
          }}>
          <Search />
        </Animated.View>
      </View>
    );
  }
  scrollEvent(e) {
    const offset = e.nativeEvent.contentOffset.y;
    if (offset > 100) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      this.setState({br: 100, right: WINDOW_WIDTH - 75})
    } else if(offset < 100) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      this.setState({br: 3, right: 25})
    }
  }

  onPress() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    this.setState({br: 3, right: 0, left:0, top: 0, searchOpen: !this.state.searchOpen})
    
    Animated.spring(          // Uses easing functions
       this.state.search,    // The value to drive
       {toValue: 48, friction: 6, tension: 15}            // Configuration
     ).start(); 
  }
}

export default branch(Home, {
  cursors: {
    view: ['home']
  }
});