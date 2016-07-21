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
    const {title, onPress, bottomBorder = true} = this.props
    const shadowStyle = !bottomBorder ? globalStyles.standardShadow : {}
    
    return (
      <TouchableOpacity onPress={onPress} style={this.props.style}>
        <View style={[{alignItems: 'stretch', backgroundColor: '#fff', minHeight: constants.ROW_HEIGHT}]}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', padding: constants.PADDING_STANDARD}}>
            <View style={{flex: 1}}>
              <Text style={{fontSize:16}}>{title}</Text>
            </View>
            <Icon name={'ios-arrow-forward'} size={25} color="#ccc" />
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

const styles = StyleSheet.create({
  title: {
    fontSize: 12
  }
})


export default FullTappableRow