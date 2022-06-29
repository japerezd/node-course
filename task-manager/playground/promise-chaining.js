require('../src/db/mongoose');
const User = require('../src/models/user');

User.findByIdAndUpdate('62bb53976ac79d51497e4ec0', { age: 1 }).then((user) => {
  console.log(user);
  return User.countDocuments({ age: 1 })
}).then(result => {
  console.log(result);
}).catch(e => console.log(e));