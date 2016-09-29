import React, { Component } from 'react';
import globalStyles from '../../styles/globalStyles';
import * as constants from '../../styles/styleConstants';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';


class SectionHeader extends Component {
  render() {
    const {title} = this.props
    
    return (
      <View style={{marginTop: 16, paddingLeft: 16, paddingBottom: 8}}>
        <Text style={styles.title}>{title}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 12
  }
})



export default SectionHeader