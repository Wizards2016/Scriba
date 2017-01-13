const Promise = require('bluebird');

module.exports = {
  get: {

  },
  post: {
    vote: (data) => {
      return new Promise((resolve, reject) => {
        fetch('http://127.0.0.1:8000/votes', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            vote: data.vote,
            delete: data.delete,
            messageId: data.messageId,
            userAuth: data.userAuth,
            displayName: data.displayName
          })
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
      });
    },
    message: (data) => {
      return new Promise((resolve, reject) => {
        fetch('http://127.0.0.1:8000/messages', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            text: data.text,
            latitude: data.latitude,
            longitude: data.longitude,
            userAuth: data.userAuth,
            displayName: data.displayName
          })
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
      });
    }
  }
};
