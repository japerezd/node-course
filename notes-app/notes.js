const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => 'Your notes...';

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find(n => n.title === title);

  if (duplicateNote) {
    return console.log(chalk.bgRed('Note title taken!'));
  }

  notes.push({
    title,
    body,
  });

  saveNotes(notes);
  console.log(chalk.bgGreen('New note added!'));
};

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((n) => n.title !== title);

  if (notes.length > notesToKeep.length) {
    console.log(chalk.bgGreen('Note removed'));
    return saveNotes(notesToKeep);
  }

  console.log(chalk.bgRed('No note found!'));
};

const listNotes = () => {
  const notes = loadNotes();
  if (!notes.length) {
    return console.log(chalk.bgRed('No notes found!'));
  }

  console.log(chalk.bgBlue('Your notes:'));

  notes.forEach((n, i) => {
    console.log(`${i + 1}. ${n.title}`);
  });
};

const readNote = (title) => {
  const notes = loadNotes();
  const noteFound = notes.find(n => n.title === title);

  if (!noteFound) {
    return console.log(chalk.bgRed('No note found!'));
  }

  console.log(chalk.inverse(title));
  console.log(noteFound.body);
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

module.exports = {
  getNotes,
  addNote,
  removeNote,
  listNotes,
  readNote
};
