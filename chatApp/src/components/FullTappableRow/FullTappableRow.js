import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import globalStyles from '../../styles/globalStyles';
import * as constants from '../../styles/styleConstants';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

class FullTappableRow extends Component {
  render() {
    const {title, onPress, topBorder, bottomBorder = true, hideIcon, icon, active, subtitle} = this.props
    const shadowStyle = !bottomBorder ? globalStyles.standardShadow : {}
    
    return (
      <TouchableOpacity onPress={onPress} style={this.props.style}>
        <View style={[{alignItems: 'stretch', backgroundColor: '#fff', minHeight: constants.ROW_HEIGHT}]}>
          {
            topBorder ? 
            <View style={{backgroundColor: '#ccc', height: 1}} /> : null
          }
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', padding: constants.PADDING_STANDARD}}>
            <View style={{flex: 1}}>
              <Text style={{fontSize:16}}>{title}</Text>
              {
                subtitle ?
                <Text style={{fontSize:16}}>{subtitle}</Text> : null
              }
            </View>
            {
              !hideIcon ?
              <Icon name={icon || 'ios-arrow-forward'} size={25} color="#ccc" /> : null
            }   
            {
              active ?
              <Icon name={'ios-arrow-forward'} size={25} color="#ccc" /> : null
            }            
          </View>
          {
            bottomBorder ? 
            <View style={{backgroundColor: '#ccc', height: 1}} /> : null
          }
        </View>
      </TouchableOpacity>
    )
  }
}



export default FullTappableRow