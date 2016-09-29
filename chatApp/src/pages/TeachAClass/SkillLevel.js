import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import Icon from 'react-native-vector-icons/Ionicons';
import {addService} from '../../actions/ListingActions';
import moment from 'moment';
import NavBar from '../../components/NavBar/NavBar';
import Button from '../../components/Button/Button';
import buttonStyles from '../../styles/buttonStyle';
import FullTappableRow from '../../components/FullTappableRow/FullTappableRow';
import * as actions from '../../actions/TeachAClassActions';
import _ from 'lodash';
import {
  StatusBar,
  StyleSheet,
  Animated,
  LayoutAnimation,
  Text,
  TextInput,
  View,
  Dimensions,
  ListView,
  Image,
  TouchableHighlight,
  Easing
} from 'react-native';


class SkillLevel extends Component {
  constructor(...args) {
    super(...args);
    this.state = {}
  }

  render() {
    const {beginner, intermediate, advanced} = _.get(this.props, 'teachAClassFlow.skillLevel', {})
    return (
      <View style={{marginTop: 0, flex: 1, flexDirection: 'column'}}>
        <View style={{marginTop: 70, flex: 1}}>
          <Text>What skill category will you be teaching?</Text>

          <FullTappableRow active={beginner === true} hideIcon={true} title={'Beginner'} onPress={() => actions.addSkillLevel('beginner', !beginner)} />
          <FullTappableRow active={intermediate === true} hideIcon={true} title={'Intermediate'} onPress={() => actions.addSkillLevel('intermediate', !intermediate)} />
          <FullTappableRow active={advanced === true} hideIcon={true} title={'Advanced'} onPress={() => actions.addSkillLevel('advanced', !advanced)} />
                    
          
          <Button cta="next" disabled={!beginner && !intermediate && !advanced}  onPress={this.goToCategory.bind(this)} />
        </View>

        <NavBar title={'Choose Skill Levels'} leftAction={this.props.goBack.bind(this)}  />
      </View>
    );
  }

  goToCategory() {
    this.props.onNavigation({ type: 'push', key: 'CreateService' })
  }

}

export default branch(SkillLevel, {
  cursors: {
    user: ['user'],
    teachAClassFlow: ['teachAClassFlow']
  }
});