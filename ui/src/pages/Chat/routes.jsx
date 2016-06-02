import React from 'react';
import tree from 'state/StateTree';
import {Route, Redirect} from 'react-router';

function getComponents(location, cb) {
  require.ensure([], (require) => {
    cb(null, require('./Chat'));
  });
}

function onEnter(nextState, replaceState, callback) {
  callback();
};

export default (
  <Route>
    <Route pageName="chat" path="/" getComponents={getComponents} onEnter={onEnter}/>
    <Route pageName="chat" path="/chat" getComponents={getComponents} onEnter={onEnter} />
  </Route>
);