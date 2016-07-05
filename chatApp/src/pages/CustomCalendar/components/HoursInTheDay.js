'use strict';
import React, { Component } from 'react';
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

class HoursInTheDay extends Component {
  
  componentWillMount() {
    this.components = [];
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: () => this.setState({scroll: false}),
      onPanResponderMove: this.panMove,
      onPanResponderRelease: this.panEnd
    })
  }

  componentDidMount() {
    // console.log(this.components)
    setTimeout(() => {
      _.map(this.components,(comp) => {
        if (comp) {
          comp.measure( (fx, fy, width, height, px, py) => {
            // console.log('Component width is: ' + width)
            // console.log('Component height is: ' + height)
            // console.log('X offset to frame: ' + fx)
            // console.log('Y offset to frame: ' + fy)
            // console.log('X offset to page: ' + px)
            // console.log('Y offset to page: ' + py)
          }) 
        } else {
          
        } 
      })  
    }, 300)    
  }

  panMove(e, r) {
    console.log(r)
  }
  panEnd(e) {
    console.log(e)
  }

  register(id, comp) {    
    if (comp) {
      var index = _.findIndex(this.components, {id: id});
      if (index >= 0) {
        this.components.splice(index, 1);
      }
      this.components.push({
        comp,
        id
      })
    }
  }

  makeDays(hour) {
    return _.map(this.props.week, (day, i, array) => {
     return <View ref={this.register.bind(this, `id-${hour}-${i}`)} key={i} style={styles.days}>
        <View style={[styles.dayInner, i === 0 ? styles.dayStart : {}, i === array.length-1 ? styles.dayEnd : {}]}>
          <Text>{day.day.format('D')}</Text>
        </View>
      </View>
    });
  }

  render() {
    console.log(this.components ? this.components.length : null)
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
    backgroundColor: 'red',
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