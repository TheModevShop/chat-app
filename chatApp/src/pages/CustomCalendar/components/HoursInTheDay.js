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
    }, 200)
  }
  
  componentWillMount() {
    this.components = [];
    this.childrenComponents = [];
    this.days = []
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
        const {id, day, row, column, comp} = component;
        this.register(id, day, row, column, comp, 'overridePosition')
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
  panCapture(e, r) {}

  panStart(e, r) {
    const newCordinates = [r.moveX, r.moveY]
    const angle = this.getAngle(this.lastCordinates, newCordinates);
    // this.lastCordinates = newCordinates;
    if ((angle < 40 && angle >= -20) || (angle > 120 && angle <= 180) || (angle >= -170 && angle <= -110)) {
      this.scroll = false;
      this.allowPan = true;
      const day = this.findDay(r);
      if (day) {
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
    console.log(this.getDirection(r.dx, r.dy))
    if (!this.allowPan) {
      return;
    }
    if (r.dy < 20 && r.dy > -20) {
      this.isPanning = true;
      const day = this.findDay(r);
      this.addOrRemoveDay(day);
    }
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
    var x = p2[0] - p1[0],
        y = p2[1] - p1[1];
    return Math.atan2(y, x) * 180 / Math.PI;
  }

  addOrRemoveDay(day) {
    if (day && day.id !== this.lastPanned && day.row === this.state.activeRow) {
      this.lastPanned = day.id   
      const alreadyPushed = this.days.indexOf(day.id) > -1;
      
      if (!alreadyPushed) {
        const innerComp = _.get(_.find(this.childrenComponents, {id: day.id}), 'comp')
        day.comp.setNativeProps({
          style: {backgroundColor: 'red'}
        });
        this.days.push(day.id);
      };

    }
  }

  registerInner(id, comp) {
    const index = _.findIndex(this.childrenComponents, {id: id});
    if (index > -1) {
      this.childrenComponents[index].comp = comp;
    } else {
      this.childrenComponents.push({id, comp})
    }
  }

  panEnd(e) {
    if (!this.allowPan) {
      return;
    }
    this.allowPan = false;
    this.scroll = true;
    this.setState({pannedDays: this.days, activeRow: null});
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

  async register(id, day, row, column, comp, originOveride) {    
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
        boundingRect: rect
      })
    }
  }



  render() {
    return (
      <View style={{flex: 1, position: 'absolute', top: 0, bottom: 0, right: 0, left: 0}} {...this._panResponder.panHandlers}>
        <ScrollView scrollEnabled={this.scroll} scrollEventThrottle={40} onScroll={this.onScrollEvent.bind(this)} >
          {
            _.map(this.props.hours, (hour, i) => {
              return <TimeRow registerInner={this.registerInner.bind(this)} scroll={this.scroll} activeRow={this.state.activeRow} week={this.props.week} key={i} i={i} register={this.register.bind(this)} hour={hour} pannedDays={this.state.pannedDays} />
            })
          }
        </ScrollView>
      </View>
    );
  }

  onScrollEvent(e) {
    this.reMeasureComponents();
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