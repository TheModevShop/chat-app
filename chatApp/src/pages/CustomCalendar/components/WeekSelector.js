'use strict';
import React, { Component } from 'react';
import _ from 'lodash';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Dimensions
} from 'react-native';


class WeekSelector extends Component {
  componentWillMount() {
    this.week = {
      width: Dimensions.get('window').width / this.props.weeks.length,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }

  render() {
    return (
       <View style={styles.weeksWrapper}>
        {
          _.map(this.props.weeks, (week, i) => {
            return <TouchableHighlight 
              key={i} 
              onPress={this.props.onChangeWeek.bind(this, i)} 
              style={[this.week]}>
                <Text style={this.props.activeWeek === i ? [styles.weekActive] : null}>Wk {i+1}</Text>
            </TouchableHighlight>
          })
        }
      </View>
    );
  }
}


const styles = StyleSheet.create({
  weeksWrapper: {
    flexDirection: 'row',
    height: 40
  },
  weekActive: {
    color: 'red'
  }
});

export default WeekSelector;