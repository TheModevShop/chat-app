import React from 'react';
import {Route} from 'react-router';

function getComponent(location, cb) {
  require.ensure([], (require) => {
    cb(null, require('./Application'));
  });
}

function getChildRoutes(state, cb) {
  require.ensure([], (require) => {
    cb(null, [
      require('pages/Login/routes'),
      require('pages/Home/routes'),
      require('pages/Chat/routes'),
    ]);
  });
}

async function onEnter(nextState, replaceState, callback) {
  callback();
}

export default (
  <Route>
    <Route getComponent={getComponent} getChildRoutes={getChildRoutes} onEnter={onEnter} />
  </Route>
);