import pkg from 'mongoose';
const { model, Schema } = pkg;

const noteSchema = new Schema({
  title: { type: String, default: 'Untitled' },
  icon: { type: String, default: '📜' },
  audio: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  userID: { type: String, default: 'Snonymous' },
});

const Model = model('Note', noteSchema);

export default Model;
