import tree from '../state/StateTree';
import _ from 'lodash';
import {addChatToUi} from './ChatActions';
import * as api from '../api/sessionApi';
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

export async function addSession(session) {
  try {
    const addedSession = await api.addSession(JSON.stringify(session));
    console.log(addedSession);
  } catch(err) {
    console.log(err)
  }
}