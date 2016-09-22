import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import Icon from 'react-native-vector-icons/Ionicons';
import {addService} from '../../actions/ListingActions';
import moment from 'moment';
import NavBar from '../../components/NavBar/NavBar';
import buttonStyles from '../../styles/buttonStyle';
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


class ChooseASkill extends Component {
  constructor(...args) {
    super(...args);
    this.state = {}
  }

  render() {
    return (
      <View style={{marginTop: 0, flex: 1, flexDirection: 'column'}}>
        <View style={{marginTop: 70, flex: 1}}>
          <Text>What skill category will you be teaching?</Text>
          
          <TouchableHighlight style={buttonStyles.bottomButton} onPress={this.goToCategory.bind(this)} underlayColor='#99d9f4'>
            <Text style={buttonStyles.buttonText}>
              next
            </Text>
          </TouchableHighlight>
        </View>

        <NavBar title={'Choose a Skill'} leftAction={this.props.goBack.bind(this)} leftActionIcon={'ios-close'} />
      </View>
    );
  }

  goToCategory() {
    this.props.onNavigation({ type: 'push', key: 'SkillLevel' })
  }


}

export default branch(ChooseASkill, {
  cursors: {
    user: ['user']
  }
});