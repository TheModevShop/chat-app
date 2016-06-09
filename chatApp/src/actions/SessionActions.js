import tree from '../state/StateTree';
import {addChatToUi} from './ChatActions';
const sessionDetails = tree.select(['sessionDetails']);

export async function setActiveSession(id) {
  sessionDetails.set(['id'], id)
}

export async function resetActiveSession() {
  sessionDetails.set({
    id: null,
    details: null
  })
}