const API = require('./APIService');
const PostSorting = require('./PostSorting');

const populateUserData = function(context) {
  // Grab data from the database and store for later use
  return new Promise((resolve, reject) => {
    API.get.message({
      displayName: context.displayName
    })
    .then(response => response.json())
    .then((JSONresponse) => {
      context.messages = JSONresponse;
    })
    .then(() => API.get.vote({
      displayName: context.displayName
    }))
    .then(response => response.json())
    .then((JSONresponse) => {
      context.votes = JSONresponse;
    })
    .then(() => API.get.user({
      displayName: context.displayName
    }))
    .then(response => response.json())
    .then((JSONresponse) => {
      context.user = JSONresponse;
    })
    .then(() => resolve(context))
    .catch(error => reject(error));
  });
};

const UserStats = function (displayName, userAuth) {
  this.displayName = displayName;
  this.userAuth = userAuth;

  this.messages = undefined;
  this.votes = undefined;
  this.user = undefined;

  return new Promise((resolve, reject) => {
    populateUserData(this)
    .then(userStats => resolve(userStats))
    .catch(error => reject(error));

  });
};

UserStats.prototype.getVoteStats = function () {
  // Number of upvotes,
  // Number of downvotes
  // All posts sorted by votes
  return {
    upVotes: this.user.upVotes,
    downVotes: this.user.downVotes,
    popular: PostSorting.sortByVotes(this.messages)
  };
};

UserStats.prototype.getPostStats = function () {
  // Sort the messages by category
  const postsByCateory = PostSorting.sortByCategory(this.messages);
  // Sort the messages by number of upvotes
  for (const key in postsByCateory) {
    postsByCateory[key] = PostSorting.sortByVotes(postsByCateory[key]);
  }
  // Get the number of posts per category
  const totalByCategory = {};
  for (const key in postsByCateory) {
    totalByCategory[key] = postsByCateory[key].length;
  }

  // Total number of posts by this user
  // Number of posts per category
  // Posts sorted by categories, then by upvotes
  return {
    totalPosts: this.user.totalPosts,
    totalByCategory: totalByCategory,
    popularByCategory: postsByCateory
  };
};

exports.UserStats = UserStats;
