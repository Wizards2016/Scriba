const Promise = require('bluebird');
const baseURL = 'http://127.0.0.1:8000';
const votesURL = `${baseURL}/votes`;
const messagesURL = `${baseURL}/messages`;
const usersURL = `${baseURL}/users`;

const appendParams = (url, params) => {
  url += '?';
  // Add query parameters to the url
  for (const key in params) {
    url += `${key}=${params[key]}&`;
  }
  // Trim off the trailing &
  url = url.slice(0, url.length - 1);

  return url;
};

Promise.config({
  warnings: false
});

module.exports = {
  get: {
    vote: (data) => {
      // Append query parameters to URL
      const url = appendParams(votesURL, data);
      return new Promise((resolve, reject) => {
        fetch(url, {
          method: 'GET'
        })
        .then((response) => {
          if (response.status === 200) {
            resolve(response);
          } else {
            resolve([]);
          }
        })
        .catch(error => reject(error));
      });
    },
    message: (data) => {
      // Append query parameters to URL
      const url = appendParams(messagesURL, data);
      return new Promise((resolve, reject) => {
        fetch(url, {
          method: 'GET'
        })
        .then((response) => {
          if (response.status === 200) {
            resolve(response);
          } else {
            resolve([]);
          }
        })
        .catch(error => reject(error));
      });
    },
    user: (data) => {
      // Append query parameters to URL
      const url = appendParams(usersURL, data);
      return new Promise((resolve, reject) => {
        fetch(url, {
          method: 'GET'
        })
        .then((response) => {
          if (response.status === 200) {
            resolve(response);
          } else {
            resolve([]);
          }
        })
        .catch(error => reject(error));
      });
    }
  },
  post: {
    vote: (data) => {
      return new Promise((resolve, reject) => {
        fetch(votesURL, {
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
        .then(response => resolve(response))
        .catch(error => reject(error));
      });
    },
    message: (data) => {
      return new Promise((resolve, reject) => {
        fetch(messagesURL, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            text: data.text,
            latitude: data.latitude,
            longitude: data.longitude,
            category: data.category,
            subCategory: data.subCategory,
            userAuth: data.userAuth,
            displayName: data.displayName,
            delete: data.delete,
            id: data.id
          })
        })
        .then(response => resolve(response))
        .catch(error => reject(error));
      });
    },
    user: (data) => {
      return new Promise((resolve, reject) => {
        fetch(usersURL, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userAuth: data.userAuth,
            displayName: data.displayName,
            delete: data.delete
          })
        })
        .then(response => resolve(response))
        .catch(error => reject(error));
      });
    }
  }
};
