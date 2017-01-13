const Promise = require('bluebird');
const baseURL = 'http://127.0.0.1:8000';

module.exports = {
  get: {
    message: (data) => {
      // Append query parameters to URL
      const url = new URL(`${baseURL}/messages`);
      Object.keys(data).forEach((key) => {
        url.searchParams.append(key, data[key]);
      });
      return new Promise((resolve, reject) => {
        fetch(url.href, {
          method: 'GET'
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
      });
    },
    user: (data) => {
      // Append query parameters to URL
      const url = new URL(`${baseURL}/users`);
      Object.keys(data).forEach((key) => {
        url.searchParams.append(key, data[key]);
      });
      return new Promise((resolve, reject) => {
        fetch(url.href, {
          method: 'GET'
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
      });
    }
  },
  post: {
    vote: (data) => {
      return new Promise((resolve, reject) => {
        fetch(`${baseURL}/votes`, {
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
        fetch(`${baseURL}/messages`, {
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
