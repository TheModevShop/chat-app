'use strict';
import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
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



class PopularSkills extends Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  render() {
    return (
      <View key={1}>
        <Swiper height={228}>
          {
            _.map(this.props.skills, (skill, i) => {
              return (
                <TouchableHighlight key={`skill-${i}`} onPress={this.goToSkillAvailability.bind(this, skill._id)} underlayColor='#999'>
                  <View>
                     <ResponsiveImage source={{uri: skill.image}} initWidth="100%" initHeight="250"/>
                     <View style={styles.backgroundImage}>
                        <Text style={styles.text}>{skill.name}</Text> 
                        <Text style={styles.subtext}></Text> 
                     </View>
                  </View>
                </TouchableHighlight>
              )
            })
          }
        </Swiper>
      </View>
    );
  }

  goToSkillAvailability(skillId) {
    setListingSkillFilter(skillId);
    this.props.goToSkillAvailability();
  }

  componentWillUnmount() {
    console.log('unmount popular skills')
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

export default PopularSkills;