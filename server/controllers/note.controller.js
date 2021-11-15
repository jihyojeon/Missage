import Note from '../models/note.model.js';
import textify from './STT/index.stt.js';
import fs from 'fs';

const postNote = async (req, res) => {
  try {
    const audioFile = req.files.audio;
    const userID = req.body.userID;
    const audio = 'input.wav';
    audioFile.mv(`uploads/${audio}`, async () => {
      const text = await textify(audio);
      const newNote = await Note.create({ audio, text, userID });
      audioFile.mv(`uploads/${newNote._id}.wav`);
      res.send(newNote);
      res.status(201);
      fs.unlink(`uploads/${audio}`, () => {});
    });
  } catch (error) {
    console.error(error);
    res.status(500);
  }
};

const getAll = async (req, res) => {
  try {
    const notes = await Note.find();
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
    fs.unlink(`uploads/${id}.wav`, () => {});
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
};

const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, icon, title } = req.body;
    let note;
    if (text) {
      note = await Note.findByIdAndUpdate(
        { _id: id },
        { text: text },
        { new: true }
      );
      res.status(201);
      res.send(note);
    }
    if (title) {
      note = await Note.findByIdAndUpdate(
        { _id: id },
        { title: title },
        { new: true }
      );
      res.status(201);
      res.send(note);
    }
    if (icon) {
      note = await Note.findByIdAndUpdate(
        { _id: id },
        { icon: icon },
        { new: true }
      );
      res.status(201);
      res.send(note);
    }
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
