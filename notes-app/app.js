// const fs = require('fs');

// fs.writeFileSync('notes.txt', 'My name is Jorge');

// fs.appendFileSync('notes.txt', '\nThis is an appended text');

// const add = require('./utils')
// const sum = add(4, -2)

// console.log(sum);

// const validator = require('validator')
// const getNotes = require('./notes')

// console.log(getNotes());
// console.log(validator.isEmail('jorge@example.com'));
// console.log(validator.isEmail('example.com'));
// console.log(validator.isURL('https://mead.io'));

const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes');
// const log = console.log;
// log(chalk.blue.bold.inverse('Error!'));
// console.log(process.argv[2])

// Customize yargs version
yargs.version('1.1.0');

// create add command
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
  },
  handler({ title, body }) {
    notes.addNote(title, body);
  },
});

// create remove command
yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'Title to be removed',
      demandOption: true,
      type: 'string',
    },
  },
  handler({ title }) {
    notes.removeNote(title);
  },
});

// create list command
yargs.command({
  command: 'list',
  describe: 'List your notes',
  handler() {
    notes.listNotes();
  },
});

// create read command
yargs.command({
  command: 'read',
  describe: 'Read a note',
  builder: {
    title: {
      describe: 'Read a note by title',
      demandOption: true,
      type: 'string',
    },
  },
  handler({ title }) {
    notes.readNote(title);
  },
});

const command = process.argv[2];
// console.log(yargs.argv);
yargs.parse();
