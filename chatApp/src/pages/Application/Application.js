import React, { Component } from 'react';
import {branch} from 'baobab-react/higher-order';
import _ from 'lodash';
import {checkSession} from '../../actions/AuthenticationActions';
import {openLightBox} from '../../actions/ModalActions';

import ApplicationTabs from './ApplicationTabs';
import AccountSettingsController from './Controllers/AccountSettingsController';
import TeachAClassController from './Controllers/TeachAClassController';
import AvailabilityController from './Controllers/AvailabilityController';
import BookSessionController from './Controllers/BookSessionController';

import Login from '../Login/Login';
import Initial from '../Initial/Initial';
import Settings from '../AccountSettings/Settings';

// Styles
import * as styleConstants from '../../styles/styleConstants';

// EXTRAS
import Modal from '../../components/Modal/Modal';
import Lightbox from '../../components/Lightbox/Lightbox';
import Hud from '../../components/Hud/Hud';

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
  routes: [{key: 'Initial'}]
})

class ApplicationController extends Component {
  async componentDidMount() {
    const session = await checkSession();
    if (session) {
      setTimeout(() => {
        this._handleAction({ type: 'push', key: 'ApplicationTabs' });
         setTimeout(() => {
          this.setState({session: true});
          this.openLightboxes(this.props);
        }, 500)
      }, 800)
    } else {
      this._handleAction({ type: 'push', key: 'Login' })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.session) {
      this.openLightboxes(nextProps)
    }
  }

  openLightboxes(props) {
    if (!this.state.bookingsWithAttention && _.get(props, 'bookingsThatNeedCompletion.length')) {
      this.setState({bookingsWithAttention: true}, () => {
        openLightBox({
          type: 'BookingNeedsCompletion'
        }); 
      })
    } else if(false) {
      openLightBox({
        type: 'completeUserProfile'
      }); 
    }
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
      navState: newState,
      activeView: action.key
    })
    return true;
  }

  handleBackAction() {
    return this._handleAction({ type: 'pop' });
  }

  _renderRoute (key) {
    if (key === 'ApplicationTabs') return <ApplicationTabs onNavigation={this._handleAction.bind(this)} />
    if (key === 'Login') return <Login goBack={this.handleBackAction.bind(this)} onNavigation={this._handleAction.bind(this)} />
    if (key === 'AccountSettings') return <AccountSettingsController onLogout={this._handleAction.bind(this, {type: 'push', key: 'Login'})} goBack={this.handleBackAction.bind(this)} onNavigation={this._handleAction.bind(this)} />
    if (key === 'Settings') return <Settings goBack={this.handleBackAction.bind(this)} onNavigation={this._handleAction.bind(this)} />
    if (key === 'Initial') return <Initial />
    if (key === 'TeachAClass') return <TeachAClassController goBack={this.handleBackAction.bind(this)} onNavigation={this._handleAction.bind(this)} />
    if (key === 'AvailabilityToggle') return <AvailabilityController goBack={this.handleBackAction.bind(this)} onNavigation={this._handleAction.bind(this)} />
    if (key === 'BookSessionModal') return <BookSessionController goBack={this.handleBackAction.bind(this)} onNavigation={this._handleAction.bind(this)} />
  }

  _renderScene(props) {
    const hudTitle = _.get(this.props, 'hud.hudTitle') 
    const ComponentToRender = this._renderRoute(props.scene.route.key)
    return (
      <View style={styles.scrollView}>
        {ComponentToRender}
        <Modal />
        <Lightbox />
        {hudTitle ? <Hud title={hudTitle} /> : null}
      </View>
    );
  }

  render() {
    return (
        <NavigationCardStack
          gestureResponseDistance={this.state.activeView !== 'ApplicationTabs' ? 90 : 0}
          direction={'vertical'}
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


export default branch(ApplicationController, {
  cursors: {
    authentication: ['authentication', 'sessionData'],
    paymentMethods: ['facets', 'PaymentMethods'],
    bookingsThatNeedCompletion: ['facets', 'BookingsThatNeedCompletion'],
    hud: ['hud']
  }
});