import React, { Component } from 'react';
import Chat from '../../Chat/Chat';
import Conversations from '../../Conversations/Conversations';

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
  key: 'Chat',
  routes: [{key: 'Conversations'}]
})

class ChatController extends Component {

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
    if (key === 'Chat') return <Chat goBack={this.handleBackAction.bind(this)}  />
    if (key === 'Conversations') return <Conversations onNavigation={this._handleAction.bind(this)} />
  }

  _renderScene(props) {
    const ComponentToRender = this._renderRoute(props.scene.route.key);
    return (
      <View style={styles.View}>
        {ComponentToRender}
      </View>
    );
  }

  render() {
    return (
      <NavigationCardStack
        onNavigateBack={this.handleBackAction.bind(this)}
        navigationState={this.state.navState}
        onNavigate={this._handleAction.bind(this)}
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

export default ChatController;