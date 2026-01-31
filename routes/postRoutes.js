const express = require('express');
const router = express.Router();
const {createPost , getAllPosts , getMyPosts , deletePost ,likePost , unlikePost , commentPost , deleteComment} = require('../controllers/postController');
const protect = require('../middleware/authMiddleware');

const upload = require('../middleware/uploadMiddleware');

router.post('/', protect, upload.single('image'), createPost);
router.get('/',getAllPosts);
router.get('/me',protect,getMyPosts);

router.delete('/:id',protect,deletePost);

router.put('/like/:id', protect, likePost);
router.put('/unlike/:id', protect, unlikePost);

router.post('/comment/:id',protect,commentPost);
router.delete('/comment/:id/:commentId', protect, deleteComment);

module.exports = router;