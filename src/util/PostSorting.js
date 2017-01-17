const earthRadius = 3959; // in miles

const sortByDistance = function(currentLocation, posts) {
  posts.sort((post1, post2) => {
    // calculate distance between post1 and currentLocation
    const latDistance1 = Math.pow(post1.latitude - currentLocation.latitude, 2);
    const longDistance1 = Math.pow(post1.longitude - currentLocation.longitude, 2);
    const d1 = Math.sqrt(latDistance1 + longDistance1);

    // calculate distance between post2 and currentLocation
    const latDistance2 = Math.pow(post2.latitude - currentLocation.latitude, 2);
    const longDistance2 = Math.pow(post2.longitude - currentLocation.longitude, 2);
    const d2 = Math.sqrt(latDistance2 + longDistance2);

    // Sort in ascending order (closest to furthest from the user)
    return d1 - d2;
  });
  return posts;
};

// Sorts from newest to oldest
const sortByTime = (posts) => {
  posts.sort((post1, post2) => {
    return new Date(post2.createdAt) - new Date(post1.createdAt);
  });
  return posts;
};

// Convert degrees to radians
const _degreesToRad = function(degree) {
  return degree * (Math.PI / 180);
};

// Sorts by upvotes minus downvotes
const sortByVotes = function(posts) {
  posts.sort((post1, post2) => {
    return (post2.upVotes - post2.downVotes) - (post1.upVotes - post1.downVotes);
  });
  return posts;
};

// Returns an object with arrays as values
const sortByCategory = (posts) => {
  const sortedPosts = {};

  posts.forEach((post) => {
    const category = post.category;
    sortedPosts[category] = sortedPosts[category] || [];
    sortedPosts[category].push(post);
  });

  return sortedPosts;
};

exports.sortByDistance = sortByDistance;
exports.sortByTime = sortByTime;
exports.sortByVotes = sortByVotes;
exports.sortByCategory = sortByCategory;
