import tree from '../state/StateTree';
import bluebird from 'bluebird';
import {fetchToken} from '../api/authApi';
import {getMe} from '../actions/UserActions';
import resetState from '../state/ResetStateTree';
import {AppRegistry, AsyncStorage} from 'react-native';
import {FBLoginManager} from 'react-native-facebook-login';

const authentication = tree.select(['authentication']);

export async function getAuthentication(data) {
  const {email, password} = data;
  try {
    const token = await fetchToken({email, password});
    await buildSession(token.body.token);
    return token;
  } catch (e) {
    authentication.set('error', e);
    return false;
  }
}

function checkFacebookForSession() {
  return new bluebird((resolve, reject) => {    
     FBLoginManager.loginWithPermissions(["email","user_friends"], function(error, data){
      if (!error) {
        resolve(data)            
      } else {
        reject(error)
      }
    })
  });
}

export async function checkSession() {
  try {
    const user = await getMe();
    if (user._id) {
      const session = await AsyncStorage.getItem('sessionData');
      authentication.set(['sessionData'], session);
      tree.commit();
      return true;
    } else {
      // go to login
      teardownSession();
      return false;
    }
  } catch (err) {
    teardownSession();
    return false;
  }
}

async function buildSession(session) {
  authentication.set(['sessionData'], session);
  await AsyncStorage.setItem('sessionData', session);
  tree.commit();
  return await getMe();
}

export async function teardownSession() {
  resetState();
  await AsyncStorage.removeItem('sessionData');
  authentication.set({});
  tree.commit();

}

