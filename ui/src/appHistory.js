import {browserHistory} from 'react-router';
import {canUseDOM} from 'exenv';

// Replace hash routes from old urls
if (canUseDOM && window.location.hash && window.history.replaceState) {
  const pathname = window.location.hash.split('#')[1];
  window.history.replaceState(null, null, pathname);
}

const history = browserHistory;

let state;
let prevState;
if (canUseDOM) {
  history.listen((s) => {
    prevState = state;
    state = s;
    state.previous = prevState;
  })
}

export function getState() {
  return state || {};
}

export default history;