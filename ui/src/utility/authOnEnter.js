import tree from 'state/StateTree';
export default function authOnEnter(redirect, hasAccess) {
  return function onEnter(nextState, replaceState, callback) {
    const session = tree.get(['authentication', 'sessionData']);
    if (!session) {
      replaceState(null, '/'+redirect);
    }
    callback();
  };
}