import React, { Component } from 'react';
import {
  Animated,
  Text,
  View,
  Picker,
  Item,
  StyleSheet
} from 'react-native';
import {View as AnimatedView, Text as AnimatedText} from 'react-native-animatable';
import globalStyles from '../../styles/globalStyles';
import * as constants from '../../styles/styleConstants';

class TimePicker extends Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  render() {
    return (
      <View style={{flex: 1}}>
        
        <View style={{flexDirection: 'row'}}>
         <View style={{flex: 1, height: 75}}>
            <Text>start</Text>
            <View style={{flex: 1, backgroundColor: '#fff', height: 50, borderBottomColor: '#D4D4D4', borderBottomWidth: 1, borderTopColor: '#D4D4D4', borderTopWidth: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text>5:00 pm</Text>
           </View>
         </View>
         
         <View style={{flex: 1, height: 75}}>
           <Text>end</Text>
           <View style={{flex: 1, backgroundColor: '#fff', height: 50, borderBottomColor: '#D4D4D4', borderBottomWidth: 1, borderTopColor: '#D4D4D4', borderTopWidth: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text>7:00 pm</Text>
           </View>
         </View>
        </View>

         <View style={{flexDirection: 'row', height: 180, backgroundColor: '#fff'}}>
          <Picker style={{flex: 1, paddingLeft: 40, paddingRight: 40}} itemStyle={styles.item} selectedValue={'key3'} onValueChange={this.onValueChange.bind(this, 'selected3')} prompt="Pick one, just one">
            <Item style={styles.item} label="hello" value="key0" />
            <Item style={styles.item} label="world" value="key1" />
            <Item style={styles.item} label="world" value="key2" />
            <Item style={styles.item} label="world" value="key3" />
            <Item style={styles.item} label="world" value="key4" />
            <Item style={styles.item} label="world" value="key5" />
            <Item style={styles.item} label="world" value="key6" />
          </Picker>

          <Picker style={{flex: 1, paddingLeft: 40, paddingRight: 40}} itemStyle={styles.item} selectedValue={'key3'} onValueChange={this.onValueChange.bind(this, 'selected3')} prompt="Pick one, just one">
            <Item style={styles.item} label="hello" value="key0" />
            <Item style={styles.item} label="world" value="key1" />
            <Item style={styles.item} label="world" value="key2" />
            <Item style={styles.item} label="world" value="key3" />
            <Item style={styles.item} label="world" value="key4" />
            <Item style={styles.item} label="world" value="key5" />
            <Item style={styles.item} label="world" value="key6" />
          </Picker>

          <Picker style={{flex: 1, paddingLeft: 40, paddingRight: 40}} itemStyle={styles.item} selectedValue={'key1'} onValueChange={this.onValueChange.bind(this, 'selected3')} prompt="Pick one, just one">
            <Item style={styles.item} label="hello" value="key0" />
            <Item style={styles.item} label="world" value="key1" />
          </Picker>
         </View>
      </View>
    )
  }

  onValueChange(val, title) {
    console.log(val, title)
  }
}

let styles = StyleSheet.create({
  item: {
    fontSize: 14,
    height: 170
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
