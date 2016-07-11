'use strict';
import React, { Component } from 'react';
import _ from 'lodash';
import BPromise from 'bluebird';
import moment from 'moment';
import TimeRow from './TimeRow';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Dimensions,
  ScrollView,
  PanResponder
} from 'react-native';


class HoursInTheDay extends Component {
  constructor(...args) {
    super(...args);
    this.scroll = true;
    this.state = {
      pannedDays: [],
      scroll: true
    }
  }
  
  render() {
    return (
      <View style={styles.wrapper}>
        <ScrollView scrollEnabled={this.state.scroll} scrollEventThrottle={40} onScroll={this.onScrollEvent.bind(this)} >
          {
            _.map(this.props.hours, (hour, i) => {
              return <TimeRow 
                activeWeek={this.props.activeWeek} 
                scroll={this.state.scroll} 
                onPanEnd={this.onPanEnd.bind(this)}
                week={this.props.week}
                onScrollEnabled={this.onScrollEnabled.bind(this)}
                key={i} 
                i={i} 
                hour={hour} 
                pannedDays={this.state.pannedDays} />
            })
          }
        </ScrollView>
      </View>
    );
  }

  onPanEnd(pannedDays) {
    this.setState({pannedDays: pannedDays, scroll: true})
  }

  onScrollEnabled(enabled) {
    this.setState({scroll: enabled})
  }

  onScrollEvent(e) {
    // this.reMeasureComponents();
  }

}


const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0
  }
  
});

export default HoursInTheDay;