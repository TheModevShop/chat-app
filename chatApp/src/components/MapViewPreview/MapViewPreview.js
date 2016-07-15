'use strict';
import React, { Component } from 'react';
import MapView from 'react-native-maps';
import _ from 'lodash';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

class MapViewPreview extends Component {
   constructor(...args) {
    super(...args);
    this.state = {};
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({mounted: true});
    }, 340);
  }
  render() {
    return (
       <View style={{flex: 1, height: 250, position: 'relative'}}>
         {
          this.state.mounted ?
            <MapView
            style={styles.map}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          /> : null
         }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default MapViewPreview