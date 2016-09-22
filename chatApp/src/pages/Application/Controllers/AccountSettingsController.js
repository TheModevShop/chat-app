import React, { Component } from 'react';
import Account from '../../AccountSettings/Account';
import AddPaymentMethod from '../../AccountSettings/AddPaymentMethod';
import PaymentMethodList from '../../AccountSettings/PaymentMethodList';
import SetPassword from '../../AccountSettings/SetPassword';
import Profile from '../../AccountSettings/Profile';

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
} = NavigationExperimental;

let verticle;

function createReducer(initialState) {
  return (currentState = initialState, action) => {
    switch (action.type) {
      case 'push':
        return NavigationStateUtils.push(currentState, {key: action.key});
      case 'pop':
        return currentState.index > 0 ? NavigationStateUtils.pop(currentState) : currentState;
      case 'back':
        return currentState.index > 0 ? NavigationStateUtils.pop(currentState) : currentState;
      default:
        return currentState;
    }
  };
}

const NavReducer = createReducer({
  index: 0,
  key: 'App',
  routes: [{key: 'Account'}]
})

class AccountSettingsController extends Component {

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
    const state = {
      navState: newState,
    }

    if (action.type === 'push') {
      state.direction = action.key === 'TODO' ? 'vertical' : 'horizontal'
    }

    this.setState(state)
    return true;
  }

  handleBackAction() {
    return this._handleAction({ type: 'pop' });
  }

  _renderRoute (key) {
    verticle = false;
    if (key === 'Account') return <Account goBack={this.props.goBack.bind(this)} onNavigation={this._handleAction.bind(this)} />
    if (key === 'AddPaymentMethod') return <AddPaymentMethod goBack={this.handleBackAction.bind(this)} onNavigation={this._handleAction.bind(this)} />
    if (key === 'PaymentMethodList') return <PaymentMethodList goBack={this.handleBackAction.bind(this)} onNavigation={this._handleAction.bind(this)} />
    if (key === 'Profile') return <Profile goBack={this.handleBackAction.bind(this)} onNavigation={this._handleAction.bind(this)} />
  }

  _renderScene(props) {
    const ComponentToRender = this._renderRoute(props.scene.route.key);
    return (
      <View style={styles.scrollView}>
        {ComponentToRender}
      </View>
    );
  }

  render() {
    return (
      <NavigationCardStack
        verticalDistance={90}
        direction={this.state.direction}
        navigationState={this.state.navState}
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
    justifyContent: 'center',
    backgroundColor: styleConstants.SILVER
  },
 
})

export default AccountSettingsController;