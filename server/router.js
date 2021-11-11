import express from 'express';
import controller from './controllers/note.controller.js';
const router = express.Router();

router.post('/note', controller.postNote);
router.get('/note', controller.getAllNote);
router.get('/note/:id', controller.getNote);
router.delete('/note/:id', controller.deleteNote);
router.put('/note/:id', controller.updateNote);

export default router;
