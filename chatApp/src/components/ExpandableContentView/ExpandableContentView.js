import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import _ from 'lodash';
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

var CustomLayoutSpring = {
    duration: 400,
    create: {
      type: LayoutAnimation.Types.spring,
      property: LayoutAnimation.Properties.scaleXY,
      springDamping: 0.7,
    },
    update: {
      type: LayoutAnimation.Types.spring,
      springDamping: 0.7,
    },
  };


class ExpandableContentView extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      br: 3,
      right: 0,
      left: 0,
      top: 0,
      search: new Animated.Value(WINDOW_Height),
      searchOpen: false,
      bottom: 90,
      query: ''
    };
  }

  componentWillMount() {
    LayoutAnimation.configureNext(CustomLayoutSpring);
    // StatusBar.setBarStyle('light-content', true);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.open !== nextProps.open) {
      if (nextProps.open) {
        this.c.measure(this.logLayout.bind(this));
      } else {
        this.closeSearch()
      }
    } 
  }

  logLayout(ox, oy, width, height, px, py) {
    this.height = height;
    this.py = py
    this.toggleSearch();
  }

  render() {
    let style = {
      opacity: this.props.open ? 1 : 1, 
      zIndex: this.props.open ? 9999 : 1, 
      position: 'absolute', 
      bottom: this.state.bottom, 
      height: this.state.height,
      left: this.state.left, 
      right: this.state.right, 
      top: this.state.top, 
      flex: 1, 
      borderRadius: this.state.br, 
      backgroundColor: '#fff'
    }
    if (this.state.bottom === false) {
      style = _.omit(style, 'bottom')
    }
    if (this.state.height === false) {
      style = _.omit(style, 'height')
    }

    return (
      <View pointerEvents={this.props.open ? 'auto' : 'none'} ref={(c) => this.c = c} style={style}>
        {this.props.children}
      </View>
    );
  }



  toggleSearch() {
    LayoutAnimation.configureNext(CustomLayoutSpring);
    this.setState({br: 0, top: (-1)*this.py, height: WINDOW_Height - 70, bottom: false, searchOpen: !this.state.searchOpen})
    
    
  }

  closeSearch() { 
    LayoutAnimation.configureNext(CustomLayoutSpring);
    this.setState({br: 0, top: 0, height: false, bottom: 0, searchOpen: false})
  }



}


// <ExpandableContentView open={this.state.open > -1}>
//   {
//     activeListing ?
//     <View>
//        <ResponsiveImage source={{uri: activeListing.image}} initWidth="100%" initHeight="250"/>
//        <View style={styles.backgroundImage}>
//           <Text style={styles.text}>{activeListing.service_name}</Text> 
//           <Text style={styles.subtext}>{activeListing.service_description}</Text> 
//           <TouchableHighlight onPress={() => this.setState({open: -1})} underlayColor='#999'>
//             <Text>close</Text>
//           </TouchableHighlight>
//        </View>
//        {
//         this.state.open > -1 ?
//         <View>
//           <Text style={{}}>content content</Text> 
//           <Text style={{}}>content content</Text> 
//           <Text style={{}}>content content</Text> 
//           <Text style={{}}>content content</Text> 
//        </View> : null
//        }
//     </View> : null
//   }
// </ExpandableContentView>






export default branch(ExpandableContentView, {
  cursors: {
  }
});