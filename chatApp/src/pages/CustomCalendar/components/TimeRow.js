'use strict';
import React, { Component } from 'react';
import moment from 'moment';
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
  componentDidMount() {
    this.mounted = true;  
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true //!this.mounted || this.props.pannedDays.length !== nextProps.pannedDays.length || this.props.activeRow === this.props.i; 
  }

  render() {
    return (
       <View style={this.props.i%2 !== 0 ? styles.even : styles.row}>
        <View style={styles.days}><Text>{moment(this.props.hour, 'H:mm').format('h:mm')}</Text></View>
        {this.makeDays(this.props.i)}
     </View>
    );
  }

  makeDays(hour) {
    return _.map(this.props.week, (day, i, array) => {
     const panned = this.props.pannedDays.indexOf(`id-${hour}-${i}`) > -1; //_.find(this.props.pannedDays, {id: `id-${hour}-${i}`});
     return <View ref={this.props.register.bind(this, `id-${hour}-${i}`, day, hour, i)} key={i} style={styles.days}>
        <View
          style={[
          styles.dayInner, i === 0 ? styles.dayStart : {}, 
          i === array.length-1 ? styles.dayEnd : {},
          panned ? {backgroundColor: 'rgb(149, 123, 187)'} : {}
          ]}>
          <Text style={panned ? {color: '#fff'} : {}}>{day.day.format('D')}</Text>
        </View>
      </View>
    });

    return days;
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
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  dayInner: {
    width: (Dimensions.get('window').width / 8) - 0.5,
    height: 60,
    
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