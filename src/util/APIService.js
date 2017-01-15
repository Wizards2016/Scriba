const Promise = require('bluebird');
const baseURL = 'http://127.0.0.1:8000';
const votesURL = `${baseURL}/votes`;
const messagesURL = `${baseURL}/messages`;
const usersURL = `${baseURL}/users`;

const appendParams = (url, params) => {
  Object.keys(params).forEach((key) => {
    url.searchParams.append(key, params[key]);
  });
  return url;
};

module.exports = {
  get: {
    vote: (data) => {
      // Append query parameters to URL
      const url = appendParams(new URL(votesURL), data);
      return new Promise((resolve, reject) => {
        fetch(url.href, {
          method: 'GET'
        })
        .then(response => resolve(response))
        .catch(error => reject(error));
      });
    },
    message: (data) => {
      // Append query parameters to URL
      const url = appendParams(new URL(messagesURL), data);
      return new Promise((resolve, reject) => {
        fetch(url.href, {
          method: 'GET'
        })
        .then(response => resolve(response))
        .catch(error => reject(error));
      });
    },
    user: (data) => {
      // Append query parameters to URL
      const url = appendParams(new URL(usersURL), data);
      return new Promise((resolve, reject) => {
        fetch(url.href, {
          method: 'GET'
        })
        .then(response => resolve(response))
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
            userAuth: data.userAuth,
            displayName: data.displayName
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
            displayName: data.displayName
          })
        })
        .then(response => resolve(response))
        .catch(error => reject(error));
      });
    }
  }
};
