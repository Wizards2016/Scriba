const API = require('./APIService');
const PostSorting = require('./PostSorting');

const UserStats = (displayName, userAuth) => {
  this.displayName = displayName;
  this.userAuth = userAuth;

  this.messages = undefined;
  this.votes = undefined;
  this.user = undefined;

  // Grab data from the database and store for later use
  API.get.message({
    displayName: this.displayName
  })
  .then((messages) => {
    this.messages = messages;
  });

  API.get.vote({
    displayName: this.displayName
  })
  .then((votes) => {
    this.votes = votes;
  });

  API.get.user({
    displayName: this.displayName,
    userAuth: this.userAuth
  })
  .then((user) => {
    this.user = user;
  });
};

UserStats.prototype.getVoteStats = () => {
  // Number of upvotes,
  // Number of downvotes
  // All posts sorted by votes
  return {
    upVotes: this.user.upVotes,
    downVotes: this.user.downVotes,
    popular: PostSorting.sortByVotes(this.messages)
  };
};

UserStats.prototype.getPostStats = () => {
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
