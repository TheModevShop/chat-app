import BPromise from 'bluebird';
import request from 'superagent';
import {AppRegistry, AsyncStorage} from 'react-native';

export default async function(method, url, data, options) {
  let sessionData;
  try {
    sessionData = await AsyncStorage.getItem('sessionData');
  } catch(err) {}
  options = options || {};
  method = method || 'GET';
  return new BPromise((resolve, reject) => {
    if (method === 'POST') {
      return request
        .post(url)
        .send(data)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('x-access-token', sessionData)
        .end(function(err, res) {
          if (err) {
            reject(err)
          } else {
            resolve(res)
          }
      });
    };

    if (method === 'GET') {
       request
        .get(url)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('x-access-token', sessionData)
        .end(function(err, res) {
          if (err) {
            reject(err)
          } else {
            resolve(res)
          }
      });
    };

    if (method === 'PUT') {
       request
        .put(url)
        .send(data)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('x-access-token', sessionData)
        .end(function(err, res) {
          if (err) {
            reject(res)
          } else {
            resolve(res)
          }
      });
    };

    if (method === 'DELETE') {
       request
        .delete(url)
        .send(data)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('x-access-token', sessionData)
        .end(function(err, res) {
          if (err) {
            reject(res)
          } else {
            resolve(res)
          }
      });
    };
  });
}