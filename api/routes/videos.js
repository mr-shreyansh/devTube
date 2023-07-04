import express from 'express';
import { addVideo, addView, deleteVideo, getVideo, getbytag, random, search, sub, trend, updateVideo } from '../controllers/video.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

// create a video
router.post('/', verifyToken, addVideo );

// update a video
router.put('/:id', verifyToken, updateVideo);


// delete a video
router.delete('/:id', verifyToken, deleteVideo);

// get a video
router.get('/find/:id', getVideo);

//
router.put('/view/:id', addView);
router.get('/trend', trend);
router.get('/random', random);
router.get('/sub',verifyToken, sub);
router.get('/tags', getbytag);
router.get('/search', search);


export default router;