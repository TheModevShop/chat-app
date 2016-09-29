import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import Icon from 'react-native-vector-icons/Ionicons';
import NavBar from '../../components/NavBar/NavBar';
import buttonStyles from '../../styles/buttonStyle';
import Button from '../../components/Button/Button';
import FullTappableRow from '../../components/FullTappableRow/FullTappableRow';
import * as actions from '../../actions/TeachAClassActions'
import _ from 'lodash';
import {
  StatusBar,
  StyleSheet,
  ScrollView,
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


class ChooseASkill extends Component {
  constructor(...args) {
    super(...args);
    this.state = {}
  }

  render() {
    const items = _.get(this.props.skills, 'items', []);
    const teachAClassFlow = this.props.teachAClassFlow || {};
    const category = _.get(teachAClassFlow, 'category', {});
    const skill = _.get(teachAClassFlow, 'skill', null);

    return (
      <View style={{marginTop: 0, flex: 1, flexDirection: 'column'}}>
        <View style={{marginTop: 70, flex: 1}}>
          <Text>What skill category will you be teaching?</Text>
          <Text>{category.name}</Text>


          <ScrollView>
            <View style={{flex: 1, position: 'relative'}}>
              {
                _.map(items, (s, i) => {
                  return (
                    <FullTappableRow hideIcon={true} active={s.id === _.get(skill, 'id')} onPress={this.onTapSkill.bind(this, s)} key={i} subtitle={s.category} title={s.name} topBorder={i === 0} />
                  );
                })
              }
            </View>
          </ScrollView>

          <Button cta="next" disabled={!skill}  onPress={this.goToSkillLevel.bind(this)} />

        </View>

        <NavBar title={'Choose a Skill'} leftAction={this.props.goBack.bind(this)} leftActionIcon={'ios-close'} />
      </View>
    );
  }

  goToSkillLevel() {
    this.props.onNavigation({ type: 'push', key: 'SkillLevel' })
  }

  onTapSkill(skill) {
    actions.addSKill(skill)
  }


}

export default branch(ChooseASkill, {
  cursors: {
    user: ['user'],
    categories: ['facets', 'SkillCategories'],
    skills: ['facets', 'Skills'],
    teachAClassFlow: ['teachAClassFlow']
  }
});