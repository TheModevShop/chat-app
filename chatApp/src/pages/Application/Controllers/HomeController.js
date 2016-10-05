import React, { Component } from 'react';
import Home from '../../Home/Home';
import ListingDetails from '../../ListingDetails/ListingDetails';
import SessionDetails from '../../SessionDetails/SessionDetails';
import SkillAvailability from '../../SkillAvailability/SkillAvailability';
import Chat from '../../Chat/Chat';

// Styles
import * as styleConstants from '../../../styles/styleConstants';

// Actions
import {invalidateListingCache} from '../../../actions/ListingActions';

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
  routes: [{key: 'Listings'}]
})

class HomeController extends Component {

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

    this.invalidateCache();

    this.setState({
      navState: newState
    });
    return true;
  }

  handleBackAction() {
    return this._handleAction({ type: 'pop' });
  }

  invalidateCache() {
    invalidateListingCache()
  }

  _renderRoute (key) {
    if (key === 'Listings') return <Home onNavigation={this._handleAction.bind(this)} />
    if (key === 'ListingDetails') return <ListingDetails goBack={this.handleBackAction.bind(this)} onNavigation={this._handleAction.bind(this)} />
    if (key === 'SessionDetails') return <SessionDetails goBack={this.handleBackAction.bind(this)} onNavigation={this._handleAction.bind(this)} />
    if (key === 'SkillAvailability') return <SkillAvailability goBack={this.handleBackAction.bind(this)} onNavigation={this._handleAction.bind(this)} />
    if (key === 'Chat') return <Chat goBack={this.handleBackAction.bind(this)}  />
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

export default HomeController;