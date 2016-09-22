import React, { Component } from 'react';
import TeachAClass from '../../TeachAClass/TeachAClass';
import ChooseASkill from '../../TeachAClass/ChooseASkill';
import SkillLevel from '../../TeachAClass/SkillLevel';
import CreateService from '../../TeachAClass/CreateService';
import EquipmentRequired from '../../TeachAClass/EquipmentRequired';
import ServiceOverview from '../../TeachAClass/ServiceOverview';
import ServiceCreatedConfirmation from '../../TeachAClass/ServiceCreatedConfirmation';

// Styles
import * as styleConstants from '../../../styles/styleConstants';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  NavigationExperimental,
  ScrollView
} from 'react-native'

const {
  CardStack: NavigationCardStack,
  StateUtils: NavigationStateUtils
} = NavigationExperimental

function createReducer(initialState) {
  return (currentState = initialState, action) => {
    switch (action.type) {
      case 'push':
        return NavigationStateUtils.push(currentState, {key: action.key});
      case 'pop':
        return currentState.index > 0 ? NavigationStateUtils.pop(currentState) : currentState;
      default:
        return currentState;
    }
  };
}

const NavReducer = createReducer({
  index: 0,
  key: 'App',
  routes: [{key: 'TeachAClass'}]
})

class TeachAClassController extends Component {

  constructor(props) {
    super(props)
    this.state = {
      navState: NavReducer(undefined, {})
    }
  }

  _handleAction (action) {
    const newState = NavReducer(this.state.navState, action);
    if (newState === this.state.navState) {
      return false;
    }
    this.setState({
      navState: newState
    })
    return true;
  }

  handleBackAction() {
    return this._handleAction({ type: 'pop' });
  }

  _renderRoute (key) {
    if (key === 'TeachAClass') return <TeachAClass goBack={this.props.goBack.bind(this)} onNavigation={this._handleAction.bind(this)} />
    if (key === 'ChooseASkill') return <ChooseASkill goBack={this.handleBackAction.bind(this)} onNavigation={this._handleAction.bind(this)} />
    if (key === 'SkillLevel') return <SkillLevel goBack={this.handleBackAction.bind(this)} onNavigation={this._handleAction.bind(this)} />
    if (key === 'SkillLevel') return <SkillLevel goBack={this.handleBackAction.bind(this)} onNavigation={this._handleAction.bind(this)} />
    if (key === 'CreateService') return <CreateService goBack={this.handleBackAction.bind(this)} onNavigation={this._handleAction.bind(this)} />
    if (key === 'EquipmentRequired') return <EquipmentRequired goBack={this.handleBackAction.bind(this)} onNavigation={this._handleAction.bind(this)} />
    if (key === 'ServiceOverview') return <ServiceOverview goBack={this.handleBackAction.bind(this)} onNavigation={this._handleAction.bind(this)} />
    if (key === 'ServiceCreatedConfirmation') return <ServiceCreatedConfirmation onComplete={this.props.goBack.bind(this)} onNavigation={this._handleAction.bind(this)} />
  }

  _renderScene(props) {
    const ComponentToRender = this._renderRoute(props.scene.route.key)
    return (
      <View style={styles.scrollView}>
        {ComponentToRender}
      </View>
    );
  }

  render() {
    return (
      <NavigationCardStack
        navigationState={this.state.navState}
        onNavigate={this._handleAction.bind(this)}
        onNavigateBack={this.handleBackAction.bind(this)}
        renderScene={this._renderScene.bind(this)} />
    )
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: styleConstants.SILVER,
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: styleConstants.SILVER,
  }
})


export default TeachAClassController;