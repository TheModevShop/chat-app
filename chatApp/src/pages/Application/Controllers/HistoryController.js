import React, { Component } from 'react';
import MyBookings from '../../MyBookings/MyBookings';
import BookingDetails from '../../BookingDetails/BookingDetails';

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
  key: 'History',
  routes: [{key: 'MyBookings'}]
})

class HistoryController extends Component {

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
    if (key === 'MyBookings') return <MyBookings onNavigation={this._handleAction.bind(this)} />
    if (key === 'BookingDetails') return <BookingDetails admin={false} goBack={this.handleBackAction.bind(this)} onNavigation={this._handleAction.bind(this)} />
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
        onNavigate={this._handleAction.bind(this)}
        renderScene={this._renderScene.bind(this)} />
    )
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: styleConstants.WHITE,
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: styleConstants.WHITE,
  }
})

export default HistoryController;