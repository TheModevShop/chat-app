import InitialState from './InitialState';
import tree from './StateTree';
import _ from 'lodash';

const {cursors, facets} = InitialState();
export default function resetState() {
  tree.set(_.merge(cursors, facets));
  tree.commit();
}