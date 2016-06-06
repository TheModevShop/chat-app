import tree from '../state/StateTree';
import {editMeApi, getUser} from '../api/userApi';
import _ from 'lodash';
import {teardownSession} from '../actions/AuthenticationActions';
const userCursor = tree.select(['user']);

export async function getMe() {
  try {
    const user = await getUser();
    if (user.body._id) {
      userCursor.set(['details'], user.body);
      tree.commit();
      return user.body;
    } else {
      userCursor.set(['details'], null);
      teardownSession();
      // history.push('/login');
    }
    return user;
  } catch(err) {
    teardownSession();
    // history.push('/login');
  }
}