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
  
  componentWillMount() {
    this.components = [];
    this.activeDays = [];
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

  componentDidMount() {
    setTimeout(() => {
     // this.measureComponents();
    }, 1000); 
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
        
   // this.components = _.map(this.components,(component) => {
   //    const {comp, id, day} = component;
   //    if (comp) {
   //      comp.measure( (fx, fy, width, height, px, py) => {
   //        day.boundingRect = {
   //          bottom: py + height,
   //          height: height,
   //          left: px,
   //          right: px + width,
   //          top: py,
   //          width: width
   //        }
   //      }) 
   //    }
   //    return component
   //  })  
  }

  panMove(e, r) {
    this.activeDays.push(this.findDay(r))
  }
  panEnd(e) {
    console.log(this.activeDays)
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
        <View style={[styles.dayInner, i === 0 ? styles.dayStart : {}, i === array.length-1 ? styles.dayEnd : {}]}>
          <Text>{day.day.format('D')}</Text>
        </View>
      </View>
    });
  }

  render() {
    return (
      <View style={{flex: 1}} {...this._panResponder.panHandlers}>
       <ScrollView scrollEventThrottle={20} onScroll={this.onScrollEvent.bind(this)} >
         {
           _.map(this.props.hours, (hour, i) => {
           return <View key={i} style={i%2 !== 0 ? styles.even : styles.row}>
              <View style={styles.days}><Text>{moment(hour, 'H:mm').format('h:mm')}</Text></View>
              {this.makeDays(i)}
           </View>
          })
         }
      </ScrollView>
      </View>
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
    backgroundColor: '#ccc',
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
  }
  
});

export default HoursInTheDay;