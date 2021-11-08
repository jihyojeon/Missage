import { model, Schema } from 'mongoose';

const noteSchema = new Schema({
  audio: String,
});

const Model = model('Note', noteSchema);

export default Model;
