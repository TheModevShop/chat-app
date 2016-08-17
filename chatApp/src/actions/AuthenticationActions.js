import tree from '../state/StateTree';
import bluebird from 'bluebird';
import {fetchToken} from '../api/authApi';
import {getMe} from '../actions/UserActions';
import resetState from '../state/ResetStateTree';
import {AppRegistry, AsyncStorage} from 'react-native';
import {FBLoginManager} from 'react-native-facebook-login';
import _ from 'lodash';

const authentication = tree.select(['authentication']);

export async function getAuthentication(data) {
  const {email, password, userId, tokenExpirationDate} = data;
  try {
    const request = data.token ? await fetchToken({userId: userId, token: data.token, tokenExpirationDate: tokenExpirationDate}) : await fetchToken({email, password});
    await buildSession(request.body.token);
    return request;
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
        reject({error})
      }
    })
  });
}

export async function checkSession() {
  try {
    console.log('fhsdkjfhsdjkfh')
    const user = await getMe();
    console.log(user)
    const facebook = await checkFacebookForSession();
    console.log(facebook)
    if (user.id && !facebook.error) {
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

