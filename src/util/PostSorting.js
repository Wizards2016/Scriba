const earthRadius = 3959; // in miles

// Calculates distance based on the Haversine formula
sortByDistance = function(currentLocation, posts) {
  posts.sort((post1, post2) => {
    // calculate distance between post1 and currentLocation
    const latDistance1 = _degreesToRad(post1.latitude - currentLocation.latitude);
    const longDistance1 = _degreesToRad(post1.longitude - currentLocation.longitude);
    const a1 = Math.pow(Math.sin(latDistance1 / 2), 2);
    const b1 = Math.cos(currentLocation.latitude) * Math.cos(post1.latitude) * Math.pow(Math.sin(longDistance1 / 2), 2);
    const d1 = 2 * earthRadius * Math.sqrt(a1 + b1);

    // calculate distance between post2 and currentLocation
    const latDistance2 = _degreesToRad(post2.latitude - currentLocation.latitude);
    const longDistance2 = _degreesToRad(post2.latitude - currentLocation.latitude);
    const a2 = Math.pow(Math.sin(latDistance2 / 2), 2);
    const b2 = Math.cos(currentLocation.latitude) * Math.cos(post2.latitude) * Math.pow(Math.sin(longDistance2 / 2), 2);
    const d2 = 2 * earthRadius * Math.sqrt(a2 + b2);

    // Sort in ascending order (closest to furthest from the user)
    return d1 - d2;
  });

  return posts;
};

// Sorts from newest to oldest
sortByTime = function(posts) {
  posts.sort((post1, post2) => {
    return new Date(post2.createdAt) - new Date(post1.createdAt);
  });

  return posts;
};

// Convert degrees to radians
_degreesToRad = function(degree) {
  return degree * (Math.PI / 180);
};

exports.sortByDistance = sortByDistance;
exports.sortByTime = sortByTime;
