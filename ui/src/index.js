import React from 'react';
import tree from 'state/StateTree';
import {render} from 'react-dom';
import {Router} from 'react-router';
import Modal from 'react-modal';
import routes from './components/Application/routes';
import history from './appHistory';
import es6Promise from 'es6-promise';
import "babel-core/polyfill";
import $ from "jquery";
import UAParser from 'ua-parser-js';
import {checkSession} from './actions/AuthenticationActions';

es6Promise.polyfill();
const uaParser = new UAParser();

const appElement = document.getElementById('modal');
Modal.setAppElement(appElement);

getSession();
async function getSession() {
  try {
    await checkSession();
    renderApp()
  } catch (err) {
    renderApp()
  }
}

function renderApp() {
  render(<Router history={history}>{routes}</Router>, document.getElementById('container'));
}