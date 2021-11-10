import Note from '../models/note.model.js';

exports.postNote = async (req, res) => {
  try {
    const { title, audio, userID } = req.body;
    const newNote = await Note.create({ title, audio, text, userID });
    res.send(newNote);
    res.status(201);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
};
