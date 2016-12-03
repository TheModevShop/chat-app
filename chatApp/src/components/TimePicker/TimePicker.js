import React, { Component } from 'react';
import _ from 'lodash';
import {
  Animated,
  Text,
  View,
  Picker,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import {View as AnimatedView, Text as AnimatedText} from 'react-native-animatable';
import globalStyles from '../../styles/globalStyles';
import * as constants from '../../styles/styleConstants';

class TimePicker extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      hour: '5',
      minute: '00',
      type: 'pm'
    };
    
    this.hours = [];
    this.minutes = [];
    for (var i = 1; i < 13; i++) {
      this.hours.push(String(i));
    };
    for (var i = 0; i < 60; i++) {
      let p = i;
      p = p < 10 ? `0${i}` : i;
      this.minutes.push(String(p));
    };
  }

  render() {
    return (
      <View style={{flex: 1}}>
        
        <View style={{flexDirection: 'row'}}>
         <View style={{flex: 1, height: 75}}>
            <Text>start</Text>
            <TouchableOpacity onPress={() => this.setState({active: 'left'})} style={[{flex: 1, backgroundColor: '#fff', height: 50, borderBottomColor: '#D4D4D4', borderBottomWidth: 1, borderTopColor: '#D4D4D4', borderTopWidth: 1, alignItems: 'center', justifyContent: 'center'}, this.state.active === 'left' ? {borderBottomWidth: 0} : this.state.active === 'right' ? {backgroundColor: '#ccc'} : {}]}>
              <Text>{`${this.state.hour}:${this.state.minute} ${this.state.type}`}</Text>
           </TouchableOpacity>
         </View>
         
         <View style={{flex: 1, height: 75}}>
           <Text>end</Text>
           <TouchableOpacity onPress={() => this.setState({active: 'right'})} style={[{flex: 1, backgroundColor: '#fff', height: 50, borderBottomColor: '#D4D4D4', borderBottomWidth: 1, borderTopColor: '#D4D4D4', borderTopWidth: 1, alignItems: 'center', justifyContent: 'center'}, this.state.active === 'right' ? {borderBottomWidth: 0} : this.state.active === 'left' ? {backgroundColor: '#ccc'} : {}]}>
              <Text>7:00 pm</Text>
           </TouchableOpacity>
         </View>
        </View>

        {
          this.state.active ?
           <View style={{flexDirection: 'row', height: 180, backgroundColor: '#fff'}}>
            <Picker style={{flex: 4}} itemStyle={[styles.item, {textAlign: 'right'}]} selectedValue={this.state.hour} onValueChange={this.onValueChange.bind(this, 'hour')} prompt="Pick one, just one">
              {
                _.map(this.hours, (hour, i) => {
                  return (
                    <Picker.Item label={hour} value={hour} key={hour} />
                  );
                })
              }
            </Picker>

            <Picker style={{flex: 2}} itemStyle={[styles.item, {textAlign: 'center'}]} selectedValue={this.state.minute} onValueChange={this.onValueChange.bind(this, 'minute')} prompt="Pick one, just one">
              {
                _.map(this.minutes, (minute, i) => {
                  return (
                    <Picker.Item label={minute} value={minute} key={minute} />
                  );
                })
              }
            </Picker>

            <Picker style={{flex: 4}} itemStyle={[styles.item]} selectedValue={this.state.type} onValueChange={this.onValueChange.bind(this, 'type')} prompt="Pick one, just one">
              <Picker.Item label="am" value="am" />
              <Picker.Item label="pm" value="pm" />
            </Picker>
           </View> : null
        }

      </View>
    )
  }

  onValueChange(title, val) {
    if (title === 'hour') {
      this.setState({hour: val})
    } else if (title === 'minute') {
      this.setState({minute: val})
    } else {
      this.setState({type: val})
    }
  }
}

let styles = StyleSheet.create({
  item: {
    fontSize: 14,
    height: 170,
    textAlign: 'left'
  },
  timeCell: {
    flex: 1,
   backgroundColor: '#fff',
   height: 50,
   borderBottomColor: '#D4D4D4',
   borderBottomWidth: 1,
   borderTopColor: '#D4D4D4',
   borderTopWidth: 1,
   alignItems: 'center', justifyContent: 'center'
 },
 timeCellOpen: {
  borderBottomWidth: 0,
 }

});

export default TimePicker;
