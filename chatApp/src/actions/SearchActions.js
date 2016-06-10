import tree from '../state/StateTree';
const sessionSearch = tree.select(['sessionSearch']);
const debounceSearch = _.debounce(search, 300);

export async function setSearch(query) {
  sessionSearch.set('query', query);
  tree.commit();
  if (query) {
    debounceSearch(query);
  }
}

export function clearSearch() {
  sessionSearch.set({
    query: '',
    results: ''
  });
}

async function search(query) {
  sessionSearch.set(['results', 'stale'], true);
  tree.commit();
}