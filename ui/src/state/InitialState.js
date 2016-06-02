const req = require.context('./facets', false, /\.js$/);
const facets = {};
req.keys().forEach((path) => {
  const fileName = path.match(/\.\/(.*)/)[1];
  facets[fileName.replace('Facet.js', '')] = req(path)();
});

export default function getInitialState() {
  return {
    cursors: {
      classes: {},
      modal: {},
      chat: {
        activeChat: {
          user: null,
          chats: []
        }
      },
    },
    facets: {facets: facets}
  };
}


