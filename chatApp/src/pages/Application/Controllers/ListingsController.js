import React, { Component } from 'react';
import Listings from '../../Listings/Listings';
import ListingDetails from '../../ListingDetails/ListingDetails';
import AddSession from '../../AddSession/AddSession';
import CustomCalendar from '../../CustomCalendar/CustomCalendar';

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
  routes: [{key: 'Listings'}]
})

class ListingsController extends Component {

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
      state.direction = action.key === 'setListingAvailability' ? 'vertical' : 'horizontal'
    }

    this.setState(state)
    return true;
  }

  handleBackAction() {
    return this._handleAction({ type: 'pop' });
  }

  _renderRoute (key) {
    verticle = false;
    if (key === 'Listings') return <Listings onNavigation={this._handleAction.bind(this, { type: 'push', key: 'ListingDetails' })} />
    if (key === 'ListingDetails') return <ListingDetails admin={true} goBack={this.handleBackAction.bind(this)} onNavigation={this._handleAction.bind(this)} />
    //if (key === 'AddSessionForListing') return <AddSession goBack={this.handleBackAction.bind(this)} onNavigation={this._handleAction.bind(this)} />
    if (key === 'setListingAvailability') {
      return <CustomCalendar goBack={this.handleBackAction.bind(this)} onNavigation={this._handleAction.bind(this)} /> 
    }
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
        verticalDistance={50}
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
    backgroundColor: styleConstants.SILVER,
  }
})
export default ListingsController;