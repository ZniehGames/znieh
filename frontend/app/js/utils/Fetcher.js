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

    postQ(uri, body) {
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

    post(uri, body, success, fail) {
        fetch(config.api + uri, {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        })
        .then(status)
        .then(json)
        .then((json) => success())
        .catch((e) => fail());
    }
}

export default new Fetcher();
