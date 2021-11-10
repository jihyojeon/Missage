import express from 'express';
import controller from './controllers/note.controller.js';
const router = express.Router();

router.post('/note', controller.postNote);
router.get('/note/:id', controller.getNote);

export default router;
