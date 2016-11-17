import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import PopularListings from './PopularListings';
import PopularSkills from './PopularSkills';
import Search from '../Search/Search';
import Icon from 'react-native-vector-icons/Ionicons';
import {setSearch, toggleSearch} from '../../actions/SearchActions';
import stringWidth from 'string-width';
import _ from 'lodash';
import {
  StatusBar,
  ScrollView,
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
    // StatusBar.setBarStyle('light-content', true);
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
        <PopularSkills skills={this.props.skills} goToSkillAvailability={this.props.onNavigation.bind(this, {type: 'push', key: 'SkillAvailability'})} />
        <PopularListings onNavigation={this.props.onNavigation} popularListings={this.props.popularListings} scrollEvent={this.scrollEvent.bind(this)} />
        {this.renderSearchBar()}
        {this.renderSearchView()}
      </View>
    );
  }






// START SEARCH

  renderSearchBar() {
    const query = _.get(this.state, 'searchValue', '')
    return (
     <TouchableHighlight style={{position: 'absolute', left: this.state.left, right: this.state.right, top: this.state.top, flex: 1, borderRadius: this.state.br, backgroundColor: '#fff', height: this.state.searchOpen ? 70 : 50}} onPress={!this.state.searchOpen ? this.toggleSearch.bind(this) : () => {}} underlayColor='#ffffff'>
        <View style={{marginTop: 0, alignItems: 'flex-end', flex: 1, flexDirection: 'row',  borderColor: 'gray', borderBottomWidth: this.state.searchOpen ? 1 : 0, height: 50}}>
          <Icon name={'ios-search-outline'} style={{backgroundColor: 'transparent', padding: 10, paddingLeft: 14}} size={30} color="#999" />
          {
            this.state.searchOpen ?
            <View style={{flex: 4, flexDirection: 'row', alignItems: 'flex-end', height: 50, overflow: 'hidden'}}>
              <View style={{position: 'absolute', left: -423423}} onLayout={(event) => {
                var {x, y, width, height} = event.nativeEvent.layout;
                this.setState({searchWidth: width})
              }}>
                <Text>{query}</Text>
              </View>
              {
                !query ?
                <View style={{position: 'absolute', flexDirection: 'row', alignItems: 'center', height: 50}}>
                  <Text style={{backgroundColor: 'transparent', color: '#999'}}>What do you want to learn?</Text>
                </View> : null
              }
              <TextInput
                ref={(c) => this._searchInput = c}
                autoFocus={false}
                style={{fontSize: 14, paddingLeft: 5, flex: 4, height: 50, minWidth: this.state.searchWidth+40 || 40,  maxWidth: this.state.searchWidth+40 || 40}}
                onChangeText={this.onSearch.bind(this)}
                value={query} /> 
              </View>: !this.state.scrolled ? 
              <View style={{flexDirection: 'row', alignItems: 'center', height: 50}}>
                <Text style={{backgroundColor: 'transparent', color: '#999'}}>What do you want to learn?</Text>
              </View> : null
          }
          {
            this.state.searchOpen ?
            <TouchableHighlight style={{flex: 1, padding: 20}} onPress={this.closeSearch.bind(this)} underlayColor='#99d9f4'>
              <Text>Cancel</Text>
            </TouchableHighlight> : null
          }
        </View> 
      </TouchableHighlight>
    )
  }

  renderSearchView() {
    return (
      <Animated.View
        style={{
          position: 'absolute',
          height: WINDOW_Height-50-this.props.STATUS_BAR_HEIGHT,
          backgroundColor: '#fff',
          bottom: 0,
          left: 0,
          right: 0,
          transform: [                        
            {translateY: this.state.search}
          ]}}>
        <Search onNavigation={this.props.onNavigation} />
      </Animated.View>
    )
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

  toggleSearch() {
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
    this.setState({searchValue: val})
    setSearch(val);
  }

  // END SEARCH

}






export default branch(Home, {
  cursors: {
    view: ['home'],
    sessionSearch: ['sessionSearch'],
    STATUS_BAR_HEIGHT: ['STATUS_BAR_HEIGHT'],

    skills: ['facets', 'PopularSkills'],
    popularListings: ['facets','PopularListings'],
  }
});