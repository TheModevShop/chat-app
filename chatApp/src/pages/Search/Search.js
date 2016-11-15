'use strict';
import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import {openChat} from '../../actions/ChatActions';
import {setActiveSession} from '../../actions/SessionActions';
import {setActiveListing, setListingSkillFilter} from '../../actions/ListingActions';
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
      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 != r2
      });
      this.setState({
        dataSource: ds.cloneWithRows(search),
      });
    }

    const skills = _.get(props, 'skills', []);
    if (skills.length) {
      const skillsDs = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 != r2
      });
      this.setState({
        skillsSource: skillsDs.cloneWithRows(skills),
      });
    }
  }

  render() {
    return (
      <View style={{marginTop: 0, flex: 1, flexDirection: 'column'}}>
        {
          _.get(this.props, 'search.items.length', false) ?
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData, i) => {
              const data = _.get(rowData, '_source');
              console.log(data)
              return (
                data.skill_name ?
                <View>
                  <TouchableHighlight onPress={this.onPressSkill.bind(this, data.skill_id)} underlayColor='#999'>
                    <View style={styles.result}>
                      <Text style={styles.h2}>{data.skill_name}</Text>
                      <Text>{data.skill_category}</Text>
                    </View>
                  </TouchableHighlight>
                </View> :
                <View>
                  <TouchableHighlight onPress={this.onPressCalendar.bind(this, data.calendar_id)} underlayColor='#999'>
                    <View style={styles.result}>
                      <Text style={styles.h2}>{data.service_name}</Text>
                      <Text>{data.description}</Text>
                    </View>
                  </TouchableHighlight>
                </View>
              )
            }}        
          /> : 
        <View style={{margin: 0}}>
          {
            _.get(this.props, 'skills.length', false) ?
              <ListView
                dataSource={this.state.skillsSource}
                renderRow={(rowData, i) => {
                  return (
                    <View>
                      <TouchableHighlight onPress={this.onPressSkill.bind(this, rowData.skill_id)} underlayColor='#999'>
                        <View style={styles.result}>
                          <Text style={styles.h2}>{rowData.name}</Text>
                          <Text>{rowData.description}</Text>
                        </View>
                      </TouchableHighlight>
                    </View>
                  )
                }}        
              /> : null
          }
        </View>
      }
    </View>
    );
  }
  onPress() {

  }

  onPressSkill(skillId) {
    setListingSkillFilter(skillId);
    this.props.onNavigation({type: 'push', key: 'SkillAvailability'})
  }

  onPressCalendar(listingId) {
    setActiveListing(listingId);
    this.props.onNavigation({type: 'push', key: 'ListingDetails'})
  }
}

let styles = StyleSheet.create({
  result: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  h2: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default branch(Home, {
  cursors: {
    view: ['search'],
    search: ['facets', 'Search'],
    skills: ['facets', 'Skills']
  }
});