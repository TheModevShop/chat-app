'use strict';
import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import moment from 'moment';
import ellipsize from 'ellipsize';
import globalStyles from '../../styles/globalStyles';
import * as constants from '../../styles/styleConstants';
import textStyle from '../../styles/textStyle';
import _ from 'lodash';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ListView,
  PixelRatio,
  Image,
  TouchableHighlight
} from 'react-native';

import ResponsiveImage from 'react-native-responsive-image';

var IMAGE_WIDTH = Dimensions.get('window').width;
var IMAGE_HEIGHT = IMAGE_WIDTH / 2;
var PIXEL_RATIO = PixelRatio.get();
var PARALLAX_FACTOR = 0.3;

class InstructorBookingList extends Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (_.get(nextProps, 'bookings', []).length === _.get(this.props, 'bookings', []).length) {
      return false
    }
    return true;
  }

  componentWillMount() {
    this.registerList(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.registerList(nextProps);
  }

  registerList(props) {
    const listings = _.get(props, 'bookings', []);
    if (listings.length) {
      var ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 != r2
      });
      this.setState({
        dataSource: ds.cloneWithRows(listings),
      });
    }
  }

  render() {
    return (
      this.state.dataSource ?
         <ListView
          dataSource={this.state.dataSource}
          onScroll={this.props.scrollEvent.bind(this)}
          renderRow={(rowData, i) => {
            const service = rowData;
            return (
              <View style={[styles.wrapper]} key={1}>
                <TouchableHighlight style={[{borderRadius: 5, backgroundColor: '#fff'}, globalStyles.boxShadow]} onPress={this.props.goToActiveBooking.bind(this, rowData.id)} underlayColor='#999'>
                  <View>
                    <ResponsiveImage source={{uri: service.image}} initWidth="100%" initHeight="90"/>
                    <View style={styles.contentWrapper}>
                      <Text style={[textStyle.h3, textStyle.bold]}>{rowData.service_name} with {_.get(rowData, 'enrolled[0].first_name')}</Text>
                      <Text style={[textStyle.h5]}>
                        {`${moment(rowData.start).format('MM-DD-YYYY')} @ ${moment(rowData.start).format('h:mm a')} - ${moment(rowData.end).format('h:mm a')}`}
                      </Text>
                    </View>
                  </View>
                </TouchableHighlight>
              </View>
            )
          }}        
        />
      : <View style={{margin: 128}}>
      <Text> loading</Text>
    </View>
    );
  }

}

let styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    paddingLeft: constants.PADDING_SMALL,
    paddingRight: constants.PADDING_SMALL,
    paddingTop: constants.PADDING_SMALL,
  },
  contentWrapper: {
    paddingLeft: constants.PADDING_SMALL,
    paddingRight: constants.PADDING_SMALL,
    paddingTop: constants.PADDING_SMALL,
    paddingBottom: constants.PADDING_SMALL
  },
  backgroundImage: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    height: 250,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0
  },
  contentTitle: {
    fontFamily: constants.FONT_BOLD,
  },
  subTitle: {
    color: constants.GRAY
  }
});

export default branch(InstructorBookingList, {
  cursors: {  
  }
});