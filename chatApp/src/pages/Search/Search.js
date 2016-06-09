'use strict';
import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import { Actions } from 'react-native-router-flux';
import {openChat} from '../../actions/ChatActions';
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


class Home extends Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  componentWillMount() {
    this.registerList(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.registerList(nextProps);
  }

  registerList(props) {
    const search = _.get(props, 'search.items', []);
    if (search.length) {
      var ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 != r2
      });
      this.setState({
        dataSource: ds.cloneWithRows(search),
      });
    }
  }

  render() {
    return (
      <View style={{marginTop: 0, flex: 1, flexDirection: 'column'}}>
        {
          this.state.dataSource ?
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData, i) => {
              return (
                <View>
                  <TouchableHighlight onPress={this.onPress.bind(this)} underlayColor='#999'>
                    <View>
                      <Text>fasfasdf</Text>
                    </View>
                  </TouchableHighlight>
                </View>
              )
            }}        
          /> : 
        <View style={{margin: 128}}>
          <Text> search</Text>
        </View>
      }
    </View>
    );
  }
  onPress() {

  }
}

let styles = StyleSheet.create({
 
});

export default branch(Home, {
  cursors: {
    view: ['search'],
    search: ['facets', 'Search']
  }
});