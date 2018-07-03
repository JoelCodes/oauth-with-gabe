function noop() {}
const userDB = {};
function findOrCreateFromGoogle(user, accessToken, cb = noop) {
  if (cb === noop) {
    // return promise
  }
  console.log('User', user, user.id);
  userDB[user.id] = user;
  cb(null, user);
}

function findById(id) {
  return userDB[id];
}
module.exports = {
  findOrCreateFromGoogle,
  findById,
};
