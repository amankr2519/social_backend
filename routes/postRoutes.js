const express = require('express');
const router = express.Router();
const {createPost,getAllPosts,getMyPosts} = require('../controllers/postController');
const protect = require('../middleware/authMiddleware');

router.post('/',protect,createPost);
router.get('/',getAllPosts);
router.get('/me',protect,getMyPosts);

module.exports = router;