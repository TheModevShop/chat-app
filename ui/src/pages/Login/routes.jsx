import React from 'react';
import tree from 'state/StateTree';
import {Route, Redirect} from 'react-router';

function getComponents(location, cb) {
  require.ensure([], (require) => {
    cb(null, require('./Login'));
  });
}


export default (
  <Route>
    <Route pageName="login" path="/login" getComponents={getComponents}  />
  </Route>
);