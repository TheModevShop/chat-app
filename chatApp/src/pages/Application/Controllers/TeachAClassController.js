import React, { Component } from 'react';
import TeachAClass from '../../TeachAClass/TeachAClass';
import ChooseASkill from '../../TeachAClass/ChooseASkill';
import SkillLevel from '../../TeachAClass/SkillLevel';
import CreateService from '../../TeachAClass/CreateService';
import EquipmentRequired from '../../TeachAClass/EquipmentRequired';
import ServiceOverview from '../../TeachAClass/ServiceOverview';
import ServiceCreatedConfirmation from '../../TeachAClass/ServiceCreatedConfirmation';
import ServiceLocation from '../../TeachAClass/ServiceLocation';
import * as actions from '../../../actions/TeachAClassActions';

// Styles
import * as styleConstants from '../../../styles/styleConstants';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  NavigationExperimental,
  ScrollView,
  Dimensions
} from 'react-native';

const windowWidth = Dimensions.get('window').width;

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
  async componentWillMount() {
    await actions.getCurrentAddServiceProgress()
  }

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
    if (key === 'TeachAClass') { 
      this.percentComplete = 0;
      return <TeachAClass goBack={this.props.goBack ? this.props.goBack.bind(this) : () => {}} onNavigation={this._handleAction.bind(this)} />
    }
    else if (key === 'ChooseASkill') { 
      this.percentComplete = 0.14;
      return <ChooseASkill goBack={this.handleBackAction.bind(this)} onNavigation={this._handleAction.bind(this)} />
    }
    else if (key === 'SkillLevel') { 
      this.percentComplete = 0.28;
      return <SkillLevel goBack={this.handleBackAction.bind(this)} onNavigation={this._handleAction.bind(this)} />
    }
    else if (key === 'CreateService') { 
      this.percentComplete = 0.42;
      return <CreateService goBack={this.handleBackAction.bind(this)} onNavigation={this._handleAction.bind(this)} />
    }
    else if (key === 'ServiceLocation') { 
      this.percentComplete = 0.56;
      return <ServiceLocation goBack={this.handleBackAction.bind(this)} onNavigation={this._handleAction.bind(this)} />
    }
    else if (key === 'EquipmentRequired') { 
      this.percentComplete = 0.7;
      return <EquipmentRequired goBack={this.handleBackAction.bind(this)} onNavigation={this._handleAction.bind(this)} />
    }
    else if (key === 'ServiceOverview') { 
      this.percentComplete = 0.84;
      return <ServiceOverview goBack={this.handleBackAction.bind(this)} onNavigation={this._handleAction.bind(this)} />
    }
    else if (key === 'ServiceCreatedConfirmation') { 
      this.percentComplete = 1;
      return <ServiceCreatedConfirmation onComplete={this.props.goBack ? this.props.goBack.bind(this) : () => {}} onNavigation={this._handleAction.bind(this)} />
    }
  }

  _renderScene(props) {
    const ComponentToRender = this._renderRoute(props.scene.route.key)
    return (
      <View style={styles.scrollView}>
        {ComponentToRender}
        <View style={{position: 'absolute', zIndex: 100, top: 60, backgroundColor: styleConstants.ALUMINUM, height: 10, left:0, right: 0}}>
          <View style={{position: 'absolute', backgroundColor: styleConstants.DARKBLUE, height: 10, left: 0, width: windowWidth*this.percentComplete }}></View>
        </View>
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