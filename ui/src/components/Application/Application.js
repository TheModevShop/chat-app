import React from 'react';
import Hammer from 'react-hammerjs';
import {root} from 'baobab-react/higher-order';
import tree from 'state/StateTree';
import GlobalModals from 'components/GlobalModals';
import AppHeader from 'components/AppHeader';
import $ from 'jquery';
import _ from 'lodash';
import './app.less';

class App extends React.Component {
  render() {
    const classNames = _.reduce(this.props.routes, (accum, route) => {
      if (route.pageName) {
        accum += route.pageName + ' ';
      }
      return accum;
    }, '');
    return (
      
        <span>
          <AppHeader {...this.props} />
          <div className={classNames.trim()+'-wrapper ' + 'main-container'}>
            <div className={classNames + 'pages'}>
                {this.props.children}
            </div>
            <GlobalModals />
          </div>
        </span>
      
    );
  }
  killRubberBandBounce(e) {
    var scrollTarget = e.target.closest(".scrollable-rb");
    if(scrollTarget && scrollTarget !== []) {
      var scrollTopMax = scrollTarget.scrollHeight - scrollTarget.offsetHeight;
      if(scrollTopMax > 0){
        var scrollTop = scrollTarget.scrollTop;
        if(scrollTop > 0 && scrollTop < scrollTopMax) { 
          console.log('g') 
          return true;
        } 
        else if(scrollTop <= 0 && e.deltaY < 0){
          console.log('g') 
          return true
        } 
        else if(scrollTop >= scrollTopMax && e.deltaY > 0){
         console.log('g') 
         return true
       }
        else {
          console.log('1')
          e.preventDefault();
        }
      } else {
        console.log('2')
        e.preventDefault();
      }
    } else {
      console.log('3')
      e.preventDefault();
    }
  }
}



App.contextTypes = {
  history: React.PropTypes.object
};

export default root(App, tree);