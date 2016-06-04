import Baobab from 'baobab';
import getInitialState from './InitialState';
import _ from 'lodash';

const {cursors, facets} = getInitialState();
const tree = new Baobab(_.merge(cursors, facets), {immutable: false, pure: false});


export default tree;