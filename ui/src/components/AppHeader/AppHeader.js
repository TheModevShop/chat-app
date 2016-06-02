import React from 'react';
import {branch} from 'baobab-react/higher-order';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Tappable from 'react-tappable';

import './app-header.less';

class AppHeader extends React.Component {
  render() { 
    return (
      <header className={`app-header ${!this.props.mobileMapView ? 'map-closed' : 'map-open'}`}>
        
    
      </header>
    );
  }

};

export default branch(AppHeader, {
  cursors: {
  
  }
});
