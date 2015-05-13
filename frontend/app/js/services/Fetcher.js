'use strict';

import config from '../config';

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  throw new Error(response.statusText)
};

function json(response) {
   return response.json()
};

class Fetcher {

  get(uri) {
    return fetch(config.api + uri, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(status)
    .then(json);
  }

  post(uri, body) {
    return fetch(config.api + uri, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      .then(status)
      .then(json);
  }
}

export default new Fetcher();
