import Note from '../models/note.model.js';
import textify from './STT/index.stt.js';

const postNote = async (req, res) => {
  try {
    const { title, audio, userID } = req.body;
    const text = await textify(audio);
    const newNote = await Note.create({ title, audio, text, userID });
    res.send(newNote);
    res.status(201);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
};

const getAll = async (req, res) => {
  try {
    const notes = await Note.find();
    console.log(notes);
    res.send(notes);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
};

const getNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findOne({
      _id: id,
    });
    res.send(note);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
};

const deleteAll = async (req, res) => {
  try {
    await Note.deleteMany();
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    await Note.deleteOne({
      _id: id,
    });
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
};

const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const note = await Note.findByIdAndUpdate(
      { _id: id },
      { text: text },
      { new: true }
    );
    res.status(201);
    res.send(note);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
};

export default {
  postNote,
  getNote,
  deleteNote,
  updateNote,
  getAll,
  deleteAll,
};
