import express from 'express';
import { addComment, deleteComment, getComment } from '../controllers/comment.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

// create a comment
router.post('/',verifyToken,addComment);

// delete a comment
router.delete('/:id', verifyToken, deleteComment);


// get a comment
router.get('/:videoId', getComment);


export default router;