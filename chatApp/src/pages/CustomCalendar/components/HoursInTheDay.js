'use strict';
import React, { Component } from 'react';
import _ from 'lodash';
import BPromise from 'bluebird';
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
    this.state = {
      pannedDays: []
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.stopReg = true;
    }, 200)
  }
  
  componentWillMount() {
    this.components = [];
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: () => this.setState({scroll: false}),
      onPanResponderMove: this.panMove.bind(this),
      onPanResponderRelease: this.panEnd.bind(this)
    })
  }

  async measureComponents(comp) {
    return new BPromise((resolve) => {
      comp.measure( (fx, fy, width, height, px, py) => {
        resolve({
          bottom: py + height,
          height: height,
          left: px,
          right: px + width,
          top: py,
          width: width
        });
      });
    }) 
  }

  panMove(e, r) {
    this.isPanning = true;
    const day = this.findDay(r);
    if (day && day.id !== this.lastPanned) {
      const pannedDays = _.clone(this.state.pannedDays);
      this.lastPanned = day.id;
      pannedDays.push(day);
      this.setState({pannedDays: pannedDays});
    }
  }

  panEnd(e) {
    // this.forceUpdate();
  }

  findDay(e) {    
    return _.find(this.components, (comp) => {
      const rect = comp.boundingRect; 
      return e.moveX > rect.left &&
      e.moveX < rect.right  &&
      e.moveY > rect.top &&
      e.moveY < rect.bottom;
    });
  }

  async register(id, day, comp, originOveride) {    
    if (this.stopReg) {
      return;
    }
    if (comp) {
      const index = _.findIndex(this.components, {id: id});
      let originalRect;
      if (index >= 0) {
        originalRect = this.components[index].boundingRect;
        this.components.splice(index, 1);
      }
      let rect;
      if(originalRect && !originOveride) {
        rect = originalRect;
      } else {
        rect = await this.measureComponents(comp);
      }
      this.components.push({
        comp,
        id,
        day,
        boundingRect: rect
      })
    }
  }

  makeDays(hour) {
    return _.map(this.props.week, (day, i, array) => {
     return <View ref={this.register.bind(this, `id-${hour}-${i}`, day)} key={i} style={styles.days}>
        <View style={[
          styles.dayInner, i === 0 ? styles.dayStart : {}, 
          i === array.length-1 ? styles.dayEnd : {},
          _.find(this.state.pannedDays, {id: `id-${hour}-${i}`}) ? {backgroundColor: 'red'} : {}
          ]}>
          <Text>{day.day.format('D')}</Text>
        </View>
      </View>
    });

    return days;
  }

  makeRow() {
    const row =  _.map(this.props.hours, (hour, i) => {
     return <View key={i} style={i%2 !== 0 ? styles.even : styles.row}>
        <View style={styles.days}><Text>{moment(hour, 'H:mm').format('h:mm')}</Text></View>
        {this.makeDays(i)}
     </View>
    });
    return row;
  }

  render() {
    return (
      
       <ScrollView {...this._panResponder.panHandlers} scrollEventThrottle={20} onScroll={this.onScrollEvent.bind(this)} >
         {this.makeRow()}
      </ScrollView>
      
    );
  }

  onScrollEvent(e) {
  }
}


const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  even: {
    backgroundColor: '#f3f3f3',
    flexDirection: 'row',
  },
  days: {
    width: (Dimensions.get('window').width / 8) - 0.5,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  dayInner: {
    width: (Dimensions.get('window').width / 8) - 0.5,
    height: 30,
    
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayStart: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20
  },
  dayEnd: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20
  },
  active: {
    backgroundColor: 'red',
  }
  
});

export default HoursInTheDay;