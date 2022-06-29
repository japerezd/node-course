require('../src/db/mongoose');
const Task = require('../src/models/task');

// Task.findByIdAndDelete('62bb16efeb349f24dea5a581').then((task) => {
//   console.log(task);
//   return Task.countDocuments({ completed: false })
// }).then(result => {
//   console.log(result);
// }).catch(e => console.log(e));

const deleteTaskAndCount = async (id) => {
  await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });
  return count;
}

deleteTaskAndCount('62bb45e4e2379b4883f667ab').then(count => {
  console.log(count);
}).catch(error => console.log(error));