'use strict';
import React, { Component } from 'react';
import moment from 'moment';
import BPromise from 'bluebird';
import _ from 'lodash';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Dimensions,
  ScrollView,
  PanResponder
} from 'react-native';

class TimeRow extends Component {
  componentWillMount() {
    this.components = [];
    this.childrenComponents = [];
    this.days = [];
    this.lastPanned = {};
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

  componentDidMount() {
    this.mounted = true;
    setTimeout(() => {
      this.reMeasureComponents();
    }, 1000)
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.activeWeek !== this.props.activeWeek) {
      this.components = [];
    }
    if (nextProps.pannedDays.length !== this.props.pannedDays.length) {
      _.forEach(this.components, (component) => {
        const panned = _.find(this.props.pannedDays, {id: component.id});
        if (panned) {
          component.comp.setNativeProps({
            style: {backgroundColor: 'rgb(149, 123, 187)', color: '#fff'}
          });
        } else {
          component.comp.setNativeProps({
            style: {backgroundColor: 'transparent', color: '#000'}
          });
        }
      });
    }
  }

  onMoveShouldSetPanResponder(evt, gesture) {
    return gesture.numberActiveTouches === 1
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
      rect = await this.measureComponents(comp);
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

  panStart(e, r) {
    const newCordinates = [r.moveX, r.moveY]
    const angle = this.getAngle(this.lastCordinates, newCordinates);
    if ((angle < 40 && angle >= -20) || (angle > 120 && angle <= 180) || (angle >= -170 && angle <= -110)) {
      this.props.onScrollEnabled(false);
      this.allowPan = true;
      const day = this.findDay(r);
      if (day) {
        this.panStart = day;
        const isPanned = _.findIndex(this.days, day.id);
        if (isPanned > -1) {
          this.startIsPanned = true;
        }
      }
    } else {
      this.props.onScrollEnabled(true);
    }

    return true;
  }


  panMove(e, r) {
    if (r.dy < 20 && r.dy > -20) {
      this.isPanning = true;
      const day = this.findDay(r);
      this.addOrRemoveDay(day);
    }
  }



  setPanCaptureOnMove(e,r) {
    const newCordinates = [r.moveX, r.moveY]
    const angle = this.getAngle(this.lastCordinates, newCordinates);
    if ((angle < 40 && angle >= -20) || (angle > 120 && angle <= 180) || (angle >= -170 && angle <= -110)) {
      return true
    }
    return false
  }


  panEnd(e) {
    if (!this.allowPan) {
      return;
    }
    this.allowPan = false;

    const newDays = _.filter(this.props.pannedDays, (panned) => {
      return panned.row !== this.props.i;
    });

    this.props.onPanEnd(_.uniqBy(newDays.concat(this.days), 'id'))
    
    setTimeout(() => {
      this.panStart = null;
      this.lastPanned = null;
      this.startIsPanned = null;
      this.isPanning = null;
      this.allow = false;
    }, 1);

  }




  render() {
    return (
       <View style={this.props.i%2 !== 0 ? styles.even : styles.row} {...this._panResponder.panHandlers}>
        <View style={styles.days}><Text>{moment(this.props.hour, 'H:mm').format('h:mm')}</Text></View>
        {this.makeDays(this.props.i)}
     </View>
    );
  }

  makeDays(hour) {
    return _.map(this.props.week, (day, i, array) => {
     const id = `id-${hour}-${i}-${this.props.activeWeek}`;
     const panned = _.findIndex(this.props.pannedDays, {id}) > -1;
     const roundedLeft = panned && !_.find(this.props.pannedDays, {id: `id-${hour}-${i-1}-${this.props.activeWeek}`});
     const roundedRight= panned && !_.find(this.props.pannedDays, {id: `id-${hour}-${i+1}-${this.props.activeWeek}`});
     return <View key={i} style={styles.days}>
        <View
          ref={this.register.bind(this, id, day, hour, i, this.props.hour)}
          style={[
          styles.dayInner, i === 0 || roundedLeft ? styles.dayStart : {}, 
          i === array.length-1 || roundedRight ? styles.dayEnd : {},
          panned ? {backgroundColor: 'rgb(149, 123, 187)'} : {}
          ]}>
          <Text style={panned ? {color: '#fff'} : {color: '#000'}}>{day.day.format('D')}</Text>
        </View>
      </View>
    });

    return days;
  }

  findDay(e) {
    const yPosition = e.moveY || e.pageY;
    const xPosition = e.moveX || e.pageX;
    return _.find(this.components, (comp) => {
      const rect = comp.boundingRect; 
      return xPosition > rect.left &&
      xPosition < rect.right
    });
  }

  addOrRemoveDay(day) {
    if (day && day.id !== _.get(this.lastPanned, 'id')) {  
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
      const index = _.findIndex(this.days, {id: backTrack.id});
      this.days.splice(index, 1); 
      return true;
    }
  }

  addDay(day) {
    const alreadyPushed = this.days.indexOf(day.id) > -1;
    if (!alreadyPushed) {
      day.comp.setNativeProps({
        style: {backgroundColor: '#ccc'}
      });
      this.days.push(_.omit(day, 'comp'));
    }
  }



  reMeasureComponents() {
    _.forEach(this.components, (component = {}) => {
      if (component.id) {
        const {id, day, row, column, time, comp} = component;
        this.register(id, day, row, column, time, comp, 'overridePosition')
      }      
    })
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
  row: {
    flexDirection: 'row',
  },
  even: {
    backgroundColor: '#f3f3f3',
    flexDirection: 'row',
  },
  days: {
    width: (Dimensions.get('window').width / 8) - 0.5,
    height: 50,
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

export default TimeRow;