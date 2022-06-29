require('../src/db/mongoose');
const Task = require('../src/models/task');

Task.findByIdAndDelete('62bb16efeb349f24dea5a581').then((task) => {
  console.log(task);
  return Task.countDocuments({ completed: false })
}).then(result => {
  console.log(result);
}).catch(e => console.log(e));