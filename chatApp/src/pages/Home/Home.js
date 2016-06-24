import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {branch} from 'baobab-react/higher-order';
import SessionList from './SessionList';
import Search from '../Search/Search';
import Icon from 'react-native-vector-icons/Ionicons';
import {setSearch, toggleSearch} from '../../actions/SearchActions';

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
    StatusBar.setBarStyle('light-content', true);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.searchOpen && this.state.searchOpen) {
      setTimeout(() => {
        this._searchInput.focus();
      }, 430)
    }
  }

  render() {
    return (
       <View style={{flex: 1}}>
        
        <SessionList goToSessionDetails={this.props.onNavigation} scrollEvent={this.scrollEvent.bind(this)} />
        <TouchableHighlight style={{position: 'absolute', left: this.state.left, right: this.state.right, top: this.state.top, flex: 1, borderRadius: this.state.br, backgroundColor: '#fff', height: 50}} onPress={this.onPress.bind(this)} underlayColor='#99d9f4'>
          <View style={{marginTop: 0, alignItems: 'center', flex: 1, flexDirection: 'row',  borderColor: 'gray', borderBottomWidth: this.state.searchOpen ? 1 : 0}}>
            <Icon name={'ios-search-outline'} style={{backgroundColor: 'transparent', padding: 10, paddingLeft: 14}} size={30} color="#999" />
            {
              this.state.searchOpen ?
              <TextInput
                ref={(c) => this._searchInput = c}
                autoFocus={false}
                placeholder="What would you like to learn"
                style={{fontSize: 14, paddingLeft: 5, flex: 4, height: 50}}
                onChangeText={this.onSearch.bind(this)}
                value={this.props.sessionSearch.query} /> : !this.state.scrolled ? 
                <Text style={{backgroundColor: 'transparent', color: '#999'}}>What do you want to learn?</Text> : null
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
            height: WINDOW_Height-50-this.props.STATUS_BAR_HEIGHT,
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
      this.setState({br: 100, right: WINDOW_WIDTH - 75, scrolled: true})
    } else if(offset < 100) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      this.setState({br: 3, right: 25, scrolled: false})
    }
  }

  onPress() {
    toggleSearch(true);
    LayoutAnimation.spring();
    this.setState({br: 0, right: 0, left:0, top: 0, searchOpen: !this.state.searchOpen})
    
    Animated.timing(
       this.state.search,
       {toValue: 49, duration: 250}
     ).start(); 
  }

  closeSearch() { 
    this._searchInput.blur();

    setTimeout(() => {
      Animated.timing(      
       this.state.search,
       {toValue: WINDOW_Height, duration: 250}
     ).start();
    },150) 

    setTimeout(() => {
      LayoutAnimation.spring();
      this.setState({br: this.state.scrolled ? 100 : 3, right: this.state.scrolled ? WINDOW_WIDTH - 75 : 25, left:25, top: 25, searchOpen: false})
    }, 240) 
  
  }

  onSearch(val) {
    setSearch(val);
  }

}

export default branch(Home, {
  cursors: {
    view: ['home'],
    sessionSearch: ['sessionSearch'],
    STATUS_BAR_HEIGHT: ['STATUS_BAR_HEIGHT']
  }
});