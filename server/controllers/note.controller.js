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

const getNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findOne({
      _id: id,
    });
    res.send(note);
    res.status(200);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
};

export default {
  postNote,
  getNote,
};
