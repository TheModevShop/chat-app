import React, { Component } from 'react';
import Home from '../../Home/Home';
import SessionDetails from '../../SessionDetails/SessionDetails';
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
  routes: [{key: 'Sessions'}]
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
    this.setState({
      navState: newState
    })
    return true;
  }

  handleBackAction() {
    return this._handleAction({ type: 'pop' });
  }

  _renderRoute (key) {
    if (key === 'Sessions') return <Home onNavigation={this._handleAction.bind(this, { type: 'push', key: 'SessionDetails' })} />
    if (key === 'SessionDetails') return <SessionDetails goBack={this.handleBackAction.bind(this)} onNavigation={this._handleAction.bind(this, { type: 'push', key: 'SessionDetails' })} />
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
        renderScene={this._renderScene.bind(this)} />
    )
  }
}


const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#F5FCFF',
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF'
  },
  title: {
    fontSize: 40,
    marginTop: 200,
    textAlign: 'center'
  },
  button: {
    height: 70,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#EDEDED'
  }
})

export default HomeController;