import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/notes', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', () => {
  console.error('DB connection error');
});

db.once('open', () => {
  console.log('DB connected successfully🥳');
});

export default db;
