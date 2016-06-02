import Baobab from 'baobab';
import getInitialState from './InitialState';

const {cursors, facets} = getInitialState();
const tree = new Baobab(_.merge(cursors, facets), {immutable: false, pure: false});


export default tree;