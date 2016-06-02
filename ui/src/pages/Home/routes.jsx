import React from 'react';
import tree from 'state/StateTree';
import {Route, Redirect} from 'react-router';

function getComponents(location, cb) {
  require.ensure([], (require) => {
    cb(null, require('./Home'));
  });
}

function onEnter(nextState, replaceState, callback) {
  callback();
};

export default (
  <Route>
    <Route pageName="home" path="/" getComponents={getComponents} onEnter={onEnter}/>
    <Route pageName="home" path="/home" getComponents={getComponents} onEnter={onEnter} />
  </Route>
);