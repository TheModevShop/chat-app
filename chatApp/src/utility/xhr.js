import BPromise from 'bluebird';
import request from 'superagent';

export default function(method, url, data, options) {
  const sessionData = localStorage.getItem('sessionData');
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