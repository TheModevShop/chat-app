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

const fakePoly = "POLYGON((-97.8052496910095 30.2454737524735,-97.804611325264 30.2463218052606,-97.8038415312767 30.2459279018708,-97.8041794896126 30.2454760695676,-97.8045013546944 30.2456521685585,-97.8048983216286 30.2451864323831,-97.8052496910095 30.2454737524735))";


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
    const polygon = this.props.polygon || fakePoly || '';
    const pp = polygon.replace('POLYGON((', '').replace('))', '').split(',')
    const coordinates = _.map(pp, (c) => {
      return {
        latitude: Number(c.split(' ')[1].trim()),
        longitude: Number(c.split(' ')[0].trim())
      }
    });

    return (
       <View style={{flex: 1, height: 250, position: 'relative'}}>
        <View style={{flex: 1, top: 0, left: 0, right: 0, bottom: 0, position: 'absolute'}} pointerEvents={this.props.disabled ? 'none' : 'auto'}>
         {
          this.state.mounted ?
            <MapView
            style={styles.map}
            region={{
              latitude: this.props.y || 37.78825,
              longitude: this.props.x || -122.4324,
              latitudeDelta: 0.00622,
              longitudeDelta:  0.00621,
            }}>
             <MapView.Marker
                coordinate={{
                  latitude: this.props.y || 37.78825,
                  longitude: this.props.x || -122.4324,
                }}
              />
           
            </MapView> : null
         }
        </View>
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