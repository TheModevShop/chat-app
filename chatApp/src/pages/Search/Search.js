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

  shouldComponentUpdate(nextProps, nextState) {
    if (_.get(nextProps, 'AllConversations', []).length === _.get(this.props, 'AllConversations', []).length) {
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
    const users = _.get(props, 'AllConversations', []);
    if (users.length) {
      var ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 != r2
      });
      this.setState({
        dataSource: ds.cloneWithRows([]),
      });
    }
  }

  render() {
    const goToPageTwo = () => Actions.conversations({text: 'Hello World!'});
    return (
      <View style={{marginTop: 0, flex: 1, flexDirection: 'column'}}>
        <View style={{height: 60, backgroundColor: 'transparent'}}>
          
        </View>
        {
          this.state.dataSource ?
          <ListView
            dataSource={this.state.dataSource}
            onScroll={this.props.scrollEvent.bind(this)}
            renderRow={(rowData, i) => {
              return (
                <View style={styles.wrapper} key={1}>
                  <TouchableHighlight onPress={this.onPress.bind(this)} underlayColor='#999'>
                    <View>
                      
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
}

let styles = StyleSheet.create({
 
});

export default branch(Home, {
  cursors: {
    view: ['search'],
  }
});