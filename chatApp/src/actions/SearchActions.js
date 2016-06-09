import tree from '../state/StateTree';
const sessionSearch = tree.select(['sessionSearch']);

export function setSearch(value) {
  sessionSearch.set('query', value);
  sessionSearch.set(['results', 'stale'], true);
  tree.commit();
}