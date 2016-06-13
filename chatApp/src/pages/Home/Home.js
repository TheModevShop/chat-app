'use strict';
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {branch} from 'baobab-react/higher-order';
import SessionList from './SessionList';
import Search from '../Search/Search';

import {setSearch} from '../../actions/SearchActions';

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
        
        <SessionList scrollEvent={this.scrollEvent.bind(this)} />
        <TouchableHighlight style={{position: 'absolute', left: this.state.left, right: this.state.right, top: this.state.top, flex: 1, borderRadius: this.state.br, backgroundColor: '#fff', height: 50}} onPress={this.onPress.bind(this)} underlayColor='#99d9f4'>
          <View style={{marginTop: 0, flex: 1, flexDirection: 'row',  borderColor: 'gray', borderBottomWidth: 1}}>
            {
              this.state.searchOpen ?
              <TextInput
                autoFocus={true}
                style={{paddingLeft: 15, flex: 4, height: 50}}
                onChangeText={this.onSearch.bind(this)}
                value={this.props.sessionSearch.query} /> : null
            }
            {
              this.state.searchOpen ?
              <TouchableHighlight style={{flex: 1, padding: 20}} onPress={this.closeSearch.bind(this)} underlayColor='#99d9f4'>
                <Text>Cancel</Text>
              </TouchableHighlight> : null
            }
          </View> 
        </TouchableHighlight>
        <Animated.View                         // Base: Image, Text, View
          style={{
            position: 'absolute',
            height: WINDOW_Height,
            backgroundColor: '#fff',
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
    
    Animated.spring(
       this.state.search,
       {toValue: 110, friction: 9, tension: 50}
     ).start(); 
  }

  closeSearch() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    this.setState({br: 3, right: 25, left:25, top: 25, searchOpen: false, search: new Animated.Value(WINDOW_Height)})
    
    Animated.spring(      
       this.state.search,
       {toValue: WINDOW_Height, friction: 9, tension: 50}
     ).start(); 
  }

  onSearch(val) {
    setSearch(val);
  }

  componentWillUnmount() {
    this.closeSearch();
  }
}

export default branch(Home, {
  cursors: {
    view: ['home'],
    sessionSearch: ['sessionSearch']
  }
});