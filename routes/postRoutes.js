const express = require('express');
const router = express.Router();
const {createPost,getAllPosts,getMyPosts,deletePost,likePost,unlikePost} = require('../controllers/postController');
const protect = require('../middleware/authMiddleware');

router.post('/',protect,createPost);
router.get('/',getAllPosts);
router.get('/me',protect,getMyPosts);

router.delete('/:id',protect,deletePost);

router.put('/like/:id', protect, likePost);
router.put('/unlike/:id', protect, unlikePost);

module.exports = router;