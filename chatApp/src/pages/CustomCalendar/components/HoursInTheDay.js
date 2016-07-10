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

const PROPS_XY = ['x', 'y'];

class HoursInTheDay extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      pannedDays: [],
      scroll: true
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.reMeasureComponents();
    }, 1000)
  }
  
  componentWillMount() {
    this.components = [];
    this.childrenComponents = [];
    this.days = [];
    this.lastPanned = {};
    this.scroll = true;
    this.allowPan = false;
    this.isPanning = false;
    this.startIsPanned;
    this.panStart;

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.setPanResponder.bind(this),
      onStartShouldSetPanResponderCapture: this.setPanCapture.bind(this),
      onMoveShouldSetPanResponder: this.setPanCaptureOnMove.bind(this),
      onMoveShouldSetPanResponderCapture: this.setPanCaptureOnMove.bind(this),
      onPanResponderGrant: this.panStart.bind(this),
      onPanResponderMove: this.panMove.bind(this),
      onPanResponderRelease: this.panEnd.bind(this)
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeWeek !== this.props.activeWeek) {
      this.components = [];
    } 
  }

  onMoveShouldSetPanResponder(evt, gesture) {
    return gesture.numberActiveTouches === 1
  }

  async measureComponents(comp) {
    return new BPromise((resolve) => {
      try {
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
      } catch(err) {

      }
    }) 
  }

  reMeasureComponents() {
    _.forEach(this.components, (component = {}) => {
      if (component.id) {
        const {id, day, row, column, time, comp} = component;
        this.register(id, day, row, column, time, comp, 'overridePosition')
      }      
    })
  }

  setPanResponder() {
    return false
  }

  setPanCapture(e,r) {
    // captures click but continue false for drag.
    const day = this.findDay(e.nativeEvent);
    this.lastCordinates = [e.nativeEvent.pageX, e.nativeEvent.pageY]
    return false
  }

  setPanCaptureOnMove(e,r) {
    return true
  }

  panStart(e, r) {
    const newCordinates = [r.moveX, r.moveY]
    const angle = this.getAngle(this.lastCordinates, newCordinates);
    if ((angle < 40 && angle >= -20) || (angle > 120 && angle <= 180) || (angle >= -170 && angle <= -110)) {
      this.scroll = false;
      this.allowPan = true;
      const day = this.findDay(r);
      if (day) {
        this.panStart = day;
        const isPanned = _.findIndex(this.days, day.id);
        if (isPanned > -1) {
          this.startIsPanned = true;
        }
        this.setState({activeRow: day.row});
      }
    } else {
      this.scroll = true;
      this.allowPan = false;
      this.setState({activeRow: null});
    }
    return true;
  }

  panMove(e, r) {
    if (!this.allowPan) {
      return;
    }
    if (r.dy < 20 && r.dy > -20) {
      this.isPanning = true;
      const day = this.findDay(r);
      this.addOrRemoveDay(day);
    }
  }


  addOrRemoveDay(day) {
    if (day && day.row === this.state.activeRow && day.id !== _.get(this.lastPanned, 'id')) {  
      const removeDay = this.removeDay(day);
      if (!removeDay) {
        this.addDay(day)
      }
      this.lastPanned = day 
    }
  }

  removeDay(day) {
    if (_.get(this.lastPanned, 'day.day') && day.day.day.isBefore(_.get(this.lastPanned, 'day.day'))) {
     const backTrack = _.find(this.components, {id: `id-${day.row}-${day.column + 1}-${this.props.activeWeek}`});
      backTrack.comp.setNativeProps({
        style: {backgroundColor: 'transparent'}
      });
      const index = this.days.indexOf(backTrack.id);
      this.days.splice(index, 1); 
      return true;
    }
  }

  addDay(day) {
    console.log(day.id)
    const alreadyPushed = this.days.indexOf(day.id) > -1;
    if (!alreadyPushed) {
      day.comp.setNativeProps({
        style: {backgroundColor: '#ccc'}
      });
      this.days.push(day.id);
    }
  }

  panEnd(e) {
    if (!this.allowPan) {
      return;
    }
    this.allowPan = false;
    this.scroll = true;
    this.setState({pannedDays: this.days, activeRow: null});
    // _.forEach(this.components, (day) => {
    //   day.comp.setNativeProps({
    //     style: {backgroundColor: 'transparent'}
    //   });
    // });
    // removed panned and add active
    const daysToSave = _.filter(this.components, (component) => {
      return this.days.indexOf(component.id) > -1;
    });
    console.log(_.uniqBy(daysToSave, 'id'));

    setTimeout(() => {
      this.panStart = null;
      this.lastPanned = null;
      this.startIsPanned = null;
      this.isPanning = null;
      this.allow = false;
    }, 1);

  }

  findDay(e) {  
    const yPosition = e.moveY || e.pageY;
    const xPosition = e.moveX || e.pageX;
    return _.find(this.components, (comp) => {
      const rect = comp.boundingRect; 
      return xPosition > rect.left &&
      xPosition < rect.right  &&
      yPosition > rect.top &&
      yPosition < rect.bottom;
    });
  }

  async register(id, day, row, column, time, comp, originOveride) {
    if (comp) {
      const index = _.findIndex(this.components, {id: id});
      let originalRect;
      if (index > -1) {
        originalRect = this.components[index].boundingRect;
        this.components.splice(index, 1);
      } 

      let rect;
      if(originalRect && !originOveride) {
        rect = originalRect;
      } else {
        rect = await this.measureComponents(comp);
      }
      //const rect = await this.measureComponents(comp);
      this.components.push({
        comp,
        id,
        row,
        column,
        day,
        time,
        boundingRect: rect
      })
    }
  }



  render() {
    return (
      <View style={styles.wrapper} {...this._panResponder.panHandlers}>
        <ScrollView scrollEnabled={this.scroll} scrollEventThrottle={40} onScroll={this.onScrollEvent.bind(this)} >
          {
            _.map(this.props.hours, (hour, i) => {
              return <TimeRow 
                activeWeek={this.props.activeWeek} 
                scroll={this.scroll} activeRow={this.state.activeRow} 
                week={this.props.week} key={i} i={i} 
                register={this.register.bind(this)} 
                hour={hour} 
                pannedDays={this.state.pannedDays} />
            })
          }
        </ScrollView>
      </View>
    );
  }

  onScrollEvent(e) {
    this.reMeasureComponents();
  }

  getDirection(x, y) {
    if (x === y) {
        return 'none';
    }
    if (Math.abs(x) >= Math.abs(y)) {
        return x > 0 ? 'left' : 'right';
    }
    return y > 0 ? 'UP' : 'DOWN';
  }

  getAngle(p1, p2, props) {
    const x = p2[0] - p1[0];
    const y = p2[1] - p1[1];
    return Math.atan2(y, x) * 180 / Math.PI;
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