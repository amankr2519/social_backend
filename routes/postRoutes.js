const express = require('express');
const router = express.Router();
const {createPost,getAllPosts,getMyPosts,deletePost} = require('../controllers/postController');
const protect = require('../middleware/authMiddleware');

router.post('/',protect,createPost);
router.get('/',getAllPosts);
router.get('/me',protect,getMyPosts);

router.delete('/:id',protect,deletePost);

module.exports = router;